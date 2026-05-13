import React, { useEffect, useMemo, useRef, useState } from 'react';
import { logoOriginal as logo, logoOriginal as logoDark } from '@/assets/brandAssets';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { currentYear } from '@/context/constants';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { requestPin, verifyPin } from '@/services/authApi';
import { authSession } from '@/services/authSession';

export const PIN_LENGTH = 4;
export const RESEND_COOLDOWN_SECONDS = 60;

const createEmptyPin = () => Array.from({ length: PIN_LENGTH }, () => '');

const onlyDigits = value => (value || '').replace(/\D/g, '');

const LoginPinPage = () => {
  const navigate = useNavigate();
  const inputsRef = useRef([]);
  const [digits, setDigits] = useState(createEmptyPin);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const pendingEmail = useMemo(() => authSession.getPendingEmail(), []);

  useEffect(() => {
    if (authSession.getToken()) {
      navigate('/dashboard', { replace: true });
      return;
    }

    if (!pendingEmail) {
      navigate('/auth/login', { replace: true });
    }
  }, [navigate, pendingEmail]);

  useEffect(() => {
    if (cooldown <= 0) {
      return undefined;
    }

    const timer = setInterval(() => {
      setCooldown(prev => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const focusInput = index => {
    const target = inputsRef.current[index];
    if (target) {
      target.focus();
      if (typeof target.select === 'function') {
        target.select();
      }
    }
  };

  const setDigitAt = (index, value) => {
    setDigits(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const clearFeedback = () => {
    if (error) setError('');
    if (info) setInfo('');
  };

  const handleChange = (index, rawValue) => {
    clearFeedback();
    const sanitized = onlyDigits(rawValue);

    if (!sanitized) {
      setDigitAt(index, '');
      return;
    }

    if (sanitized.length === 1) {
      setDigitAt(index, sanitized);
      if (index < PIN_LENGTH - 1) {
        focusInput(index + 1);
      }
      return;
    }

    const slice = sanitized.slice(0, PIN_LENGTH - index).split('');
    setDigits(prev => {
      const next = [...prev];
      slice.forEach((digit, offset) => {
        next[index + offset] = digit;
      });
      return next;
    });

    const nextIndex = Math.min(index + slice.length, PIN_LENGTH - 1);
    focusInput(nextIndex);
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace') {
      if (digits[index]) {
        clearFeedback();
        setDigitAt(index, '');
        return;
      }

      if (index > 0) {
        event.preventDefault();
        clearFeedback();
        setDigitAt(index - 1, '');
        focusInput(index - 1);
      }
      return;
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      focusInput(index - 1);
      return;
    }

    if (event.key === 'ArrowRight' && index < PIN_LENGTH - 1) {
      event.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (index, event) => {
    const pasted = onlyDigits(event.clipboardData?.getData('text') || '');

    if (!pasted) {
      return;
    }

    event.preventDefault();
    clearFeedback();

    const slice = pasted.slice(0, PIN_LENGTH - index).split('');
    setDigits(prev => {
      const next = [...prev];
      slice.forEach((digit, offset) => {
        next[index + offset] = digit;
      });
      return next;
    });

    const nextIndex = Math.min(index + slice.length, PIN_LENGTH - 1);
    focusInput(nextIndex);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const pin = digits.join('');

    if (pin.length !== PIN_LENGTH) {
      setError(`Informe os ${PIN_LENGTH} digitos do PIN.`);
      return;
    }

    if (!pendingEmail) {
      navigate('/auth/login', { replace: true });
      return;
    }

    setIsSubmitting(true);
    setError('');
    setInfo('');

    try {
      const response = await verifyPin(pendingEmail, pin);
      const accessToken = response?.accessToken;

      if (!accessToken) {
        throw new Error('Resposta invalida do servidor.');
      }

      authSession.setToken(accessToken);
      authSession.clearPendingEmail();
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err?.message || 'Nao foi possivel validar o PIN.');
      setDigits(createEmptyPin());
      focusInput(0);
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (isResending || cooldown > 0) {
      return;
    }

    if (!pendingEmail) {
      navigate('/auth/login', { replace: true });
      return;
    }

    setIsResending(true);
    setError('');
    setInfo('');

    try {
      await requestPin(pendingEmail);
      setDigits(createEmptyPin());
      setInfo('Enviamos um novo PIN para o seu email.');
      setCooldown(RESEND_COOLDOWN_SECONDS);
      focusInput(0);
    } catch (err) {
      setError(err?.message || 'Nao foi possivel reenviar o PIN.');
    } finally {
      setIsResending(false);
    }
  };

  const errorId = 'login-pin-error';
  const infoId = 'login-pin-info';
  const describedBy = error ? errorId : info ? infoId : undefined;

  return (
    <>
      <PageBreadcrumb title="Login com PIN" />
      <div className="auth-bg d-flex min-vh-100">
        <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
          <Col xxl={3} lg={5} md={6}>
            <Link to="/" className="auth-brand d-flex justify-content-center mb-2">
              <img src={logoDark} alt="logo escuro" height={26} className="logo-dark" />
              <img src={logo} alt="logo claro" height={26} className="logo-light" />
            </Link>
            <p className="fw-semibold mb-4 text-center text-muted fs-15">
              Design do Painel de Administracao
            </p>
            <Card className="overflow-hidden text-center p-xxl-4 p-3 mb-0">
              <h4 className="fw-semibold mb-2 fs-20">Login com PIN</h4>
              <p className="text-muted mb-4">
                Enviamos um PIN de {PIN_LENGTH} digitos para o seu email
                {pendingEmail ? (
                  <>
                    <br />
                    <span className="link-dark fs-13 fw-medium">{pendingEmail}</span>
                  </>
                ) : null}
              </p>
              <Form className="text-start mb-3" noValidate onSubmit={handleSubmit}>
                <fieldset
                  aria-describedby={describedBy}
                  aria-invalid={Boolean(error)}
                  className="border-0 p-0 m-0"
                >
                  <legend className="form-label fs-14">
                    Digite o codigo de {PIN_LENGTH} digitos
                  </legend>
                  <div className="d-flex gap-2 mt-1 mb-2" role="group" aria-label="Campos do PIN">
                    {digits.map((digit, index) => (
                      <Form.Control
                        key={index}
                        ref={element => {
                          inputsRef.current[index] = element;
                        }}
                        aria-label={`Digito ${index + 1} do PIN`}
                        autoComplete="one-time-code"
                        className="text-center"
                        disabled={isSubmitting}
                        inputMode="numeric"
                        isInvalid={Boolean(error)}
                        maxLength={1}
                        name={`pin-${index + 1}`}
                        onChange={event => handleChange(index, event.target.value)}
                        onKeyDown={event => handleKeyDown(index, event)}
                        onPaste={event => handlePaste(index, event)}
                        pattern="[0-9]*"
                        type="text"
                        value={digit}
                      />
                    ))}
                  </div>
                  {error ? (
                    <div id={errorId} className="invalid-feedback d-block mb-2">
                      {error}
                    </div>
                  ) : null}
                  {info ? (
                    <div id={infoId} className="text-success small mb-2">
                      {info}
                    </div>
                  ) : null}
                </fieldset>
                <div className="mb-3 d-grid">
                  <button
                    className="btn btn-primary fw-semibold"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? 'Validando...' : 'Continuar'}
                  </button>
                </div>
                <p className="mb-0 text-center">
                  Nao recebeu o PIN?{' '}
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={cooldown > 0 || isResending || isSubmitting}
                    className="btn btn-link p-0 align-baseline link-primary fw-semibold text-decoration-underline"
                  >
                    {cooldown > 0
                      ? `Aguarde ${cooldown}s para reenviar`
                      : isResending
                        ? 'Reenviando...'
                        : 'Enviar novamente'}
                  </button>
                </p>
              </Form>
              <p className="text-muted fs-14 mb-0">
                Voltar para{' '}
                <Link to="/auth/login" className="fw-semibold text-danger ms-1">
                  Login
                </Link>
              </p>
            </Card>
            <p className="mt-4 text-center mb-0">
              {currentYear} &copy; Desenvolvido por Residência de Software IV - Squad 10
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LoginPinPage;
