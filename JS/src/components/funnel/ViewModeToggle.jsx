import IconifyIcon from '@/components/wrappers/IconifyIcon';
import { Button, ButtonGroup } from 'react-bootstrap';

const VIEW_MODES = [
  { value: 'kanban', label: 'Kanban', icon: 'tabler:layout-kanban' },
  { value: 'table', label: 'Tabela', icon: 'tabler:table' }
];

const ViewModeToggle = ({ value, onChange }) => {
  return (
    <ButtonGroup aria-label="Alternar visualizacao do funil">
      {VIEW_MODES.map((mode) => (
        <Button
          key={mode.value}
          type="button"
          variant={value === mode.value ? 'primary' : 'light'}
          className="d-inline-flex align-items-center gap-1"
          aria-pressed={value === mode.value}
          onClick={() => onChange(mode.value)}
        >
          <IconifyIcon icon={mode.icon} className="fs-18" />
          <span>{mode.label}</span>
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default ViewModeToggle;
