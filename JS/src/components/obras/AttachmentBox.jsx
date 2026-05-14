import classNames from 'classnames';

/**
 * @param {{ title: string, emptyText?: string, className?: string, children?: import('react').ReactNode }} props
 */
const AttachmentBox = ({ title, emptyText = 'Sem anexos', className, children }) => {
  const hasContent = children != null && children !== false;
  return (
    <div className={classNames('obra-details-attachment-box', className)}>
      <div className="obra-details-attachment-box__title">{title}</div>
      <div className="obra-details-attachment-box__body">
        {hasContent ? children : <span className="obra-details-attachment-box__empty">{emptyText}</span>}
      </div>
    </div>
  );
};

export default AttachmentBox;
