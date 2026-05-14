import classNames from 'classnames';

/**
 * @param {{ status: string, className?: string }} props
 */
const StatusBadge = ({ status, className }) => {
  const s = (status || '').trim();
  if (!s || s === '-') {
    return <span className="obra-details-muted">-</span>;
  }
  return <span className={classNames('obra-details-status-badge', className)}>{s}</span>;
};

export default StatusBadge;
