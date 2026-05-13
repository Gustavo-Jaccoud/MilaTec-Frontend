import { useEffect } from 'react';

const PageBreadcrumb = ({ title }) => {
  useEffect(() => {
    document.title = `${title} | MilaTec - Desenvolvido por Residência de Software IV - Squad 10`;
  }, [title]);

  return null;
};

export default PageBreadcrumb;
