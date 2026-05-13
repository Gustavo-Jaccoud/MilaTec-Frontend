import ComponentContainerCard from '@/components/ComponentContainerCard';
import { Col, Row } from 'react-bootstrap';
import { logoMenorOriginal as logoImage } from '@/assets/brandAssets';
import { withSwal } from 'react-sweetalert2';

const AllAlert = withSwal((props) => {
  const { swal } = props;
  let timerInterval;
  return (
    <>
      <Row>
        <Col lg={6}>
          <ComponentContainerCard
            title="Uma Mensagem Simples"
            description={<>Aqui está um exemplo básico do SweetAlert.</>}
          >
            <button
              type="button"
              className="btn btn-primary"
              id="sweetalert-basic"
              onClick={() =>
                swal.fire({
                  title: 'Qualquer pessoa pode usar um computador',
                  customClass: {
                    confirmButton: `btn btn-primary w-xs mt-2`,
                  },
                })
              }
            >
              Clique em mim
            </button>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard
            title="Título"
            description={<>Um Título com um Texto Abaixo.</>}
          >
            <button
              type="button"
              className="btn btn-primary"
              id="sweetalert-title"
              onClick={() =>
                swal.fire({
                  title: 'A Internet?',
                  text: 'Essa coisa ainda existe?',
                  icon: 'question',
                  customClass: {
                    confirmButton: `btn btn-primary w-xs mt-2`,
                  },
                })
              }
            >
              Clique em Mim
            </button>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard
            title="HTML"
            description={
              <>Aqui está um exemplo do SweetAlert com conteúdo HTML.</>
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                swal.fire({
                  title: '<i>HTML</i> <u>exemplo</u>',
                  icon: 'info',
                  html:
                    'Você pode usar <b>texto em negrito</b>, ' +
                    '<a href="#">links</a> ' +
                    'e outras tags HTML',
                  showCloseButton: true,
                  showCancelButton: true,
                  customClass: {
                    confirmButton: 'btn btn-success me-2',
                    cancelButton: 'btn btn-danger',
                  },
                  buttonsStyling: false,
                  confirmButtonText: ` Ótimo!`,
                })
              }
              id="custom-html-alert"
            >
              Alternar SweetAlert HTML
            </button>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard
            title="Todos os Estados"
            description={
              <>Aqui estão exemplos de cada um dos estados do SweetAlert.</>
            }
          >
            <div className="d-flex flex-wrap gap-2">
              <button
                type="button"
                id="sweetalert-info"
                onClick={() =>
                  swal.fire({
                    text: 'Aqui está um exemplo de um SweetAlert de informação!',
                    icon: 'info',
                    buttonsStyling: false,
                    confirmButtonText: 'Ok, entendi!',
                    customClass: {
                      confirmButton: 'btn btn-info',
                    },
                  })
                }
                className="btn btn-info"
              >
                Alternar Informações
              </button>
              <button
                type="button"
                id="sweetalert-warning"
                onClick={() =>
                  swal.fire({
                    text: 'Aqui está um exemplo de um SweetAlert de aviso!',
                    icon: 'warning',
                    buttonsStyling: false,
                    confirmButtonText: 'Ok, entendi!',
                    customClass: {
                      confirmButton: 'btn btn-warning',
                    },
                  })
                }
                className="btn btn-warning"
              >
                Alternar Aviso
              </button>
              <button
                type="button"
                id="sweetalert-error"
                onClick={() =>
                  swal.fire({
                    text: 'Aqui está um exemplo de um SweetAlert de erro!',
                    icon: 'error',
                    buttonsStyling: false,
                    confirmButtonText: 'Ok, entendi!',
                    customClass: {
                      confirmButton: 'btn btn-danger',
                    },
                  })
                }
                className="btn btn-danger"
              >
                Alternar Erro
              </button>
              <button
                type="button"
                id="sweetalert-success"
                onClick={() =>
                  swal.fire({
                    text: 'Aqui está um exemplo de um SweetAlert de sucesso!',
                    icon: 'success',
                    buttonsStyling: false,
                    confirmButtonText: 'Ok, entendi!',
                    customClass: {
                      confirmButton: 'btn btn-success',
                    },
                  })
                }
                className="btn btn-success"
              >
                Alternar Sucesso
              </button>
              <button
                type="button"
                id="sweetalert-question"
                onClick={() =>
                  swal.fire({
                    text: 'Aqui está um exemplo de um SweetAlert de pergunta!',
                    icon: 'question',
                    buttonsStyling: false,
                    confirmButtonText: 'Ok, entendi!',
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                  })
                }
                className="btn btn-primary"
              >
                Alternar Pergunta
              </button>
            </div>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard
            title="Conteúdo Longo"
            description={<>Uma janela modal com conteúdo longo dentro.</>}
          >
            <button
              type="button"
              id="sweetalert-longcontent"
              onClick={() =>
                swal.fire({
                  imageUrl: 'https://placeholder.pics/svg/300x1500',
                  imageHeight: 1500,
                  imageAlt: 'Uma imagem alta',
                  customClass: {
                    confirmButton: 'btn btn-primary mt-2',
                  },
                  buttonsStyling: false,
                  showCloseButton: true,
                })
              }
              className="btn btn-secondary"
            >
              Clique em Mim
            </button>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard
            title="Com Botão de Confirmação"
            description={
              <>
                Uma mensagem de aviso, com uma função anexada ao botão
                "Confirmar"...
              </>
            }
          >
            <button
              type="button"
              id="sweetalert-confirm-button"
              onClick={() =>
                swal
                  .fire({
                    title: 'Você tem certeza?',
                    text: 'Você não poderá reverter isso!',
                    icon: 'warning',
                    showCancelButton: true,
                    customClass: {
                      confirmButton: 'btn btn-primary me-2 mt-2',
                      cancelButton: 'btn btn-danger mt-2',
                    },
                    confirmButtonText: 'Sim, exclua!',
                    buttonsStyling: false,
                    showCloseButton: true,
                  })
                  .then(function (result) {
                    if (result.value) {
                      swal.fire({
                        title: 'Excluído!',
                        text: 'Seu arquivo foi excluído.',
                        icon: 'success',
                        customClass: {
                          confirmButton: 'btn btn-primary mt-2',
                        },
                        buttonsStyling: false,
                      });
                    }
                  })
              }
              className="btn btn-secondary"
            >
              Clique em Mim
            </button>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard
            title="Com Botão de Cancelar"
            description={
              <>
                Passando um parâmetro, você pode executar algo diferente para
                "Cancelar".
              </>
            }
          >
            <button
              type="button"
              id="sweetalert-params"
              onClick={() =>
                swal
                  .fire({
                    title: 'Você tem certeza?',
                    text: 'Você não poderá reverter isso!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sim, exclua!',
                    cancelButtonText: 'Não, cancelar!',
                    customClass: {
                      confirmButton: 'btn btn-primary me-2 mt-2',
                      cancelButton: 'btn btn-danger mt-2',
                    },
                    buttonsStyling: false,
                    showCloseButton: true,
                  })
                  .then(function (result) {
                    if (result.value) {
                      swal.fire({
                        title: 'Excluído!',
                        text: 'Seu arquivo foi excluído.',
                        icon: 'success',
                        customClass: {
                          confirmButton: 'btn btn-primary mt-2',
                        },
                        buttonsStyling: false,
                      });
                    } else if (
                      // Leia mais sobre como lidar com o cancelamento
                      result.dismiss === swal.DismissReason.cancel
                    ) {
                      swal.fire({
                        title: 'Cancelado',
                        text: 'Seu arquivo imaginário está seguro :)',
                        icon: 'error',
                        customClass: {
                          confirmButton: 'btn btn-primary mt-2',
                        },
                        buttonsStyling: false,
                      });
                    }
                  })
              }
              className="btn btn-secondary"
            >
              Clique em Mim
            </button>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard
            title="Com Imagem no Cabeçalho (Logo)"
            description={
              <>Uma mensagem com Imagem no Cabeçalho personalizada.</>
            }
          >
            <button
              type="button"
              id="sweetalert-image"
              onClick={() =>
                swal.fire({
                  title: 'Legal!',
                  text: 'Modal com uma imagem personalizada.',
                  imageUrl: logoImage,
                  imageHeight: 40,
                  customClass: {
                    confirmButton: 'btn btn-primary mt-2',
                  },
                  buttonsStyling: false,
                  showCloseButton: true,
                })
              }
              className="btn btn-secondary"
            >
              Clique em Mim
            </button>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard
            title="Fechar Automaticamente"
            description={
              <>Uma mensagem com temporizador de fechamento automático.</>
            }
          >
            <button
              type="button"
              id="sweetalert-close"
              onClick={() =>
                swal
                  .fire({
                    title: 'Alerta de fechamento automático!',
                    html: 'Eu fecharei em <strong></strong> segundos.',
                    timer: 2000,
                    timerProgressBar: true,
                    showCloseButton: true,
                    didOpen: function () {
                      swal.showLoading();
                      timerInterval = setInterval(function () {
                        const content = swal.getHtmlContainer();
                        if (content) {
                          const b = content.querySelector('b');
                          if (b) {
                            b.textContent = swal.getTimerLeft();
                          }
                        }
                      }, 100);
                    },
                    onClose: function () {
                      clearInterval(timerInterval);
                    },
                  })
                  .then(function (result) {
                    /* Leia mais sobre como lidar com o fechamento abaixo */
                    if (result.dismiss === swal.DismissReason.timer) {
                      console.log('Fui fechado pelo temporizador');
                    }
                  })
              }
              className="btn btn-secondary"
            >
              Clique em Mim
            </button>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard
            title="Posição"
            description={<>Um diálogo com posição personalizada.</>}
          >
            <div className="d-flex flex-wrap gap-2">
              <button
                className="btn btn-primary"
                onClick={() =>
                  swal.fire({
                    position: 'top-start',
                    icon: 'success',
                    text: 'Seu trabalho foi salvo',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                }
                id="position-top-start"
              >
                Início Superior
              </button>
              <button
                className="btn btn-primary"
                onClick={() =>
                  swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    text: 'Seu trabalho foi salvo',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                }
                id="position-top-end"
              >
                Fim Superior
              </button>
              <button
                className="btn btn-primary"
                onClick={() =>
                  swal.fire({
                    position: 'bottom-start',
                    icon: 'success',
                    text: 'Seu trabalho foi salvo',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                }
                id="position-bottom-start"
              >
                Início Inferior
              </button>
              <button
                className="btn btn-primary"
                onClick={() =>
                  swal.fire({
                    position: 'bottom-end',
                    icon: 'success',
                    text: 'Seu trabalho foi salvo',
                    showConfirmButton: false,
                    timer: 1500,
                    customClass: {
                      confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                  })
                }
                id="position-bottom-end"
              >
                Fim Inferior
              </button>
            </div>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard
            title="Com Preenchimento, Fundo Personalizado"
            description={
              <>
                Uma mensagem com largura, preenchimento e fundo personalizados.
              </>
            }
          >
            <button
              type="button"
              id="custom-padding-width-alert"
              onClick={() =>
                swal.fire({
                  title: 'Largura, preenchimento e fundo personalizados.',
                  width: 600,
                  padding: 100,
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                  buttonsStyling: false,
                  background:
                    'var(--osen-secondary-bg) url(assets/images/small/small-5.jpg) no-repeat center',
                })
              }
              className="btn btn-secondary"
            >
              Clique em Mim
            </button>
          </ComponentContainerCard>
        </Col>
        <Col lg={6}>
          <ComponentContainerCard
            title="Requisição Ajax"
            description={<>Exemplo de requisição Ajax.</>}
          >
            <button
              type="button"
              id="ajax-alert"
              onClick={() =>
                swal
                  .fire({
                    title: 'Envie o e-mail para executar a requisição Ajax',
                    input: 'email',
                    showCancelButton: true,
                    confirmButtonText: 'Enviar',
                    showLoaderOnConfirm: true,
                    customClass: {
                      confirmButton: 'btn btn-primary me-2',
                      cancelButton: 'btn btn-danger',
                    },
                    buttonsStyling: false,
                    showCloseButton: true,
                    preConfirm: function (email) {
                      return new Promise(function (resolve, reject) {
                        setTimeout(function () {
                          if (email === 'taken@example.com') {
                            reject('Este e-mail já está em uso.');
                          } else {
                            resolve();
                          }
                        }, 2000);
                      });
                    },
                    allowOutsideClick: false,
                  })
                  .then(function (email) {
                    swal.fire({
                      icon: 'success',
                      title: 'Requisição Ajax finalizada!',
                      customClass: {
                        confirmButton: 'btn btn-primary',
                      },
                      buttonsStyling: false,
                      html: 'E-mail enviado: ' + email,
                    });
                  })
              }
              className="btn btn-secondary"
            >
              Clique em Mim
            </button>
          </ComponentContainerCard>
        </Col>
      </Row>
    </>
  );
});

export default AllAlert;
