import { logoOriginal as logo, logoOriginal as logoDark } from '@/assets/brandAssets';
import avatar1 from '@/assets/images/users/avatar-1.jpg';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { currentYear } from '@/context/constants';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LockScreenPage = () => {
  return <>
      <PageBreadcrumb title='Tela de Bloqueio' />
      <div className="auth-bg d-flex min-vh-100">
        <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
          <Col xxl={3} lg={5} md={6}>
            <Link to="/" className="auth-brand d-flex justify-content-center mb-2">
              <img src={logoDark} alt="logo escuro" height={26} className="logo-dark" />
              <img src={logo} alt="logo claro" height={26} className="logo-light" />
            </Link>
            <p className="fw-semibold mb-4 text-center text-muted fs-15">Design do Painel de Administração</p>
            <Card className="overflow-hidden text-center p-xxl-4 p-3 mb-0">
              <h4 className="fw-semibold mb-4 fs-20">Bem-vindo de volta</h4>
              <div className="text-center">
                <img src={avatar1} alt='avatar1' className="avatar-xl rounded-circle img-thumbnail" />
                <div className="mt-2 mb-3">
                  <h4 className="fw-semibold">Oi! Nowak Helme.</h4>
                  <p className="mb-0 fst-italic text-muted">Digite sua senha para acessar o painel de administração.</p>
                </div>
              </div>
              <form action="/" className="text-start mb-3">
                <div className="mb-3">
                  <label className="form-label" htmlFor="lock-password">Digite a Senha</label>
                  <input type="password" id="lock-password" name="lock-password" className="form-control" placeholder="Senha" />
                </div>
                <div className="mb-2 d-grid">
                  <button className="btn btn-primary fw-semibold" type="submit">Acessar a Tela</button>
                </div>
              </form>
              <p className="text-muted fs-14 mb-0">
                Não é você? retorne para <Link to="/auth/login" className="fw-semibold text-danger ms-1">Login!</Link>
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

export default LockScreenPage;
