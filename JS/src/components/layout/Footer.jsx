import { currentYear } from '@/context/constants';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
const Footer = () => {
  return <footer className="footer">
      <div className="page-container">
        <Row>
          <Col md={6} className="text-center text-md-start">
           {currentYear} © Desenvolvido por Residência de Software IV - Squad 10
          </Col>
          
        </Row>
      </div>
    </footer>;
};
export default Footer;