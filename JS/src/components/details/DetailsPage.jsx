import { Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '@/context/useAuthContext';

/**
 * Wrapper for page-level logic (loading, error, auth checks)
 * @param {{
 *   children: import('react').ReactNode,
 *   loading: boolean,
 *   error: string | null,
 *   onLoad: () => void | Promise<void>,
 *   loadingMessage?: string,
 *   errorMessage?: string,
 *   authMessage?: string,
 *   className?: string
 * }} props
 */
const DetailsPage = ({
  children,
  loading,
  error,
  onLoad,
  loadingMessage = 'Carregando detalhes…',
  errorMessage = 'Não foi possível carregar.',
  authMessage = 'Faça login para ver os detalhes.',
  className,
}) => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return (
      <div className={`details-page ${className || ''}`}>
        <Alert variant="warning" className="mt-2">
          {authMessage}
        </Alert>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`details-page text-center py-5 ${className || ''}`}>
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Carregando…</span>
        </Spinner>
        <p className="mt-3 text-muted mb-0">{loadingMessage}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`details-page ${className || ''}`}>
        <Alert variant="danger" className="mt-2">
          {error}
        </Alert>
      </div>
    );
  }

  return <div className={`details-page ${className || ''}`}>{children}</div>;
};

export default DetailsPage;
