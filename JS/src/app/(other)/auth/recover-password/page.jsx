import React from 'react';
import { logoOriginal as logo, logoOriginal as logoDark } from '@/assets/brandAssets';
import { Card, Col, Row } from 'react-bootstrap';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Link } from 'react-router-dom';
import { currentYear } from '@/context/constants';

const RecoverPasswordPage = () => {
  return (
    <>
      <PageBreadcrumb title="Recuperar Senha" />
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
              <h4 className="fw-semibold mb-3 fs-18">Redefinir Sua Senha</h4>
              <p className="text-muted mb-4">
                Digite seu endereço de e-mail e enviaremos um e-mail com
                instruções para redefinir sua senha.
              </p>
              <form action="/" className="text-start mb-3">
                <div className="mb-3">
                  <label className="form-label" htmlFor="example-email">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="example-email"
                    name="example-email"
                    className="form-control"
                    placeholder="Digite seu e-mail"
                  />
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary fw-semibold" type="submit">
                    Redefinir Senha
                  </button>
                </div>
              </form>
              <p className="text-muted fs-14 mb-0">
                Voltar para{' '}
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

export default RecoverPasswordPage;
