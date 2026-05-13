import React, { useEffect } from 'react';
import { logoOriginal as logo, logoOriginal as logoDark } from '@/assets/brandAssets';
import { Card, Col, Row } from 'react-bootstrap';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Link } from 'react-router-dom';
import { currentYear } from '@/context/constants';
import { authSession } from '@/services/authSession';

const LogoutPage = () => {
  useEffect(() => {
    authSession.clear();
  }, []);

  return (
    <>
      <PageBreadcrumb title="Logout" />
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
              <h4 className="fw-semibold mb-2 fs-18">Você foi deslogado</h4>
              <div className="text-center">
                <div className="mt-4">
                  <div className="logout-checkmark">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 130.2 130.2"
                    >
                      <circle
                        className="path circle"
                        fill="none"
                        stroke="#4bd396"
                        strokeWidth={6}
                        strokeMiterlimit={10}
                        cx="65.1"
                        cy="65.1"
                        r="62.1"
                      />
                      <polyline
                        className="path check"
                        fill="none"
                        stroke="#4bd396"
                        strokeWidth={6}
                        strokeLinecap="round"
                        strokeMiterlimit={10}
                        points="100.2,40.2 51.5,88.8 29.8,67.5 "
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="mt-2">Até logo!</h3>
                <p className="text-muted">Você foi deslogado com sucesso.</p>
              </div>
              <div className="d-block mt-2">
                <button className="btn btn-primary fw-semibold" type="submit">
                  Central de Suporte
                </button>
              </div>
              <p className="text-muted fs-14 mt-3 mb-0">
                Voltar para{' '}
                <Link to="/auth/login" className="text-danger fw-semibold ms-1">
                  Login!
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

export default LogoutPage;
