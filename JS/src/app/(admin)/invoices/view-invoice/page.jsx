import React from 'react';
import { logoOriginal as logoDark } from '@/assets/brandAssets';
import qrCode from '@/assets/images/png/qr-code.png';
import { invoiceProductData } from './data';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import PrintButton from './PrintButton';
import signature from '@/assets/images/png/signature.png';
import { Card, CardBody, Col, Row, Table } from 'react-bootstrap';
import PageBreadcrumb from '@/components/PageBreadcrumb';

//

const ViewInvoicePage = () => {
  return (
    <>
      <PageBreadcrumb title="Ver Fatura" />
      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <div className="d-flex align-items-start justify-content-between mb-4">
                <div>
                  <img src={logoDark} alt="logo escuro" height={24} />
                </div>
                <div className="text-end">
                  <span className="badge bg-success-subtle text-success px-1 fs-12 mb-3">
                    Paga
                  </span>
                  <h3 className="m-0 fw-bolder fs-20">Fatura: #INV7896</h3>
                </div>
              </div>
              <Row>
                <Col xs={4}>
                  <div className="mb-4">
                    <h5 className="fw-bold pb-1 mb-2 fs-14"> Fatura De: </h5>
                    <h6 className="fs-14 mb-2">Chris Keller</h6>
                    <h6 className="fs-14 text-muted mb-2 lh-base">
                      1055 Station Street Fremont,
                      <br /> CA - 94539
                    </h6>
                    <h6 className="fs-14 text-muted mb-0">
                      Telefone: 510-875-0005
                    </h6>
                  </div>
                  <div>
                    <h5 className="fw-bold fs-14"> Data da Fatura: </h5>
                    <h6 className="fs-14 text-muted">12 Abr 2024</h6>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="mb-4">
                    <h5 className="fw-bold pb-1 mb-2 fs-14">
                      {' '}
                      Faturado Para:{' '}
                    </h5>
                    <h6 className="fs-14 mb-2">Lucian Obrien</h6>
                    <h6 className="fs-14 text-muted mb-2 lh-base">
                      1147 Rohan Drive Suite,
                      <br />
                      Burlington, VT / 82021
                    </h6>
                    <h6 className="fs-14 text-muted mb-0">
                      Telefone: 904-966-2836
                    </h6>
                  </div>
                  <div>
                    <h5 className="fw-bold fs-14"> Data de Vencimento: </h5>
                    <h6 className="fs-14 text-muted">28 Abr 2024</h6>
                  </div>
                </Col>
                <div className="col-4 text-end">
                  <img src={qrCode} alt="imagem do código QR" height={100} />
                </div>
              </Row>
            </CardBody>
            <div className="mt-4">
              <div className="table-responsive">
                <Table className="text-center table-nowrap align-middle mb-0">
                  <thead>
                    <tr className="bg-light bg-opacity-50">
                      <th
                        className="border-0"
                        scope="col"
                        style={{
                          width: 50,
                        }}
                      >
                        #
                      </th>
                      <th className="text-start border-0" scope="col">
                        Detalhes do Produto
                      </th>
                      <th className="border-0" scope="col">
                        Quantidade
                      </th>
                      <th className="border-0" scope="col">
                        Preço Unitário
                      </th>
                      <th className="text-end border-0" scope="col">
                        Valor
                      </th>
                    </tr>
                  </thead>
                  <tbody id="products-list">
                    {invoiceProductData.map((item, idx) => (
                      <tr key={idx}>
                        <th scope="row">0{idx + 1}</th>
                        <td className="text-start">
                          <div className="d-flex align-items-center gap-2">
                            <IconifyIcon icon={item.icon} className="fs-22" />
                            <div>
                              <span className="fw-medium">{item.title}</span>
                              <p className="text-muted mb-0">
                                ({item.description})
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>{item.quantity}</td>
                        <td>${item.price}</td>
                        <td className="text-end">${item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <div>
                <Table
                  className="table-nowrap align-middle mb-0 ms-auto"
                  style={{
                    width: 335,
                  }}
                >
                  <tbody>
                    <tr>
                      <td className="fw-medium">Subtotal</td>
                      <td className="text-end">$2,599.00</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">
                        Envio <small className="text-muted">(Grátis)</small>
                      </td>
                      <td className="text-end">-</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">
                        Desconto <small className="text-muted">(10%)</small>
                      </td>
                      <td className="text-end">-$259.90</td>
                    </tr>
                    <tr>
                      <td className="fw-medium">
                        Imposto <small className="text-muted">(5%)</small>
                      </td>
                      <td className="text-end">$116.95</td>
                    </tr>
                    <tr className="border-top border-top-dashed fs-16">
                      <td className="fw-bold">Valor Total</td>
                      <td className="fw-bold text-end">$2456.05</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
            <CardBody>
              <div className="bg-body p-2 rounded-2 mt-4">
                <p className="mb-0">
                  <span className="fs-12 fw-bold text-uppercase">Nota: </span>O
                  pagamento de todas as contas deve ser feito dentro de 7 dias
                  após o recebimento da fatura. Os pagamentos podem ser feitos
                  via cheque, cartão de crédito ou pagamento online direto. O
                  não pagamento dentro de 7 dias resultará na cobrança da taxa
                  acordada, conforme mencionado acima, sendo cobrada contra os
                  dados de crédito fornecidos como confirmação do trabalho
                  realizado.
                </p>
              </div>
              <div className="mt-4">
                <p className="mb-2 pb-2">
                  <b>Parabéns pela sua compra recente!</b> Foi um prazer
                  atendê-lo, e esperamos vê-lo novamente em breve.
                </p>
                <div className="d-inline-block">
                  <img src={signature} alt="assinatura" height={32} />
                  <h5 className="mb-0 mt-2">Assinatura Autorizada</h5>
                </div>
              </div>
            </CardBody>
          </Card>
          <div className="d-print-none mb-5">
            <div className="d-flex justify-content-center gap-2">
              <PrintButton />
              <a href="" className="btn btn-secondary">
                <IconifyIcon icon="tabler:send" className="me-1" />
                Enviar
              </a>
              <a href="" className="btn btn-info">
                <IconifyIcon icon="tabler:download" className="me-1" />
                Baixar
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default ViewInvoicePage;
