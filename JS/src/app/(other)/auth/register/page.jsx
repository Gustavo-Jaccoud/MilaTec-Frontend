import React from 'react';
import { logoOriginal as logo, logoOriginal as logoDark } from '@/assets/brandAssets';
import { Card, Col, Form, Row } from 'react-bootstrap';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Link } from 'react-router-dom';
import { currentYear } from '@/context/constants';

const RegisterPage = () => {
  return (
    <>
      <PageBreadcrumb title="Cadastro" />
      <div className="auth-bg d-flex min-vh-100">
        <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
          <Col xxl={3} lg={5} md={6}>
            <Link
              to="/"
              className="auth-brand d-flex justify-content-center mb-2"
            >
              <img
                src={logoDark}
                alt="logo escuro"
                height={26}
                className="logo-dark"
              />
              <img
                src={logo}
                alt="logo claro"
                height={26}
                className="logo-light"
              />
            </Link>
            <p className="fw-semibold mb-4 text-center text-muted fs-15">
              Design do Painel de Administração
            </p>
            <Card className="overflow-hidden text-center p-xxl-4 p-3 mb-0">
              <h4 className="fw-semibold mb-3 fs-18">
                Cadastre-se na sua conta
              </h4>
              <Form action="/" className="text-start mb-3">
                <div className="mb-3">
                  <label className="form-label" htmlFor="example-name">
                    Seu Nome
                  </label>
                  <Form.Control
                    type="text"
                    id="example-name"
                    name="example-name"
                    placeholder="Digite seu nome"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="example-email">
                    E-mail
                  </label>
                  <Form.Control
                    type="email"
                    id="example-email"
                    name="example-email"
                    placeholder="Digite seu e-mail"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="example-password">
                    Senha
                  </label>
                  <Form.Control
                    type="password"
                    id="example-password"
                    placeholder="Digite sua senha"
                  />
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="checkbox-signin"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="checkbox-signin"
                    >
                      Eu concordo com todos os{' '}
                      <Link
                        to="#!"
                        className="link-dark text-decoration-underline"
                      >
                        Termos e Condições
                      </Link>
                    </label>
                  </div>
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary fw-semibold" type="submit">
                    Cadastrar
                  </button>
                </div>
              </Form>
              <p className="text-muted fs-14 mb-0">
                Já tem uma conta?{' '}
                <Link to="/auth/login" className="fw-semibold text-danger ms-1">
                  Login !
                </Link>
              </p>
            </Card>
            <p className="mt-4 text-center mb-0">
              {currentYear} © Desenvolvido por Residência de Software IV - Squad 10
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default RegisterPage;
