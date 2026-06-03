/**
 * Section wrapper with title
 * @param {{
 *   title: string,
 *   children: import('react').ReactNode,
 *   className?: string
 * }} props
 */
const DetailsSection = ({ title, children, className }) => {
  return (
    <section className={`details-section ${className || ''}`}>
      <h2 className="details-section__title">{title}</h2>
      {children}
    </section>
  );
};

export default DetailsSection;
