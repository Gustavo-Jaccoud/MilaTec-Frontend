import { logoOriginal as logo, logoOriginal as logoDark } from '@/assets/brandAssets';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currentYear } from '@/context/constants';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Error400Page = () => {
  return (
    <>
      <PageBreadcrumb title="Erro 400" />
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
              Painel de Administração da Desenvolvido por Residência de Software IV - Squad 10
            </p>
            <Card className="overflow-hidden text-center p-xxl-4 p-3 mb-0">
              <div className="text-center">
                <h1 className="text-error">400</h1>
                <h3 className="mt-3 mb-2">Requisição Errada!</h3>
                <p className="text-muted mb-3">
                  O servidor não conseguiu entender a requisição devido a uma
                  sintaxe inválida. Por favor, verifique sua entrada e tente
                  novamente.
                </p>
                <Link to="/" className="btn btn-danger">
                  <IconifyIcon
                    width={16}
                    height={16}
                    icon="tabler:home"
                    className="=fs-16 me-1"
                  />{' '}
                  Voltar para a Página Inicial
                </Link>
              </div>
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

export default Error400Page;
