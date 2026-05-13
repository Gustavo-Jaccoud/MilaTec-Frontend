import { logoOriginal as logo, logoOriginal as logoDark } from '@/assets/brandAssets';
import ComponentContainerCard from '@/components/ComponentContainerCard';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import useModal from '@/hooks/useModal';
import useToggle from '@/hooks/useToggle';
import { toSentenceCase } from '@/utils/change-casing';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button, Col, Form, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, Row } from 'react-bootstrap';
const BootstrapModals = () => {
  const {
    isTrue: isStandardOpen,
    toggle: toggleStandard
  } = useToggle();
  const {
    isOpen,
    size,
    className,
    scroll,
    toggleModal,
    openModalWithSize,
    openModalWithClass,
    openModalWithScroll
  } = useModal();
  return <ComponentContainerCard title="Modal do Bootstrap" description={<>Um modal renderizado com cabeçalho, corpo e conjunto de ações no rodapé.</>}>
      <div className="d-flex flex-wrap gap-2">
        <Button variant="primary" onClick={toggleStandard}>
          Modal Padrão
        </Button>
        <Button variant="info" onClick={() => openModalWithSize('lg')}>
          Modal Grande
        </Button>
        <Button variant="success" onClick={() => openModalWithSize('sm')}>
          Modal Pequeno
        </Button>
        <Button variant="primary" onClick={() => openModalWithClass('modal-full-width')}>
          Modal de largura total
        </Button>
        <Button variant="secondary" onClick={openModalWithScroll}>
          Modal rolável
        </Button>
      </div>

      <Modal show={isStandardOpen} onHide={toggleStandard}>
        <ModalHeader onHide={toggleStandard} closeButton>
          <ModalTitle as="h4">Modal Heading</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <h5>Texto no Modal</h5>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
          <hr />
          <h5>Texto transbordante para mostrar o comportamento de rolagem</h5>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
          <p className="mb-0">
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
            Donec ullamcorper nulla non metus auctor fringilla.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onClick={toggleStandard}>
            Fechar
          </Button>
          <Button variant="primary" onClick={toggleStandard}>
            Salvar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal className="fade" show={isOpen} onHide={toggleModal} dialogClassName={className} size={size} scrollable={scroll}>
        <ModalHeader onHide={toggleModal} closeButton>
          <h4 className="modal-title">Título Modal</h4>
        </ModalHeader>
        <ModalBody>
          ...
          {scroll && <>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor.
              </p>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor.
              </p>
              <p>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
                Donec ullamcorper nulla non metus auctor fringilla.
              </p>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor.
              </p>
              <p>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
                Donec ullamcorper nulla non metus auctor fringilla.
              </p>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor.
              </p>
              <p>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
                Donec ullamcorper nulla non metus auctor fringilla.
              </p>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor.
              </p>
              <p>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
                Donec ullamcorper nulla non metus auctor fringilla.
              </p>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                auctor.
              </p>
              <p>
                Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.
                Donec ullamcorper nulla non metus auctor fringilla.
              </p>
              <p>
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                ac consectetur ac, vestibulum at eros.
              </p>
            </>}
        </ModalBody>
        {scroll && <ModalFooter>
            <Button variant="light" onClick={toggleModal}>
              Fechar
            </Button>
            <Button onClick={toggleModal}>Salvar</Button>
          </ModalFooter>}
      </Modal>
    </ComponentContainerCard>;
};
const ModalsWithPages = () => {
  const {
    isTrue: signUpModal,
    toggle: toggleSignUp
  } = useToggle();
  const {
    isTrue: signInModal,
    toggle: toggleSignIn
  } = useToggle();
  return <ComponentContainerCard title="Modal com páginas" description={<>Examples of custom modals.</>}>
      <div className="d-flex flex-wrap gap-2">
        <Button variant="primary" onClick={toggleSignUp}>
          Inscreva-se Modal
        </Button>
        <Button variant="info" onClick={toggleSignIn}>
          Modo de login
        </Button>
      </div>
      <Modal show={signUpModal} onHide={toggleSignUp}>
        <ModalBody>
          <div className="auth-brand text-center mt-2 mb-4 position-relative top-0">
            <Link to="" className="logo-dark">
              <span>
                <img src={logoDark} alt="dark logo" width={122} height={22} />
              </span>
            </Link>
            <Link to="" className="logo-light">
              <span>
                <img src={logo} alt="logo" width={122} height={22} />
              </span>
            </Link>
          </div>

          <Form className="ps-3 pe-3" action="#">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Nome
              </label>
              <Form.Control type="email" id="username" required placeholder="Michael Zenaty" />
            </div>
            <div className="mb-3">
              <label htmlFor="emailaddress" className="form-label">
                Email
              </label>
              <Form.Control type="email" id="emailaddress" required placeholder="john@deo.com" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <Form.Control type="password" required id="password" placeholder="Enter your password" />
            </div>
            <div className="mb-3">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="customCheck1" />
                <label className="form-check-label" htmlFor="customCheck1">
                  Eu aceito <Link to="">os termos e condições</Link>
                </label>
              </div>
            </div>
            <div className="mb-3 text-center">
              <Button variant="primary" type="submit">
                Cadastre-se gratuitamente
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>

      <Modal className="fade" show={signInModal} onHide={toggleSignIn}>
        <ModalBody>
          <div className="auth-brand text-center mt-2 mb-4 position-relative top-0">
            <Link to="" className="logo-dark">
              <span>
                <img src={logoDark} alt="dark logo" width={122} height={22} />
              </span>
            </Link>
            <Link to="" className="logo-light">
              <span>
                <img src={logo} alt="logo" width={122} height={22} />
              </span>
            </Link>
          </div>
          <Form action="#" className="ps-3 pe-3">
            <div className="mb-3">
              <label htmlFor="emailaddress1" className="form-label">
                Email 
              </label>
              <Form.Control type="email" id="emailaddress1" required placeholder="john@deo.com" />
            </div>

            <div className="mb-3">
              <label htmlFor="password1" className="form-label">
                Senha
              </label>
              <Form.Control type="password" required id="password1" placeholder="Enter your password" />
            </div>

            <div className="mb-3">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="customCheck2" />
                <label className="form-check-label" htmlFor="customCheck2">
                  Lembrar
                </label>
              </div>
            </div>

            <div className="mb-3 text-center">
              <button className="btn rounded-pill btn-primary" type="submit">
                Acessar
              </button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </ComponentContainerCard>;
};
const ModalWithAlerts = () => {
  const {
    isOpen,
    className,
    toggleModal,
    openModalWithClass
  } = useModal();
  return <ComponentContainerCard title="Modal para Alertas" description={<>Mostrar diferentes mensagens de alerta contextuais usando o componente modal</>}>
      <div className="d-flex flex-wrap gap-2">
        <Button variant="success" onClick={() => openModalWithClass('success')}>
          Alerta de sucesso
        </Button>
        <Button variant="info" onClick={() => openModalWithClass('info')}>
          Alerta de Informação
        </Button>
        <Button variant="warning" onClick={() => openModalWithClass('warning')}>
          Alerta de Aviso
        </Button>
        <Button variant="danger" onClick={() => openModalWithClass('danger')}>
          Aviso de Perigo
        </Button>
        <Modal className="fade" show={isOpen} onHide={toggleModal} size="sm">
          <div className={`modal-filled bg-${className}`}>
            <ModalBody className="p-4">
              <div className="text-center">
                <IconifyIcon icon="ri:information-line" className="h1" />
                <h4 className="mt-2">Muito bem!</h4>
                <p className="mt-3">Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
                <Button variant="light" className="my-2" onClick={toggleModal}>
                  Continuar
                </Button>
              </div>
            </ModalBody>
          </div>
        </Modal>
      </div>
    </ComponentContainerCard>;
};
const ModalPositions = () => {
  const {
    isOpen,
    className,
    toggleModal,
    openModalWithClass
  } = useModal();
  return <ComponentContainerCard title="Modal com Posição" description={<>
          Especifique a posição do modal. Você pode exibir o modal na parte superior, inferior, central ou direita da página especificando classes&nbsp;
          <code>modal-top</code>, <code>modal-bottom</code>, <code>modal-dialog-centered</code> e <code>modal-right</code>
          respectivamente.
        </>}>
      <div className="d-flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => openModalWithClass('modal-top')}>
          Modal superior
        </Button>
        <Button variant="secondary" onClick={() => openModalWithClass('modal-bottom')}>
          Modal Inferior
        </Button>
        <Button variant="secondary" onClick={() => openModalWithClass('modal-dialog-centered')}>
          Modal central
        </Button>
      </div>
      <Modal show={isOpen} onHide={toggleModal} dialogClassName={className}>
        {className != 'modal-right' && <ModalHeader onHide={toggleModal} closeButton>
            <h4 className="modal-title">Titulo do Modal</h4>
          </ModalHeader>}
        <ModalBody>
          {className === 'modal-right' ? <div className="text-center">
              <h4 className="mt-0">Texto no modal</h4>
              <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
              <Button variant="danger" type="button" size="sm" onClick={toggleModal} data-bs-dismiss="modal">
                Fechar
              </Button>
            </div> : <>
              <h5>Texto no modal</h5>
              <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
            </>}
        </ModalBody>
        {className != 'modal-right' && <ModalFooter>
            <Button variant="light" onClick={toggleModal}>
              Fechar
            </Button>
            <Button variant="primary" onClick={toggleModal}>
              Salvar
            </Button>
          </ModalFooter>}
      </Modal>
    </ComponentContainerCard>;
};
const ModalWithColoredHeader = () => {
  const {
    isOpen,
    className,
    toggleModal,
    openModalWithClass
  } = useModal();
  return <ComponentContainerCard title="Modais de cabeçalho colorido" description={<>Um modal renderizado com cabeçalho com cor de fundo contextual.</>}>
      <Modal className="fade" show={isOpen} onHide={toggleModal}>
        <ModalHeader className={`modal-colored-header bg-${className}`}>
          <h4 className="modal-title text-white" id="primary-header-modalLabel">
            Titulo do Modal
          </h4>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </ModalHeader>
        <ModalBody>
          <h5 className="mt-0">{className} Background</h5>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onClick={toggleModal}>
            Fechar
          </Button>
          <Button variant={className}>Salvar</Button>
        </ModalFooter>
      </Modal>
      <div className="d-flex flex-wrap gap-2">
        <Button variant="primary" onClick={() => openModalWithClass('primary')}>
          Cabeçalho Primário
        </Button>
        <Button variant="success" onClick={() => openModalWithClass('success')}>
          Cabeçalho de sucesso
        </Button>
        <Button variant="info" onClick={() => openModalWithClass('info')}>
          Cabeçalho de informações
        </Button>
        <Button variant="warning" onClick={() => openModalWithClass('warning')}>
          Cabeçalho de aviso
        </Button>
        <Button variant="danger" onClick={() => openModalWithClass('danger')}>
          Cabeçalho de perigo
        </Button>
        <Button variant="dark" onClick={() => openModalWithClass('dark')}>
          Cabeçalho escuro
        </Button>
      </div>
    </ComponentContainerCard>;
};
const ModalWithFilled = () => {
  const {
    isOpen,
    className,
    toggleModal,
    openModalWithClass
  } = useModal();
  return <ComponentContainerCard title="Modais preenchidos" description={<>Um modal renderizado com cabeçalho, corpo e rodapé com cor de fundo contextual.</>}>
      <Modal show={isOpen} onHide={toggleModal} className="fade">
        <div className={`modal-filled bg-${className}`}>
          <ModalHeader onHide={toggleModal} closeButton>
            <h4 className="modal-title">{toSentenceCase(className)} Modal Preenchido</h4>
          </ModalHeader>
          <ModalBody>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
              consectetur ac, vestibulum at eros.
            </p>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
              auctor.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onClick={toggleModal}>
              Fechar
            </Button>
            <Button variant="outline-light" onClick={toggleModal}>
              Salvar
            </Button>
          </ModalFooter>
        </div>
      </Modal>
      <div className="d-flex flex-wrap gap-2">
        <Button variant="primary" onClick={() => openModalWithClass('primary')}>
          Primário Preenchido
        </Button>
        <Button variant="success" onClick={() => openModalWithClass('success')}>
          Sucesso preenchido
        </Button>
        <Button variant="info" onClick={() => openModalWithClass('info')}>
          Informações preenchidas
        </Button>
        <Button variant="warning" onClick={() => openModalWithClass('warning')}>
          Aviso preenchido
        </Button>
        <Button variant="danger" onClick={() => openModalWithClass('danger')}>
          Perigo Cheio
        </Button>
        <Button variant="dark" onClick={() => openModalWithClass('dark')}>
          Escuro Preenchido
        </Button>
      </div>
    </ComponentContainerCard>;
};
const MultipleModal = () => {
  const {
    isTrue: isOpen,
    toggle: toggleModal
  } = useToggle();
  const {
    isTrue: isNextOpen,
    toggle: toggleNextModal
  } = useToggle();
  return <ComponentContainerCard title="Modal Multiplo" description={<>Exiba uma série de modais, um por um, para orientar seus usuários em vários aspectos ou obter informações passo a passo.</>}>
      <Modal show={isOpen} onHide={toggleModal}>
        <ModalHeader closeButton>
          <h4 className="modal-title" id="multiple-oneModalLabel">
            Titulo do Modal
          </h4>
        </ModalHeader>
        <ModalBody>
          <h5 className="mt-0">Texto do modal</h5>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => {
          toggleModal();
          toggleNextModal();
        }}>
            Próximo
          </Button>
        </ModalFooter>
      </Modal>
      <Modal className="fade" show={isNextOpen} onHide={toggleNextModal}>
        <ModalHeader closeButton>
          <h4 className="modal-title" id="multiple-twoModalLabel">
            Titulo do Modal
          </h4>
        </ModalHeader>
        <ModalBody>
          <h5 className="mt-0">Texto do Modal</h5>
          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={toggleNextModal}>
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
      <div className="d-flex flex-wrap gap-2">
        <Button variant="primary" onClick={toggleModal}>
          Múltiplo Modal
        </Button>
      </div>
    </ComponentContainerCard>;
};
const ToggleBetweenModals = () => {
  const {
    isTrue: isOpen,
    toggle: toggleModal
  } = useToggle();
  const {
    isTrue: isNextOpen,
    toggle: toggleNextModal
  } = useToggle();
  return <ComponentContainerCard title="Alternar entre modais" description={<>
          Alterne entre vários modais com algum posicionamento inteligente dos atributos <code>data-bs-target</code> e <code>data-bs-toggle</code>.
        </>}>
      <Modal className="fade" show={isOpen} onHide={toggleModal} centered>
        <ModalHeader closeButton>
          <h5 className="modal-title">Modal 1</h5>
        </ModalHeader>
        <ModalBody className="modal-body">Mostre um segundo modal e oculte este com o botão abaixo.</ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => {
          toggleModal();
          toggleNextModal();
        }}>
            Abrir segundo modal
          </Button>
        </ModalFooter>
      </Modal>
      <Modal className="fade" show={isNextOpen} onHide={toggleNextModal} centered>
        <ModalHeader closeButton>
          <h5 className="modal-title">Modal 2</h5>
        </ModalHeader>
        <ModalBody>Oculte este modal e mostre o primeiro com o botão abaixo.</ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={() => {
          toggleModal();
          toggleNextModal();
        }}>
            De volta ao primeiro
          </Button>
        </ModalFooter>
      </Modal>
      <Button variant="secondary" onClick={toggleModal}>
        Abra o primeiro modal
      </Button>
    </ComponentContainerCard>;
};
const FullscreenModal = () => {
  const sizes = ['sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'];
  const [fullscreen, setFullscreen] = useState(undefined);
  const [show, setShow] = useState(false);
  const handleShow = breakpoint => {
    setFullscreen(breakpoint);
    setShow(true);
  };
  return <ComponentContainerCard title="Modal de tela cheia" description={<>
          Outra substituição é a opção de exibir um modal que cobre a janela de visualização do usuário, disponível por meio de classes modificadoras colocadas em um&nbsp;
          <code>.modal-dialog</code>
        </>}>
      <div className="d-flex flex-wrap gap-2">
        <Button type="button" variant="primary" onClick={() => setShow(true)}>
          Modal de tela cheia
        </Button>

        {(sizes || []).map((size, idx) => <Button key={idx} onClick={() => handleShow(size)}>
          Tela cheia
            {typeof size === 'string' && ` Below ${size.split('-')[0]}`}
          </Button>)}
      </div>
      <Modal show={show} fullscreen={fullscreen ?? true} onHide={() => setShow(false)}>
        <ModalHeader closeButton>
          <Modal.Title>Modal</Modal.Title>
        </ModalHeader>
        <ModalBody>...</ModalBody>
        <ModalFooter>
          <span role="button" className="btn btn-light waves-effect" onClick={() => setShow(false)}>
            Fechar
          </span>
          <Button type="button" variant="primary" onClick={() => setShow(false)}>
            Salvar
          </Button>
        </ModalFooter>
      </Modal>
    </ComponentContainerCard>;
};
const StaticBackdropModal = () => {
  const {
    isTrue: isOpen,
    toggle: toggleModal
  } = useToggle();
  return <ComponentContainerCard title="Estático" description={<>
          Quando o pano de fundo estiver definido como estático, o modal não fechará ao clicar fora dele. Clique no botão abaixo para experimentar.
        </>}>
      <div className="d-flex flex-wrap gap-2">
        <Button variant="info" onClick={toggleModal}>
          Estático
        </Button>
      </div>
      <Modal className="fade" show={isOpen} onHide={toggleModal} backdrop="static" keyboard={false}>
        <ModalHeader closeButton>
          <Modal.Title as="h5">Titulo do Modal</Modal.Title>
        </ModalHeader>
        <ModalBody>
          <p className="m-0">Não fecharei se você clicar fora de mim. Nem tente pressionar a tecla Escape.</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="secondary" onClick={toggleModal}>
            Fechar
          </Button>
          <Button variant="primary">Entendido</Button>
        </ModalFooter>
      </Modal>
    </ComponentContainerCard>;
};
const VaryingModalContent = () => {
  const [recipient, setReceipt] = useState('');
  const {
    isOpen,
    toggleModal,
    className,
    openModalWithSize
  } = useModal();
  return <ComponentContainerCard title="Conteúdo modal variável" description={<>
          Tem vários botões que acionam o mesmo modal com conteúdos ligeiramente diferentes? Use&nbsp;
          <code>event. RelatedTarget</code> e&nbsp;
          <a href="https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes" target="_blank">
            HTML <code>data-bs-*</code>
            atributos
          </a>
          para variar o conteúdo do modal dependendo de qual botão foi clicado.
        </>}>
      <div className="hstack gap-2 flex-wrap">
        <Button type="button" variant="primary" onClick={() => {
        openModalWithSize('lg');
        setReceipt('@mdo');
      }}>
          Modal aberto para @mdo
        </Button>
        <Button type="button" variant="primary" onClick={() => {
        openModalWithSize('lg');
        setReceipt('@fat');
      }}>
          Modal aberto para @fat
        </Button>
        <Button type="button" variant="primary" onClick={() => {
        openModalWithSize('lg');
        setReceipt('@getbootstrap');
      }}>
          Modal aberto para @getbootstrap
        </Button>
      </div>

      <Modal className="fade" tabIndex={-1} show={isOpen} onHide={toggleModal} dialogClassName={className}>
        <ModalHeader onHide={toggleModal} closeButton>
          <Modal.Title as="h5">Nova mensagem para {recipient}</Modal.Title>
        </ModalHeader>
        <div className="modal-body">
          <form>
            <div className="mb-3">
              <label htmlFor="recipient-name" className="col-form-label">
                Destinatário
              </label>
              <input type="text" className="form-control" id="recipient-name" placeholder={recipient} />
            </div>
            <div className="mb-3">
              <label htmlFor="message-text" className="col-form-label">
                Mensagem:
              </label>
              <textarea className="form-control" id="message-text"></textarea>
            </div>
          </form>
        </div>
        <ModalFooter>
          <Button type="button" variant="secondary" onClick={toggleModal}>
            Fechar
          </Button>
          <Button type="button" variant="primary">
            Enviar Mensagem
          </Button>
        </ModalFooter>
      </Modal>
    </ComponentContainerCard>;
};
const AllModal = () => {
  return <>
      <Row>
        <Col xl={6}>
          <BootstrapModals />
        </Col>
        <Col xl={6}>
          <ModalsWithPages />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <ModalWithAlerts />
        </Col>
        <Col xl={6}>
          <ModalPositions />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <ModalWithColoredHeader />
        </Col>
        <Col xl={6}>
          <ModalWithFilled />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <MultipleModal />
        </Col>
        <Col xl={6}>
          <ToggleBetweenModals />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <FullscreenModal />
        </Col>
        <Col xl={6}>
          <StaticBackdropModal />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <VaryingModalContent />
        </Col>
      </Row>
    </>;
};
export default AllModal;
