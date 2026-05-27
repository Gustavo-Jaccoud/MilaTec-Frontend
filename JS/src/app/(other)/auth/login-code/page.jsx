import React from 'react';
import logoDark from '@/assets/images/logo-milatec.png';
import logo from '@/assets/images/logo-milatec.png';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getLoginEmail, setToken, clearLoginEmail, setUserRole} from  "@/services/auth";


const LoginCodePage = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const email = getLoginEmail();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loadingResend, setLoadingResend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [success, setSuccess] = useState("");




  useEffect(() => {
    if (!email) {
      navigate("/auth/login", { replace: true });
    }
  }, [email, navigate]);


  const handleResendCode = async () => {
    setSuccess("");
    setError("");
    if (!email) { 
  navigate("/auth/login", { replace: true });
      return;
    }
    setLoadingResend(true);
    try {
      const response = await fetch("localhost:3000/request-pin", { 
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


      setSuccess("Código reenviado com sucesso");


    } catch (error) {
      setError("Não foi possível reenviar o código");




    } finally {
      setLoadingResend(false);
    }
  };


  const handleVerify = async (e) => {
    e.preventDefault();




    setError("");
    setSuccess("");




    if (!email) {
      navigate("/auth/login", { replace: true });
      return;
    }
    if (!code) {
      setError("Por favor, informe o código.");
      return;
    }


    if (!/^\d{4}$/.test(code)) {
      setError("Código inválido.");
      return;
    }




    const cleanCode = code.trim().replace(/\D/g, "").slice(0, 4);
    setLoadingVerify(true);




    try {
    const response = await fetch("localhost:3000/verify-pin", { 
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    email: email,
    code: cleanCode,
    }),
    });



    let data = {};




    try {
      data = await response.json();
      } catch {
        data = {};
      }




      if (!response.ok) {
        setError(data.message || "Erro na requisição");
        return;
      }




      if (!data.token) {
        setError("Não foi possível validar o código.");
        return;
      }




      setError("");
      setToken(data.token);
     
 
      const decoded = jwtDecode(data.token);


      setUserRole(decoded.role); 


      clearLoginEmail();

      if (decoded.role === "admin") {
        navigate(""); // colocar rota
        
      }else if (decoded.role === "user") {
        navigate(""); // colocar rota
     
      }else{
        navigate("/auth/login");
      }

      

    } catch (error) {
      setError("Erro de conexão. Tente novamente.");
    }finally {
      setLoadingVerify(false);
    }


  };


  return (
    <>
      <PageBreadcrumb title="Código de Verificação" />
      <div className="auth-bg d-flex align-items-center justify-content-center min-vh-100">
        <Row className="g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
          <Col xxl={3} lg={5} md={6}>
           
            <Card className="overflow-hidden text-center p-xxl-4 p-3 mb-0">

              <div className="auth-brand d-flex justify-content-center mb-2">
                <img src={logoDark} alt="logo escuro" style={{ width: '13rem' }} className="logo-dark" />
                <img src={logo} alt="logo claro" style={{ width: '13rem' }} className="logo-light" />
              </div>
             
             {email && (
                <p className="fw-semibold mb-3 fs-5"
                style={{ wordBreak: "break-word" }}>
                  Enviamos um código de verificação para: {email}
                </p>
              )}
              <Form onSubmit={handleVerify} className="text-start mb-3">
                <label className="form-label" htmlFor="code">
                  Digite o código de verificação de 4 dígitos
                </label>
                <div className="d-flex gap-2 mt-1 mb-3">
                  <Form.Control
         id="code"
                    type="text"
                    placeholder="Digite o código"
                    maxLength={4}
                    value={code}
                    onChange={(e) => {
                      const value = e.target.value;

                      if (!/^\d*$/.test(value)) return;
                      setCode(value);
                      setError("");
                      setSuccess("");
                    }}
                  />
                </div>

                 {error && (
                    <div className="text-danger mb-2">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="text-success mb-2">
                      {success}
                    </div>
                  )}
                <div className="d-grid">
                  <button className="btn btn-primary fw-semibold" type="submit"  disabled={loadingVerify} style={{ backgroundColor: '#050960', borderColor: '#050960' }}>{loadingVerify ? "Verificando..." : "Avançar"}</button>
                </div>
                <p className="mb-0 text-center">
                  Não recebeu o código ainda?{' '}
                <button
                  type="button"
                  className="btn btn-link p-0 fw-semibold text-decoration-underline"
                  onClick={handleResendCode}
                  disabled={loadingResend}
                >
                  {loadingResend ? "Enviando..." : "Enviar novamente"}
                </button>
                </p>
              </Form>
             
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};



export default LoginCodePage ;








