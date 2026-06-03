import classNames from 'classnames';

/**
 * @param {{ title: string, emptyText?: string, className?: string, children?: import('react').ReactNode }} props
 */
const AttachmentBox = ({ title, emptyText = 'Sem anexos', className, children }) => {
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

export default AttachmentBox;
