export const currency = '$';
export const currentYear = new Date().getFullYear();
export const developedByLink = 'https://gustavomaz11.github.io/portifolio/';
export const developedBy = 'Gustavo Machado Trindade';
export const contactUs = 'gustavotrindade.dev@gmail.com';
export const DEFAULT_PAGE_TITLE = 'Desenvolvido por Residência de Software IV - Squad 10';

// URL do backend Nest (ex.: http://localhost:3000). Defina em `.env`: VITE_API_BASE_URL=
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

/** @deprecated use API_BASE_URL */
export const API_BASE_PATH = '';
export const colorVariants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'purple', 'pink', 'orange', 'light', 'link'];