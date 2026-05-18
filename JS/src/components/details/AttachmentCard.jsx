import classNames from 'classnames';

/**
 * Reusable attachment/document card
 * @param {{
 *   title: string,
 *   emptyText?: string,
 *   children?: import('react').ReactNode,
 *   className?: string
 * }} props
 */
const AttachmentCard = ({ title, emptyText = 'Sem anexos', children, className }) => {
  const hasContent = children != null && children !== false;

  return (
    <div className={classNames('details-attachment-card', className)}>
      <div className="details-attachment-card__title">{title}</div>
      <div className="details-attachment-card__body">
        {hasContent ? children : <span className="details-attachment-card__empty">{emptyText}</span>}
      </div>
    </div>
  );
};

export default AttachmentCard;
