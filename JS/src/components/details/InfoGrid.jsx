import { Row } from 'react-bootstrap';
import classNames from 'classnames';

/**
 * Grid wrapper for info fields using Bootstrap Row
 * @param {{
 *   children: import('react').ReactNode,
 *   gap?: string,
 *   className?: string
 * }} props
 */
const InfoGrid = ({ children, gap = 'g-3 g-lg-4', className }) => {
  return <Row className={classNames(gap, className)}>{children}</Row>;
};

export default InfoGrid;
