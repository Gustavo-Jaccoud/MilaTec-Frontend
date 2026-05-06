import React, { useState } from 'react';
import logoDark from '@/assets/images/logo-dark.png';
import logo from '@/assets/images/logo.png';
import { Card, Col, Form, Row } from 'react-bootstrap';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { currentYear } from '@/context/constants';
import { useAuth } from '@/context/useAuthContext';
import { login as loginRequest } from '@/services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('email');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Informe o e-mail.');
      return;
    }
    setLoading(true);
    try {
      await loginRequest(email.trim());
      toast.success('Código enviado para o seu e-mail.');
      setStep('code');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Falha ao enviar o código.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteLogin = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      toast.error('Informe o código de 5 caracteres.');
      return;
    }
    setLoading(true);
    try {
      const data = await loginRequest(email.trim(), code.trim());
      const token =
        data && typeof data === 'object' && 'accessToken' in data
          ? data.accessToken
          : typeof data === 'string'
            ? data
            : null;
      if (!token || typeof token !== 'string') {
        throw new Error('Resposta de login inválida: accessToken ausente.');
      }
      setAccessToken(token);
      toast.success('Login realizado.');
      navigate('/funil-projetos');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Falha no login.');
    } finally {
      setLoading(false);
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
            <p className="fw-semibold mb-4 text-center text-muted fs-15">Design do Painel de Administração</p>
            <Card className="overflow-hidden text-center p-xxl-4 p-3 mb-0">
              <h4 className="fw-semibold mb-3 fs-18">Faça login na sua conta</h4>
              {step === 'email' ? (
                <Form onSubmit={handleSendCode} className="text-start mb-3">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="login-email">
                      E-mail
                    </label>
                    <Form.Control
                      type="email"
                      id="login-email"
                      name="login-email"
                      autoComplete="email"
                      placeholder="Digite seu e-mail"
                      value={email}
                      onChange={(ev) => setEmail(ev.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="d-grid">
                    <button className="btn btn-primary fw-semibold" type="submit" disabled={loading}>
                      {loading ? 'Enviando…' : 'Enviar código'}
                    </button>
                  </div>
                </Form>
              ) : (
                <Form onSubmit={handleCompleteLogin} className="text-start mb-3">
                  <p className="text-muted fs-14 mb-2">
                    Digite o código de 5 caracteres enviado para <strong>{email}</strong>
                  </p>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="login-code">
                      Código
                    </label>
                    <Form.Control
                      type="text"
                      id="login-code"
                      name="login-code"
                      inputMode="text"
                      autoComplete="one-time-code"
                      maxLength={8}
                      placeholder="Código"
                      value={code}
                      onChange={(ev) => setCode(ev.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="d-flex gap-2 flex-wrap">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      disabled={loading}
                      onClick={() => {
                        setStep('email');
                        setCode('');
                      }}
                    >
                      Voltar
                    </button>
                    <div className="d-grid flex-grow-1">
                      <button className="btn btn-primary fw-semibold" type="submit" disabled={loading}>
                        {loading ? 'Entrando…' : 'Entrar'}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
              <p className="text-muted fs-14 mb-0">
                Não tem uma conta? &nbsp;
                <Link to="/auth/register" className="fw-semibold text-danger ms-1">
                  Cadastrar-se!
                </Link>
              </p>
            </Card>
            <p className="mt-4 text-center mb-0">
              {currentYear} © Fundação de Saúde Parreiras Horta
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LoginPage;
