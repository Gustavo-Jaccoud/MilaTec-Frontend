import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Button } from 'react-bootstrap';

/**
 * @param {{ title: string }} props
 */
const ProjectDetailsHeader = ({ title }) => {
  const navigate = useNavigate();

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleCopyLink = useCallback(() => {
    const url = window.location.href;
    const done = () => toast.success('Link copiado para a área de transferência');
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(done).catch(() => {
        toast.error('Não foi possível copiar o link');
      });
    } else {
      toast.error('Copiar link não suportado neste navegador');
    }
  }, []);

  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <header className="project-details-header">
      <div className="project-details-header__top">
        <div>
          <div className="project-details-header__kicker">PROJETOS</div>
          <p className="project-details-header__subtitle">Acompanhe seus projetos!</p>
        </div>
        <div className="project-details-header__actions">
          <Button
            type="button"
            variant="link"
            className="project-details-header__icon-btn p-0"
            onClick={handlePrint}
            aria-label="Imprimir"
          >
            <IconifyIcon icon="tabler:printer" className="fs-22" />
          </Button>
          <Button
            type="button"
            variant="link"
            className="project-details-header__icon-btn p-0"
            onClick={handleCopyLink}
            aria-label="Copiar link"
          >
            <IconifyIcon icon="tabler:link" className="fs-22" />
          </Button>
          <Button
            type="button"
            variant="link"
            className="project-details-header__icon-btn p-0"
            onClick={handleClose}
            aria-label="Fechar"
          >
            <IconifyIcon icon="tabler:x" className="fs-24" />
          </Button>
        </div>
      </div>
      <h1 className="project-details-header__title">{title}</h1>
    </header>
  );
};

export default ProjectDetailsHeader;
