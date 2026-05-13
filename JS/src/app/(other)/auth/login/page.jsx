import React, { useEffect, useState } from 'react';
import { logoOriginal as logo, logoOriginal as logoDark } from '@/assets/brandAssets';
import { Card, Col, Form, Row } from 'react-bootstrap';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import { currentYear } from '@/context/constants';
import { requestPin } from '@/services/authApi';
import { authSession } from '@/services/authSession';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLoginEmail = value => {
  const email = value.trim();

  if (!email) {
    return 'Informe seu email.';
  }

  if (!EMAIL_REGEX.test(email)) {
    return 'Informe um email valido.';
  }

  return '';
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (authSession.getToken()) {
      navigate('/funil-projetos', { replace: true });
    }
  }, [navigate]);

  const handleEmailChange = event => {
    setEmail(event.target.value);

    if (emailError) {
      setEmailError('');
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const normalizedEmail = email.trim();
    const validationError = validateLoginEmail(normalizedEmail);

    if (validationError) {
      setEmailError(validationError);
      return;
    }

    setIsSubmitting(true);
    setEmailError('');

    try {
      await requestPin(normalizedEmail);
      authSession.setPendingEmail(normalizedEmail);
      navigate('/auth/login-pin');
    } catch (error) {
      setEmailError(error?.message || 'Nao foi possivel solicitar o PIN.');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageBreadcrumb title="Login" />
      <div className="auth-bg d-flex min-vh-100">
        <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
          <Col xxl={3} lg={5} md={6}>
            <Link to="/" className="auth-brand d-flex justify-content-center mb-2">
              <img src={logoDark} alt="logo escuro" style={{ width: '13rem' }} className="logo-dark" />
              <img src={logo} alt="logo claro" style={{ width: '13rem' }} className="logo-light" />
            </Link>
            <p className="fw-semibold mb-4 text-center text-muted fs-15">Design do Painel de Administracao</p>
            <Card className="overflow-hidden text-center p-xxl-4 p-3 mb-0">
              <h4 className="fw-semibold mb-2 fs-18">Acesse sua conta</h4>
              <p className="text-muted mb-4">Digite seu email para receber o PIN de acesso.</p>
              <Form className="text-start mb-3" noValidate onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="login-email">
                    Email
                  </label>
                  <Form.Control
                    aria-describedby={emailError ? 'login-email-error' : undefined}
                    aria-invalid={Boolean(emailError)}
                    autoComplete="email"
                    disabled={isSubmitting}
                    id="login-email"
                    isInvalid={Boolean(emailError)}
                    name="email"
                    onChange={handleEmailChange}
                    placeholder="Digite seu email"
                    type="email"
                    value={email}
                  />
                  <Form.Control.Feedback id="login-email-error" type="invalid">
                    {emailError}
                  </Form.Control.Feedback>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary fw-semibold" disabled={isSubmitting} type="submit">
                    {isSubmitting ? 'Solicitando PIN...' : 'Solicitar PIN'}
                  </button>
                </div>
              </Form>
            </Card>
            <p className="mt-4 text-center mb-0">{currentYear} &copy; Desenvolvido por Residência de Software IV - Squad 10</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LoginPage;
