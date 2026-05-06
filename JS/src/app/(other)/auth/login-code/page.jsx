import logoDark from '@/assets/images/logo-milatec.png';
import logo from '@/assets/images/logo-milatec.png';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { currentYear } from '@/context/constants';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { setToken } from "@/app/services/auth.js";


const LoginCodePage = () => {


  const navigate = useNavigate(); 
  const location = useLocation(); 
  const email = location.state?.emailUsuario; 
  const [code, setCode] = useState(""); 
  const [error, setError] = useState("");
  const [loadingResend, setLoadingResend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

  useEffect(() => { 
    if (!email) {
      navigate("/auth/login", { replace: true });
    }
  }, [email, navigate]);


  const handleResendCode = async () => { 
    setError(""); 
    if (!email) {
      setError("Sessão inválida. Volte e tente novamente.");
      return;
    }
    setLoadingResend(true);
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
      } catch {
        data = {};
      }

      if (!response.ok) {
        setError(data.message || "Erro ao enviar código");
        return;
      }


      setError("Código reenviado com sucesso");


    } catch (error) {
      setError("Não foi possível reenviar o código");

    } finally {
      setLoadingResend(false); 
    }
  };


  const handleVerify = async (e) => {
    e.preventDefault();

    setError("");



    const codigo = code;

    if (!email) {
      setError("Sessão inválida. Volte e tente novamente.");
      return;
    }
    if (!codigo) {
      setError("Digite o código");
      return;
    }


    if (!/^\d{6}$/.test(codigo)) {
      setError("O código deve ter exatamente 6 números");
      return;
    }

    setLoadingVerify(true);

    try {
    const response = await fetch("", { //colocar depois o endpoint referente do backend dentro das aspas duplas
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify({
    email,
    code: codigo,
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
        setError("Código inválido ou não autorizado");
        return;
      }

      setError("");
      setToken(data.token);


      navigate("/dashboard");

    } catch (error) {
      setError("Erro de conexão com o servidor");
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
                <p className="fw-semibold mb-3 fs-5">
                  Enviamos um código de verificação para: {email}
                </p>
              )}


              <Form onSubmit={handleVerify} className="text-start mb-3">
                <label className="form-label" htmlFor="code">
                  Digite o código de verificação de 6 Dígitos
                </label>
                <div className="d-flex gap-2 mt-1 mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Digite o código"
                    maxLength={6}
                    value={code}
                    onChange={(e) => {
                      const value = e.target.value;


                      
                      if (!/^\d*$/.test(value)) return;


                      setCode(value);
                      setError("");
                    }}
                  />
                </div>

                 {error && (
    <div className="text-danger mb-2">
      {error}
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
            <p className="mt-4 text-center mb-0">
              {currentYear} © Fundação de Saúde Parreiras Horta
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
};




export default LoginCodePage ;
