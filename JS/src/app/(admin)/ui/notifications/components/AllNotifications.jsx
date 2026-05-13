import { logoMenorOriginal as logoSm } from "@/assets/brandAssets";
import ComponentContainerCard from "@/components/ComponentContainerCard";
import useToggle from "@/hooks/useToggle";
import { useState } from "react";
import { Col, Form, Row, Toast, ToastBody, ToastContainer, ToastHeader } from "react-bootstrap";
const Basic = () => {
  const {
    isTrue: isOpen,
    toggle: hide
  } = useToggle();
  return <Col md={6}>
      <h5 className="mb-2">Básico</h5>
      <p className="text-muted">As torradas são tão flexíveis quanto você precisa e
        têm muito pouca marcação necessária. No mínimo, nós
        requerem um único elemento para conter seu conteúdo “torrado” e
        encorajo fortemente um botão de dispensar.</p>
      <div className="p-3">
        <Toast className="fade" role="alert" aria-live="assertive" aria-atomic="true" onClose={hide} show={!isOpen}>
          <ToastHeader>
            <img src={logoSm} alt="brand-logo" height={16} className="me-1" />
            <strong className="me-auto">Administradoristrador</strong>
            <small>11 minutos atrás</small>
          </ToastHeader>
          <ToastBody>
            Olá, mundo! Esta é uma mensagem de brinde.
          </ToastBody>
        </Toast>
      </div>
    </Col>;
};
const Translucent = () => {
  const {
    isTrue: isOpenTranslucent,
    toggle: hideTranslucent
  } = useToggle(true);
  return <Col md={6}>
      <h5 className="mb-2">Translúcido</h5>
      <p className="text-muted">As torradas também são ligeiramente translúcidas,
        então eles se misturam com tudo o que podem aparecer.
        Para navegadores que suportam a propriedade CSS background-filter,
        também tentaremos desfocar os elementos sob um brinde.</p>
      <div className="p-3 bg-light bg-opacity-50">
        <Toast className="fade" onClose={hideTranslucent} autohide delay={8000} show={isOpenTranslucent} role="alert" aria-live="assertive" aria-atomic="true">
          <ToastHeader>
            <img src={logoSm} alt="brand-logo" height={16} className="me-1" />
            <strong className="me-auto">Administradoristrador</strong>
            <small>11 minutos atrás</small>
          </ToastHeader>
          <ToastBody>
            Olá, mundo! Esta é uma mensagem de brinde.
          </ToastBody>
        </Toast>
      </div>
    </Col>;
};
const Empilhamento = () => {
  const {
    isTrue: isOpenToast1,
    toggle: toggleToast1
  } = useToggle(true);
  const {
    isTrue: isOpenToast2,
    toggle: toggleToast2
  } = useToggle(true);
  return <Col md={6} className="mt-4">
      <h5 className="mb-2">Empilhamento</h5>
      <p className="text-muted">Quando você faz vários brindes, nós
      o padrão é Empilhamento verticalmente deles de forma legível.</p>
      <div className="p-3">
        <div aria-live="polite" aria-atomic="true" style={{
        position: 'relative',
        minHeight: 200
      }}>
          <ToastContainer style={{
          position: 'absolute',
          top: 0,
          right: 0
        }}>
            <Toast show={isOpenToast1} onClose={toggleToast1} className="fade" role="alert" aria-live="assertive" aria-atomic="true">
              <ToastHeader>
                <img src={logoSm} alt="brand-logo" height={16} className="me-1" />
                <strong className="me-auto">Administrador</strong>
                <small className="text-muted">agora mesmo</small>
              </ToastHeader>
              <ToastBody>
              Ver? Exatamente assim.
              </ToastBody>
            </Toast>
            <Toast delay={2000} show={isOpenToast2} onClose={toggleToast2} className="fade" role="alert" aria-live="assertive" aria-atomic="true">
              <ToastHeader>
                <img src={logoSm} alt="brand-logo" height={16} className="me-1" />
                <strong className="me-auto">Administrador</strong>
                <small className="text-muted">2 segundos atrás</small>
              </ToastHeader>
              <ToastBody>
                Atenção, os brindes serão empilhados automaticamente
              </ToastBody>
            </Toast>
          </ToastContainer>
        </div>
      </div>
    </Col>;
};
const Placement = () => {
  const {
    isTrue: isOpen,
    toggle: hide
  } = useToggle();
  return <Col md={6} className="mt-4">
      <h5 className="mb-2">Colocação</h5>
      <p className="text-muted">Coloque brindes com CSS personalizado conforme você
        preciso deles. O canto superior direito é frequentemente usado para
        notificações, assim como a parte superior central. Se você apenas estiver indo
        para mostrar um brinde por vez, coloque o posicionamento
        estilos diretamente no <code>.toast</code>.</p>
      <div className="p-3">
        <div aria-live="polite" aria-atomic="true" className="d-flex justify-content-center align-items-center" style={{
        minHeight: 200
      }}>
          <Toast autohide className="fade" role="alert" aria-live="assertive" aria-atomic="true" data-bs-toggle="toast" onClose={hide} show={!isOpen}>
            <ToastHeader>
              <img src={logoSm} alt="brand-logo" height={16} className="me-1" />
              <strong className="me-auto">Administrador</strong>
              <small>11 minutos atrás</small>
            </ToastHeader>
            <ToastBody>
              Olá, mundo! Esta é uma mensagem de brinde.
            </ToastBody>
          </Toast>
        </div>
      </div>
    </Col>;
};
const CustomContent = () => {
  const {
    isTrue: isOpenCustom1,
    setFalse: hideCustom1
  } = useToggle(true);
  const {
    isTrue: isOpenCustom2,
    setFalse: hideCustom2
  } = useToggle(true);
  const {
    isTrue: isOpenCustom3,
    setFalse: hideCustom3
  } = useToggle(true);
  const {
    isTrue: isOpenCustom4,
    setFalse: hideCustom4
  } = useToggle(true);
  return <ComponentContainerCard title='Custom content' description={<>Alternativamente, você também pode adicionar controles adicionais
      e componentes para torradas.</>}>
      <Toast show={isOpenCustom1} onClose={hideCustom1} delay={3000} autohide className=" align-items-center mb-4" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body">
            Olá, mundo! Esta é uma mensagem de brinde.
          </div>
          <button type="button" onClick={hideCustom1} className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
        </div>
      </Toast>
      <Toast show={isOpenCustom2} onClose={hideCustom2} delay={6000} autohide className=" align-items-center text-white bg-primary border-0 mb-4" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="d-flex">
          <div className="toast-body">
            Olá, mundo! Esta é uma mensagem de brinde.
          </div>
          <button type="button" onClick={hideCustom2} className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
        </div>
      </Toast>
      <Toast show={isOpenCustom3} onClose={hideCustom3} delay={8000} autohide className=" mb-4" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-body">
          Olá, mundo! Esta é uma mensagem de brinde.
          <div className="mt-2 pt-2 border-top">
            <button type="button" className="btn btn-primary btn-sm">Pegar
            Ação</button> &nbsp;
            <button type="button" onClick={hideCustom3} className="btn btn-secondary btn-sm" data-bs-dismiss="toast">Fechar</button>
          </div>
        </div>
      </Toast>
      <Toast className="bg-primary" show={isOpenCustom4} onClose={hideCustom4} delay={10000} autohide role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-body text-white">
          Olá, mundo! Esta é uma mensagem de brinde.
          <div className="mt-2 pt-2 border-top">
            <button type="button" className="btn btn-light btn-sm">Pegar Ação</button>&nbsp;
            <button type="button" onClick={hideCustom4} className="btn btn-secondary btn-sm" data-bs-dismiss="toast">Fechar</button>
          </div>
        </div>
      </Toast>
    </ComponentContainerCard>;
};
const PlacementToast = () => {
  const [position, setPosition] = useState('top-start');
  return <ComponentContainerCard title="Placement" description={<>
          Coloque brindes com CSS personalizado conforme necessário. O canto superior direito é frequentemente usado para notificações, assim como o canto superior central. Se você estiver apenas sempre
          Para mostrar um brinde por vez, coloque os estilos de posicionamento diretamente em <code>.toast.</code>
        </>}>
      <Form>
        <div className="mt-3">
          <label htmlFor="selectToastPlacement" className="form-label">
            Colocação
          </label>
          <select className="form-select mb-2" onChange={e => setPosition(e?.currentTarget.value)} id="selectToastPlacement">
            <option>Selecione uma posição...</option>
            <option value="top-start">Canto superior esquerdo</option>
            <option value="top-center">Centralizado
            </option>
            <option value="top-end">Canto superior direito</option>
            <option value="middle-start">Meio-esquerda
            </option>
            <option value="middle-center">Centro médio
            </option>
            <option value="middle-end">Meio à direita
            </option>
            <option value="bottom-start">Canto inferior esquerdo</option>
            <option value="bottom-center">Fundo
            centro</option>
            <option value="bottom-end">Canto inferior direito</option>
          </select>
        </div>
      </Form>
      <div aria-live="polite" aria-atomic="true" className="bg-light position-relative" style={{
      minHeight: 350
    }}>
        <ToastContainer position={position} className="position-absolute  p-3" id="toastPlacement">
          <Toast className="mb-2">
            <ToastHeader closeButton>
              <div className="auth-logo me-auto">
                <img className="logo-dark" src={logoSm} alt="logo-dark" height={18} />
              </div>
              <div className="float-end">
                <small>11 minutos atrás</small>
              </div>
            </ToastHeader>
            <ToastBody>Olá, mundo! Esta é uma mensagem de brinde.</ToastBody>
          </Toast>
        </ToastContainer>
      </div>

    </ComponentContainerCard>;
};
const AllToasts = () => {
  return <>
      <div>
        <Row>
          <Col xs={12}>
            <ComponentContainerCard title="Bootstrap Toasts" description={<>Notificações push para seus visitantes com um brinde, um
              mensagem de alerta leve e facilmente personalizável.</>}>
              <Row>
                <Basic />
                <Translucent />
              </Row>
              <Row>
                <Empilhamento />
                <Placement />
              </Row>
            </ComponentContainerCard>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <CustomContent />
          </Col>
          <Col lg={6}>
            <PlacementToast />
          </Col>
        </Row>
      </div>

    </>;
};
export default AllToasts;
