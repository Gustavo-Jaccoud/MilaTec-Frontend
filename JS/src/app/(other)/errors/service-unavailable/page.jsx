import { logoOriginal as logo, logoOriginal as logoDark } from '@/assets/brandAssets';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { currentYear } from '@/context/constants';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ServiceUnavailablePage = () => {
  return (
    <>
      <PageBreadcrumb title="Serviço Indisponível" />
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
            <h4 className="fw-semibold mb-4 text-center fs-15">
              Painel Administrativo Responsivo
            </h4>
            <Card className="overflow-hidden text-center p-xxl-4 p-3 mb-0">
              <div className="text-center">
                <h4 className="text-error fs-36">Serviços Indisponíveis!</h4>
                <h3 className="my-2">
                  Este site está temporariamente fora do ar para melhorias.
                </h3>
                <p className="text-muted mb-3">
                  O servidor está temporariamente incapaz de processar a
                  solicitação devido a sobrecarga ou manutenção. Por favor,
                  tente novamente mais tarde.
                </p>
                <Link to="/" className="btn btn-danger">
                  <IconifyIcon icon="tabler:home" className="fs-16 me-1" />{' '}
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

export default ServiceUnavailablePage;
