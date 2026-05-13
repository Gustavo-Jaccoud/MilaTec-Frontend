import React from 'react';
import { logoOriginal as logo, logoOriginal as logoDark } from '@/assets/brandAssets';
import mailConfirmImg from '@/assets/images/png/mail-confirm.png';
import { Card, Col, Row } from 'react-bootstrap';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Link } from 'react-router-dom';
import { currentYear } from '@/context/constants';

const ConfirmMailPage = () => {
  return (
    <>
      <PageBreadcrumb title="Confirmar Email" />
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
              Design do Painel de Administração por Coderthemes
            </p>
            <Card className="overflow-hidden text-center p-xxl-4 p-3 mb-0">
              <h4 className="fw-semibold mb-4 fs-20">Verifique Sua Conta</h4>
              <img
                src={mailConfirmImg}
                alt="imagem"
                width={86}
                className="mx-auto d-block"
              />
              <p className="text-muted fs-14 mt-2">
                {' '}
                Um email foi enviado para <b>youremail@domain.com</b>. Por
                favor, verifique a caixa de entrada para um email da empresa e
                clique no link incluído para redefinir sua senha.{' '}
              </p>
              <Link to="/" className="btn d-block btn-primary mt-3">
                Voltar para a Página Inicial
              </Link>
            </Card>
            <p className="mt-3 text-center mb-0">
              {currentYear} © Desenvolvido por Residência de Software IV - Squad 10 
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ConfirmMailPage;
