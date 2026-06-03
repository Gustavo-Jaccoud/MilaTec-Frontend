import { Row } from 'react-bootstrap';
import DeliveryCalendarPage from './components/DeliveryCalendarPage';
import PageBreadcrumb from '@/components/PageBreadcrumb';

const ProgramacaoEntregas = () => {
  return (
    <>
      <PageBreadcrumb title='Programação de Entregas' />
      <Row>
        <DeliveryCalendarPage />
      </Row>
    </>
  );
};

export default ProgramacaoEntregas;
