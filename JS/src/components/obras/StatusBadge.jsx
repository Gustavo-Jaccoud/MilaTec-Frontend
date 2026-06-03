import classNames from 'classnames';

/**
 * @param {{ status: string, className?: string, badgeClass?: string }} props
 */
const StatusBadge = ({ status, className, badgeClass }) => {
  const s = (status || '').trim();
  if (!s || s === '-') {
    return <span className="details-muted">-</span>;
  }
  return <span className={classNames(badgeClass || 'obra-details-status-badge', className)}>{s}</span>;
};

export default StatusBadge;
