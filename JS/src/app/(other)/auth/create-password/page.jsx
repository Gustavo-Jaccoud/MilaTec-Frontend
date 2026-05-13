import { logoOriginal as logo, logoOriginal as logoDark } from '@/assets/brandAssets';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { currentYear } from '@/context/constants';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CreatePasswordPage = () => {
  return <>
      <PageBreadcrumb title='Criar Senha' />
      <div className="auth-bg d-flex min-vh-100">
        <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
          <Col xxl={3} lg={5} md={6}>
            <Link to="/" className="auth-brand d-flex justify-content-center mb-2">
              <img src={logoDark} alt="logo escuro" height={26} className="logo-dark" />
              <img src={logo} alt="logo claro" height={26} className="logo-light" />
            </Link>
            <p className="fw-semibold mb-4 text-center text-muted fs-15">Design do Painel de Administração por Coderthemes</p>
            <Card className="overflow-hidden text-center p-xxl-4 p-3 mb-0">
              <h4 className="fw-semibold mb-2 fs-20">Criar Nova Senha</h4>
              <p className="text-muted mb-2">Por favor, crie sua nova senha.</p>
              <p className="mb-4">Precisa de sugestão para a senha? <a href="#!" className="link-dark fw-semibold text-decoration-underline">Sugestão</a></p>
              <form action="/" className="text-start mb-3">
                <div className="mb-3">
                  <label className="form-label" htmlFor="new-password">Criar Nova Senha <small className="text-info ms-1">Deve ter pelo menos 8 caracteres</small></label>
                  <input type="password" id="new-password" name="new-password" className="form-control" placeholder="Nova Senha" />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="re-password">Reentrar a Nova Senha</label>
                  <input type="password" id="re-password" name="re-password" className="form-control" placeholder="Reentrar Senha" />
                </div>
                <div className="mb-2 d-grid">
                  <button className="btn btn-primary fw-semibold" type="submit">Criar Nova Senha</button>
                </div>
              </form>
              <p className="text-muted fs-14 mb-0">
                Voltar para <Link to="/auth/login" className="fw-semibold text-danger ms-1">Login!</Link>
              </p>
            </Card>
            <p className="mt-3 text-center mb-0">
             {currentYear} © Desenvolvido por Residência de Software IV - Squad 10
            </p>
          </Col>
        </Row>
      </div>
    </>;
};

export default CreatePasswordPage;
