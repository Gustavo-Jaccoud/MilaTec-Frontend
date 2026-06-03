import { Card, CardBody, Col } from 'react-bootstrap';
import Calendar from '../../apps/calendar/components/Calendar';
import useDeliveryCalendar from '../useDeliveryCalendar';

const DeliveryCalendarPage = () => {
  const {
    events,
    loading,
    error,
    handleEventClick,
    handleDateClick,
  } = useDeliveryCalendar();

  if (loading) {
    return (
      <Col xl={12}>
        <Card>
          <CardBody>
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }

  if (error) {
    return (
      <Col xl={12}>
        <Card>
          <CardBody>
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </CardBody>
        </Card>
      </Col>
    );
  }

  return (
    <>
      <Col xl={12}>
        <Card>
          <CardBody>
            <Calendar
              events={events}
              onEventClick={handleEventClick}
              onDateClick={handleDateClick}
              onDrop={() => {}}
              onEventDrop={() => {}}
            />
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default DeliveryCalendarPage;
