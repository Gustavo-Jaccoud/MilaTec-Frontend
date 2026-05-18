import { useEffect, useState } from 'react';
import { useAuth } from '@/context/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchDeliveries } from '@/services/deliveryService';

const useDeliveryCalendar = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar dados de entregas da API
  const fetchDeliveriesData = async () => {
    if (!accessToken) {
      setError('Faça login para ver as entregas.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await fetchDeliveries(accessToken);
      
      if (data) {
        // Mapear dados de entrega para formato de eventos do calendário
        const calendarEvents = data.map((delivery) => ({
          id: delivery.id,
          title: delivery['Entregas'] || 'Entrega',
          start: delivery['Data de entrega'],
          end: delivery['Data de entrega'],
          className: delivery['Pedido produzido'] ? 'bg-success' : 'bg-warning',
          extendedProps: {
            pedidoProduzido: delivery['Pedido produzido'],
            cidade: delivery['Cidade da obra (from Orçamentos)'] || '',
          }
        }));
        setEvents(calendarEvents);
      }
    } catch (err) {
      setError('Erro ao carregar entregas');
      console.error('Erro ao buscar entregas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveriesData();
  }, [accessToken]);

  const handleEventClick = (arg) => {
    const eventId = arg.event.id;
    navigate(`/delivery/${eventId}`);
  };

  const handleDateClick = (arg) => {
    // Você pode implementar lógica para adicionar nova entrega
    console.log('Data clicada:', arg.dateStr);
  };

  return {
    events,
    loading,
    error,
    handleEventClick,
    handleDateClick,
    refetchDeliveries: fetchDeliveriesData,
  };
};

export default useDeliveryCalendar;
