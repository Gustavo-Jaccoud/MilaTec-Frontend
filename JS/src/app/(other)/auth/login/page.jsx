import React from 'react';
import logoDark from '@/assets/images/logo-milatec.png';
import logo from '@/assets/images/logo-milatec.png';
import { Card, Col, Form, Row } from 'react-bootstrap';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import {useNavigate} from 'react-router-dom';
import { currentYear } from '@/context/constants';
import { useState } from 'react';




const LoginPage = () => {


  const [email, setEmail] = useState("");


  const navigate = useNavigate();


  const [loading, setLoading] = useState(false);


  const [error, setError] = useState("");


  const handleAvancar = async (e) => {
  e.preventDefault();


  setError("");


  if (!email) {
    setError("Digite um email");
    return;
  }


  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("Email inválido");
    return;
  }


  setLoading(true);


  try {
    const response = await fetch("", { //colocar depois o endpoint referente do backend dentro das aspas duplas
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }), 
    });


    let data = {};
    try {
      data = await response.json();
    } catch (e) {
      data = {};
    }




    if (!response.ok) {
      setError(data.message || "Erro ao enviar código"); 
      return;
    }


    navigate("/auth/login-code", {
      state: { emailUsuario: email }
    });


    } catch (error) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };


  return <>
      <PageBreadcrumb title='Login' />
      <div className="auth-bg d-flex align-items-center justify-content-center min-vh-100">
        <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
          <Col xxl={3} lg={5} md={6}>
           
            <Card className="overflow-hidden text-center p-xxl-4 p-3 mb-0">
              <div className="auth-brand d-flex justify-content-center mb-2">
                <img src={logoDark} alt="logo escuro" style={{ width: '13rem' }} className="logo-dark" />
                <img src={logo} alt="logo claro" style={{ width: '13rem' }} className="logo-light" />
              </div>
              <h4 className="fw-semibold mb-3 fs-18">ENTRAR</h4>
              <Form onSubmit={handleAvancar} className="text-start mb-3">
                <div className="mb-3">
                  <label className="form-label" htmlFor="example-email">Email</label>
                  <Form.Control type="email" id="example-email" name="example-email" placeholder="Digite seu email" required value={email} onChange={(e) => setEmail(e.target.value)}/>


                {error && (
                <div className="text-danger mb-2">
                {error}
                </div>
                )} 
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary fw-semibold" type="submit"  disabled={loading} style={{ backgroundColor: '#050960', borderColor: '#050960' }}> {loading ? "Enviando..." : "Avançar"} </button>
                </div>
              </Form>
             
            </Card>
            <p className="mt-4 text-center mb-0">
             {currentYear} © Fundação de Saúde Parreiras Horta
            </p>
          </Col>
        </Row>
      </div>
    </>;
};


export default LoginPage;




