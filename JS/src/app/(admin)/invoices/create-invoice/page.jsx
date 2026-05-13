import { logoOriginal as logoDark } from '@/assets/brandAssets';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Card, CardBody, Col, Form, Row, Table } from 'react-bootstrap';
import PreviewButton from './Preview';
const CreateInvoicePage = () => {
  return (
    <>
      <PageBreadcrumb title="Criar Fatura" />
      <Row>
        <Col xs={12}>
          <Card className="position-relative">
            <Form>
              <CardBody>
                <div className="d-flex align-items-start justify-content-between mb-4">
                  <div
                    className="overflow-hidden position-relative border rounded d-flex align-items-center justify-content-start px-2"
                    style={{
                      height: 60,
                      width: 260,
                    }}
                  >
                    <label
                      htmlFor="imageInput"
                      className="position-absolute top-0 start-0 end-0 bottom-0"
                    />
                    <input className="d-none" type="file" id="imageInput" />
                    <img
                      id="preview"
                      src={logoDark}
                      alt="Imagem de Visualização"
                      height={28}
                    />
                  </div>
                  <div className="text-end">
                    <Row className=" g-1 align-items-center">
                      <Col xs={'auto'}>
                        <label
                          htmlFor="invoiceNo"
                          className="col-form-label fs-16 fw-bold"
                        >
                          #INV
                        </label>
                      </Col>
                      <Col xs={'auto'}>
                        <Form.Control
                          type="number"
                          id="invoiceNo"
                          className="form-control"
                          placeholder={'00001234'}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
                <Row>
                  <Col xl={4} lg={4} md={6} sm={6} className="mt-sm-0 mt-3">
                    <div className="mb-2">
                      <label className="form-label">Data da Fatura :</label>
                      <Form.Control
                        type="text"
                        data-provider="flatpickr"
                        data-date-format="d M, Y"
                        data-deafult-date="today"
                        placeholder="Selecionar Data"
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Data de Vencimento :</label>
                      <Form.Control
                        type="text"
                        data-provider="flatpickr"
                        data-altformat="F j, Y"
                        placeholder="Selecionar Data"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="InvoicePaymentStatus"
                        className="form-label"
                      >
                        Status do Pagamento
                      </label>
                      <Form.Select id="InvoicePaymentStatus">
                        <option>Selecionar Status</option>
                        <option value="Choice 1">Pago</option>
                        <option value="Choice 2">Não Pago</option>
                        <option value="Choice 3">Cancelado</option>
                        <option value="Choice 4">Reembolsado</option>
                      </Form.Select>
                    </div>
                    <div>
                      <label
                        htmlFor="InvoicePaymentMethod"
                        className="form-label"
                      >
                        Método de Pagamento
                      </label>
                      <Form.Select id="InvoicePaymentMethod">
                        <option>Selecionar Método</option>
                        <option value="Choice 1">
                          Cartão de Crédito / Débito
                        </option>
                        <option value="Choice 2">Transferência Bancária</option>
                        <option value="Choice 3">PayPal</option>
                        <option value="Choice 4">Payoneer</option>
                        <option value="Choice 5">Pagamento na Entrega</option>
                        <option value="Choice 6">Carteira</option>
                        <option value="Choice 7">UPI (Gpay)</option>
                      </Form.Select>
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-4">
                      <label className="form-label">
                        Endereço de Cobrança :
                      </label>
                      <div className="mb-2 pb-1">
                        <Form.Control
                          type="text"
                          id="BName"
                          placeholder="Nome Completo"
                        />
                      </div>
                      <div className="mb-2 pb-1">
                        <Form.Control
                          as="textarea"
                          id="BAddress"
                          rows={3}
                          placeholder="Endereço"
                          defaultValue={''}
                        />
                      </div>
                      <div>
                        <Form.Control
                          type="text"
                          id="BNumber"
                          placeholder="Número de Telefone"
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xl={4} lg={4} md={6} sm={6} className="mt-sm-0 mt-3">
                    <div className="mb-4">
                      <label className="form-label">
                        Endereço de Entrega :
                      </label>
                      <div className="mb-2 pb-1">
                        <Form.Control
                          type="text"
                          id="SName"
                          placeholder="Nome Completo"
                        />
                      </div>
                      <div className="mb-2 pb-1">
                        <Form.Control
                          as="textarea"
                          id="SAddress"
                          rows={3}
                          placeholder="Endereço"
                          defaultValue={''}
                        />
                      </div>
                      <div>
                        <Form.Control
                          type="text"
                          id="SNumber"
                          placeholder="Número de Telefone"
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="mt-4">
                  <div className="table-responsive">
                    <Table className="text-center table-nowrap align-middle mb-0">
                      <thead>
                        <tr className="bg-light bg-opacity-50">
                          <th
                            scope="col"
                            className="border-0"
                            style={{
                              width: 70,
                            }}
                          >
                            #
                          </th>
                          <th scope="col" className="border-0 text-start">
                            Detalhes do Produto
                          </th>
                          <th
                            scope="col"
                            className="border-0"
                            style={{
                              width: 140,
                            }}
                          >
                            Quantidade
                          </th>
                          <th
                            scope="col"
                            className="border-0"
                            style={{
                              width: 140,
                            }}
                          >
                            Preço Unitário
                          </th>
                          <th
                            scope="col"
                            className="border-0"
                            style={{
                              width: 240,
                            }}
                          >
                            Valor
                          </th>
                          <th
                            scope="col"
                            className="border-0"
                            style={{
                              width: 50,
                            }}
                          >
                            •••
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">01</th>
                          <td className="text-start">
                            <Form.Control
                              type="text"
                              id="product-detail-one"
                              className=" mb-1"
                              placeholder="Produto Um"
                            />
                            <Form.Control
                              type="text"
                              id="product-desc-one"
                              placeholder="Descrição do item"
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              id="product-category-one"
                              placeholder="Quantidade"
                            />
                          </td>
                          <td>
                            <Form.Control type="number" placeholder="Preço" />
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              className="  w-auto"
                              placeholder="$0.00"
                            />
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn flex-shrink-0 rounded-circle btn-icon btn-ghost-danger"
                            >
                              <IconifyIcon
                                icon="solar:trash-bin-trash-bold-duotone"
                                className="fs-20"
                              />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">02</th>
                          <td className="text-start">
                            <Form.Control
                              type="text"
                              id="product-detail-two"
                              className=" mb-1"
                              placeholder="Produto Dois"
                            />
                            <Form.Control
                              type="text"
                              id="product-desc-two"
                              placeholder="Descrição do item"
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              id="product-category-two"
                              placeholder="Quantidade"
                            />
                          </td>
                          <td>
                            <Form.Control type="number" placeholder="Preço" />
                          </td>
                          <td>
                            <Form.Control
                              type="number"
                              className="  w-auto"
                              placeholder="$0.00"
                            />
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn flex-shrink-0 rounded-circle btn-icon btn-ghost-danger"
                            >
                              <IconifyIcon
                                icon="solar:trash-bin-trash-bold-duotone"
                                className="fs-20"
                              />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <div className="p-2">
                      <button type="button" className="btn btn-primary">
                        <IconifyIcon
                          icon="tabler:circle-plus"
                          className="me-1"
                        />{' '}
                        Adicionar Produtos
                      </button>
                    </div>
                  </div>
                  <div>
                    <Table
                      className="table-sm table-borderless table-nowrap align-middle mb-0 ms-auto"
                      style={{
                        width: 300,
                      }}
                    >
                      <tbody>
                        <tr>
                          <td className="fw-medium">Subtotal</td>
                          <td className="text-end">
                            <div
                              className="ms-auto"
                              style={{
                                width: 160,
                              }}
                            >
                              <Form.Control
                                type="number"
                                id="productSubtotal"
                                placeholder="$0.00"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-medium">Envio</td>
                          <td className="text-end">
                            <div
                              className="ms-auto"
                              style={{
                                width: 160,
                              }}
                            >
                              <Form.Control
                                type="number"
                                id="productShipping"
                                placeholder="$0.00"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Desconto <small className="text-muted">(10%)</small>
                          </td>
                          <td className="text-end">
                            <div
                              className="ms-auto"
                              style={{
                                width: 160,
                              }}
                            >
                              <Form.Control
                                type="number"
                                id="productDiscount"
                                placeholder="$0.00"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-medium">
                            Imposto <small className="text-muted">(18%)</small>
                          </td>
                          <td className="text-end">
                            <div
                              className="ms-auto"
                              style={{
                                width: 160,
                              }}
                            >
                              <Form.Control
                                type="number"
                                id="productTaxes"
                                placeholder="$0.00"
                              />
                            </div>
                          </td>
                        </tr>
                        <tr className="fs-15">
                          <th scope="row" className="fw-bold">
                            Valor Total
                          </th>
                          <th className="text-end">
                            <div
                              className="ms-auto"
                              style={{
                                width: 160,
                              }}
                            >
                              <Form.Control
                                type="number"
                                id="productTotalAmount"
                                disabled
                                placeholder="$0.00"
                              />
                            </div>
                          </th>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </div>
                <div>
                  <label className="form-label" htmlFor="InvoiceNote">
                    {' '}
                    Nota :{' '}
                  </label>
                  <Form.Control
                    as="textarea"
                    id="InvoiceNote"
                    placeholder="Obrigado pelo seu negócio"
                    rows={3}
                    defaultValue={''}
                  />
                </div>
              </CardBody>
            </Form>
          </Card>
          <div className="mb-5">
            <div className="d-flex justify-content-center gap-2">
              <PreviewButton />
              <a href="" className="btn btn-success gap-1">
                <IconifyIcon icon="tabler:device-floppy" className="fs-16" />{' '}
                Salvar
              </a>
              <a href="" className="btn btn-info gap-1">
                <IconifyIcon icon="tabler:send" className=" fs-16" /> Enviar
                Fatura
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default CreateInvoicePage;
