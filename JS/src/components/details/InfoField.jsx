import { Col } from 'react-bootstrap';
import StatusBadge from '@/components/obras/StatusBadge';

/**
 * Individual label + value field
 * @param {{
 *   label: string,
 *   value: string | import('react').ReactNode,
 *   colProps?: object,
 *   compact?: boolean,
 *   asBadge?: boolean,
 *   className?: string
 * }} props
 */
const InfoField = ({ label, value, colProps = { xs: 12, md: 6, lg: 4 }, compact = false, asBadge = true, className }) => {
  const fieldClassName = `details-field ${compact ? 'details-field--compact' : ''} ${className || ''}`;

  return (
    <Col {...colProps}>
      <div className={fieldClassName}>
        <span className="details-field__label">{label}</span>
        {asBadge && typeof value === 'string' ? (
          <StatusBadge status={value} badgeClass="details-status-badge" />
        ) : (
          <span className="details-field__plain">{value}</span>
        )}
      </div>
    </Col>
  );
};

export default InfoField;
