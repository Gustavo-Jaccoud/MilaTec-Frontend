import React from 'react';
import { logoMenorOriginal, logoOriginal } from '@/assets/brandAssets';
import { Link } from 'react-router-dom';
const LogoBox = () => {
  return <Link to="/" className="logo">
      <span className="logo-light">
        <span className="logo-lg"><img src={logoOriginal} alt="logo" /></span>
        <span className="logo-sm"><img src={logoMenorOriginal} alt="small logo" /></span>
      </span>
      <span className="logo-dark">
        <span className="logo-lg"><img src={logoOriginal} alt="dark logo" /></span>
        <span className="logo-sm"><img src={logoMenorOriginal} alt="small logo" /></span>
      </span>
    </Link>;
};
export default LogoBox;
