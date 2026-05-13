import React from 'react';
import { logoOriginal as logo, logoOriginal as logoDark } from '@/assets/brandAssets';
import Timer from './component/Timer';
import { Card, Col, Row } from 'react-bootstrap';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Link } from 'react-router-dom';
import { currentYear } from '@/context/constants';

const ComingSoonPage = () => {
  return (
    <>
      <PageBreadcrumb title="Em Breve" />
      <div className="auth-bg d-flex min-vh-100 justify-content-center align-items-center">
        <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
          <Col xl={4} lg={5} md={6}>
            <Card className="overflow-hidden text-center h-100 p-xxl-4 p-3 mb-0">
              <Link to="/" className="auth-brand mb-3">
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
              <div>
                <h3 className="fw-semibold mb-2">
                  Fique ligado, estamos lançando em breve
                </h3>
                <p className="text-muted mb-0">
                  Estamos tornando o sistema ainda mais incrível.
                </p>
              </div>
              <Timer />
              <p className="mt-3 mb-0">
                {currentYear} © Desenvolvido por Residência de Software IV - Squad 10
              </p>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ComingSoonPage;
