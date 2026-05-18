import { lazy } from 'react';

import { Navigate } from 'react-router-dom';



// auth

const Login = lazy(() => import('@/app/(other)/auth/login/page'));

const Register = lazy(() => import('@/app/(other)/auth/register/page'));

const Logout = lazy(() => import('@/app/(other)/auth/logout/page'));

const RecoverPassword = lazy(() => import('@/app/(other)/auth/recover-password/page'));

const CreatePassword = lazy(() => import('@/app/(other)/auth/create-password/page'));

const LockScreen = lazy(() => import('@/app/(other)/auth/lock-screen/page'));

const ConfirmMail = lazy(() => import('@/app/(other)/auth/confirm-mail/page'));

const LoginPin = lazy(() => import('@/app/(other)/auth/login-pin/page'));

// const TwoFactor = lazy(() => import('@/app/(other)/auth/two-factor/page'))

// const AccountDeactivation = lazy(() => import('@/app/(other)/auth/account-deactivation/page'))



// dashboard

const DashboardSales = lazy(() => import('@/app/(admin)/dashboard/page'));



//apps

const Chat = lazy(() => import('@/app/(admin)/apps/chat/page'));

const Calendar = lazy(() => import('@/app/(admin)/apps/calendar/page'));

const ProgramacaoEntregas = lazy(() => import('@/app/(admin)/entregas/page'));

const DeliveryDetails = lazy(() => import('@/app/(admin)/entregas/delivery-details/page'));

const Email = lazy(() => import('@/app/(admin)/apps/email/page'));

const FileManager = lazy(() => import('@/app/(admin)/apps/file-manager/page'));



// pages

const StarterPage = lazy(() => import('@/app/(admin)/pages/starter-page/page'));

const FaqPages = lazy(() => import('@/app/(admin)/pages/faq/page'));

const MaintenancePages = lazy(() => import('@/app/(other)/maintenance/page'));

const TimelinePages = lazy(() => import('@/app/(admin)/pages/timeline/page'));

const Projects = lazy(() => import('@/app/(admin)/apps/Projects/page'));

const Kanban = lazy(() => import('@/app/(admin)/tasks/kanban/page'));

const Obras = lazy(() => import('@/app/(admin)/apps/Obras/page'));

const ObraDetails = lazy(() => import('@/app/(admin)/apps/Obras/obra-details/page'));

const ProjectDetails = lazy(() => import('@/app/(admin)/apps/Projects/projeto-details/page'));

const ViewDetails = lazy(() => import('@/app/(admin)/tasks/view-details/page'));

const Pricing = lazy(() => import('@/app/(admin)/pages/pricing/page'));

const ComingSoonPage = lazy(() => import('@/app/(other)/coming-soon/page'));

const Contacts = lazy(() => import('@/app/(admin)/users/contacts/page'));

const Profile = lazy(() => import('@/app/(admin)/users/profile/page'));

const Wallet = lazy(() => import('@/app/(admin)/wallet/page'));

// const TermsConditions = lazy(() => import('@/app/(admin)/pages/terms-conditions/page'))

const Error404Alt = lazy(() => import('@/app/(admin)/pages/error-404-alt/page'));



// UI Básico

const Accordions = lazy(() => import('@/app/(admin)/ui/accordions/page'));

const Alerts = lazy(() => import('@/app/(admin)/ui/alerts/page'));

const Avatars = lazy(() => import('@/app/(admin)/ui/avatars/page'));

const Badges = lazy(() => import('@/app/(admin)/ui/badges/page'));

const Breadcrumb = lazy(() => import('@/app/(admin)/ui/breadcrumb/page'));

const Buttons = lazy(() => import('@/app/(admin)/ui/buttons/page'));

const Cards = lazy(() => import('@/app/(admin)/ui/cards/page'));

const Carousel = lazy(() => import('@/app/(admin)/ui/carousel/page'));

const Collapse = lazy(() => import('@/app/(admin)/ui/collapse/page'));

const Dropdowns = lazy(() => import('@/app/(admin)/ui/dropdowns/page'));

const Ratio = lazy(() => import('@/app/(admin)/ui/ratio/page'));

const Grid = lazy(() => import('@/app/(admin)/ui/grid/page'));

const Links = lazy(() => import('@/app/(admin)/ui/links/page'));

const ListGroup = lazy(() => import('@/app/(admin)/ui/list-group/page'));

const Modals = lazy(() => import('@/app/(admin)/ui/modals/page'));

const Notifications = lazy(() => import('@/app/(admin)/ui/notifications/page'));

const Offcanvas = lazy(() => import('@/app/(admin)/ui/offcanvas/page'));

const Placeholders = lazy(() => import('@/app/(admin)/ui/placeholders/page'));

const Pagination = lazy(() => import('@/app/(admin)/ui/pagination/page'));

const Popovers = lazy(() => import('@/app/(admin)/ui/popovers/page'));

const Progress = lazy(() => import('@/app/(admin)/ui/progress/page'));

const Spinners = lazy(() => import('@/app/(admin)/ui/spinners/page'));

const Tabs = lazy(() => import('@/app/(admin)/ui/tabs/page'));

const Tooltips = lazy(() => import('@/app/(admin)/ui/tooltips/page'));

const Typography = lazy(() => import('@/app/(admin)/ui/typography/page'));

const Utilities = lazy(() => import('@/app/(admin)/ui/utilities/page'));



// UI Avançado

const Dragula = lazy(() => import('@/app/(admin)/extended/dragula/page'));

const SweetAlert = lazy(() => import('@/app/(admin)/extended/sweet-alert/page'));

const Ratings = lazy(() => import('@/app/(admin)/extended/ratings/page'));

const Scrollbar = lazy(() => import('@/app/(admin)/extended/scrollbar/page'));



// Icones

const Remix = lazy(() => import('@/app/(admin)/icons/remix/page'));

const Tabler = lazy(() => import('@/app/(admin)/icons/tabler/page'));

const Solar = lazy(() => import('@/app/(admin)/icons/solar/page'));

// Gráficos

const AreaCharts = lazy(() => import('@/app/(admin)/charts/area/page'));

const BarCharts = lazy(() => import('@/app/(admin)/charts/bar/page'));

const BubbleCharts = lazy(() => import('@/app/(admin)/charts/bubble/page'));

const CandlestickCharts = lazy(() => import('@/app/(admin)/charts/candlestick/page'));

const ColumnCharts = lazy(() => import('@/app/(admin)/charts/column/page'));

const HeatmapCharts = lazy(() => import('@/app/(admin)/charts/heatmap/page'));

const LineCharts = lazy(() => import('@/app/(admin)/charts/line/page'));

const MixedCharts = lazy(() => import('@/app/(admin)/charts/mixed/page'));

const TimelineCharts = lazy(() => import('@/app/(admin)/charts/timeline/page'));

const BoxplotCharts = lazy(() => import('@/app/(admin)/charts/boxplot/page'));

const TreemapCharts = lazy(() => import('@/app/(admin)/charts/treemap/page'));

const PieCharts = lazy(() => import('@/app/(admin)/charts/pie/page'));

const RadarCharts = lazy(() => import('@/app/(admin)/charts/radar/page'));

const RadialBarCharts = lazy(() => import('@/app/(admin)/charts/radialBar/page'));

const ScatterCharts = lazy(() => import('@/app/(admin)/charts/scatter/page'));

const PolarCharts = lazy(() => import('@/app/(admin)/charts/polar/page'));

const SparklinesCharts = lazy(() => import('@/app/(admin)/charts/sparklines/page'));

const Slop = lazy(() => import('@/app/(admin)/charts/slope/page'));

const Funnel = lazy(() => import('@/app/(admin)/charts/funnel/page'));



// Tabelas

const BasicTables = lazy(() => import('@/app/(admin)/tables/basic-table/page'));

const GridJsTables = lazy(() => import('@/app/(admin)/tables/gridJs/page'));

const DataTables = lazy(() => import('@/app/(admin)/tables/datatable-tables/page'));



// Mapas

const GoogleMaps = lazy(() => import('@/app/(admin)/maps/google/page'));

const VectorMaps = lazy(() => import('@/app/(admin)/maps/vector/page'));

const LeafletMaps = lazy(() => import('@/app/(admin)/maps/leaflet/page'));



//Faturas



const Invoices = lazy(() => import('@/app/(admin)/invoices/page'));

const ViewInvoices = lazy(() => import('@/app/(admin)/invoices/view-invoice/page'));

const CreateInvoices = lazy(() => import('@/app/(admin)/invoices/create-invoice/page'));



// Formulários

const BasicElements = lazy(() => import('@/app/(admin)/forms/basic/page'));

const Inputmask = lazy(() => import('@/app/(admin)/forms/inputmask/page'));

const Picker = lazy(() => import('@/app/(admin)/forms/picker/page'));

const Select = lazy(() => import('@/app/(admin)/forms/select/page'));

const Slider = lazy(() => import('@/app/(admin)/forms/slider/page'));

const Validation = lazy(() => import('@/app/(admin)/forms/validation/page'));

const Wizard = lazy(() => import('@/app/(admin)/forms/wizard/page'));

const FileUploads = lazy(() => import('@/app/(admin)/forms/file-uploads/page'));

const Editors = lazy(() => import('@/app/(admin)/forms/editors/page'));

const LayoutsForms = lazy(() => import('@/app/(admin)/forms/layout/page'));



//email templates

// const BasicEmail = lazy(() => import('@/app/(other)/email-templates/basic-email/page'))

// const PurchaseInvoice = lazy(() => import('@/app/(other)/email-templates/purchase-invoice/page'))

// const AccountActivation = lazy(() => import('@/app/(other)/email-templates/account-activation/page'))



// Erro

const Error401 = lazy(() => import('@/app/(other)/errors/error-401/page'));

const Error400 = lazy(() => import('@/app/(other)/errors/error-400/page'));

const Error403 = lazy(() => import('@/app/(other)/errors/error-403/page'));

const Error404 = lazy(() => import('@/app/(other)/errors/error-404/page'));

// const Error408 = lazy(() => import('@/app/(other)/errors/error-408/page'))

const Error500 = lazy(() => import('@/app/(other)/errors/error-500/page'));

// const Error501 = lazy(() => import('@/app/(other)/errors/error-501/page'))

// const Error502 = lazy(() => import('@/app/(other)/errors/error-502/page'))

const ServiceUnavailable = lazy(() => import('@/app/(other)/errors/service-unavailable/page'));

const Maintenance = lazy(() => import('@/app/(other)/maintenance/page'));



//pricing

// const PricingOne = lazy(() => import('@/app/(admin)/pricing/pricing-one/page'))

// const PricingTwo = lazy(() => import('@/app/(admin)/pricing/pricing-two/page'))



//Layout



const FullView = lazy(() => import('@/app/(other)/layouts/full-view/page'));

const FullScreenView = lazy(() => import('@/app/(other)/layouts/fullscreen-view/page'));

const HoverMenu = lazy(() => import('@/app/(other)/layouts/hover-menu/page'));

const Compact = lazy(() => import('@/app/(other)/layouts/compact/page'));

const IconView = lazy(() => import('@/app/(other)/layouts/icon-view/page'));

const Horizontal = lazy(() => import('@/app/(other)/layouts/horizontal/page'));

const DarkMode = lazy(() => import('@/app/(other)/layouts/dark-mode/page'));

const Detached = lazy(() => import('@/app/(other)/layouts/detached/page'));

const initialRoutes = [{

  path: '/',

  name: 'root',

  element: <Navigate to="/funil-projetos" />

}];



// dashboards

const generalRoutes = [{

  path: '/dashboard',

  name: 'Sales',

  element: <DashboardSales />

}];

const appsRoutes = [{

  path: '/apps/chat',

  name: 'Chat',

  element: <Chat />

}, {

  path: '/apps/calendar',

  name: 'Calendar',

  element: <Calendar />

}, {

  path: '/apps/email',

  name: 'Email',

  element: <Email />

}, {

  path: '/apps/file-manager',

  name: 'File Manager',

  element: <FileManager />

}, {

  path: '/apps/Projects',

  name: 'Projects',

  element: <Projects />

}, {

  path: '/tasks/kanban',

  name: 'Kanban',

  element: <Navigate to="/funil-projetos" />

}, {

  path: '/funil-projetos',

  name: 'Funil Projetos',

  element: <Kanban />

}, {

  path: '/funil-obras',

  name: 'Funil Obras',

  element: <Obras />

}, {

  path: '/obras/:id',

  name: 'Detalhe Obra',

  element: <ObraDetails />

}, {

  path: '/project/:id',

  name: 'Detalhe Projeto',

  element: <ProjectDetails />

}, {

  path: '/programacao-entregas',

  name: 'Programação de Entregas',

  element: <ProgramacaoEntregas />

}, {

  path: '/delivery/:id',

  name: 'Detalhe Entrega',

  element: <DeliveryDetails />

}, {

  path: '/tasks/view-details',

  name: 'view-details',

  element: <ViewDetails />

}, {

  path: '/pages/pricing',

  name: 'Pricing',

  element: <Pricing />

}];



// pages

const customPagesRoutes = [{

  path: '/pages/starter-page',

  name: 'Starter Page',

  element: <StarterPage />

}, {

  path: '/pages/faq',

  name: 'FAQ',

  element: <FaqPages />

}, {

  path: '/pages/timeline',

  name: 'Timeline',

  element: <TimelinePages />

}, {

  path: '/pages/error-404-alt',

  name: 'Error 404 Alt',

  element: <Error404Alt />

}, {

  path: '/users/contacts',

  name: 'Contacts',

  element: <Contacts />

}, {

  path: '/users/profile',

  name: 'Profile',

  element: <Profile />

}, {

  path: '/wallet',

  name: 'Wallet',

  element: <Wallet />

}];



// ui

const uiRoutes = [{

  path: '/ui/accordions',

  name: 'Accordions',

  element: <Accordions />

}, {

  path: '/ui/alerts',

  name: 'Alerts',

  element: <Alerts />

}, {

  path: '/ui/avatars',

  name: 'Avatars',

  element: <Avatars />

}, {

  path: '/ui/badges',

  name: 'Badges',

  element: <Badges />

}, {

  path: '/ui/breadcrumb',

  name: 'Breadcrumb',

  element: <Breadcrumb />

}, {

  path: '/ui/buttons',

  name: 'Buttons',

  element: <Buttons />

}, {

  path: '/ui/cards',

  name: 'Cards',

  element: <Cards />

}, {

  path: '/ui/carousel',

  name: 'Carousel',

  element: <Carousel />

}, {

  path: '/ui/collapse',

  name: 'Collapse',

  element: <Collapse />

}, {

  path: '/ui/dropdowns',

  name: 'Dropdowns',

  element: <Dropdowns />

}, {

  path: '/ui/ratio',

  name: 'Ratio',

  element: <Ratio />

}, {

  path: '/ui/grid',

  name: 'Grid',

  element: <Grid />

}, {

  path: '/ui/links',

  name: 'Links',

  element: <Links />

}, {

  path: '/ui/list-group',

  name: 'List Group',

  element: <ListGroup />

}, {

  path: '/ui/modals',

  name: 'Modals',

  element: <Modals />

}, {

  path: '/ui/notifications',

  name: 'Notifications',

  element: <Notifications />

}, {

  path: '/ui/offcanvas',

  name: 'Offcanvas',

  element: <Offcanvas />

}, {

  path: '/ui/placeholders',

  name: 'Placeholders',

  element: <Placeholders />

}, {

  path: '/ui/pagination',

  name: 'Pagination',

  element: <Pagination />

}, {

  path: '/ui/popovers',

  name: 'Popovers',

  element: <Popovers />

}, {

  path: '/ui/progress',

  name: 'Progress',

  element: <Progress />

}, {

  path: '/ui/spinners',

  name: 'Spinners',

  element: <Spinners />

}, {

  path: '/ui/tabs',

  name: 'Tabs',

  element: <Tabs />

}, {

  path: '/ui/tooltips',

  name: 'Tooltips',

  element: <Tooltips />

}, {

  path: '/ui/typography',

  name: 'Typography',

  element: <Typography />

}, {

  path: '/ui/utilities',

  name: 'Utilities',

  element: <Utilities />

}];

const iconsRoutes = [{

  path: '/icons/tabler',

  name: 'Tabler',

  element: <Tabler />

}, {

  path: '/icons/solar',

  name: 'Solar',

  element: <Solar />

}, {

  path: '/icons/remix',

  name: 'Remix',

  element: <Remix />

}];

const extendedRoutes = [{

  path: '/extended/dragula',

  name: 'Dragula',

  element: <Dragula />

}, {

  path: '/extended/sweet-alert',

  name: 'Sweet Alert',

  element: <SweetAlert />

}, {

  path: '/extended/ratings',

  name: 'Ratings',

  element: <Ratings />

}, {

  path: '/extended/scrollbar',

  name: 'Scrollbar',

  element: <Scrollbar />

}];

const chartsRoutes = [{

  path: '/charts/area',

  name: 'Area Charts',

  element: <AreaCharts />

}, {

  path: '/charts/bar',

  name: 'Bar',

  element: <BarCharts />

}, {

  path: '/charts/bubble',

  name: 'Bubble',

  element: <BubbleCharts />

}, {

  path: '/charts/candlestick',

  name: 'Candlestick',

  element: <CandlestickCharts />

}, {

  path: '/charts/column',

  name: 'Column',

  element: <ColumnCharts />

}, {

  path: '/charts/heatmap',

  name: 'Heatmap',

  element: <HeatmapCharts />

}, {

  path: '/charts/line',

  name: 'Line',

  element: <LineCharts />

}, {

  path: '/charts/mixed',

  name: 'Mixed',

  element: <MixedCharts />

}, {

  path: '/charts/timeline',

  name: 'Timeline',

  element: <TimelineCharts />

}, {

  path: '/charts/boxplot',

  name: 'Boxplot',

  element: <BoxplotCharts />

}, {

  path: '/charts/treemap',

  name: 'Treemap',

  element: <TreemapCharts />

}, {

  path: '/charts/pie',

  name: 'Pie',

  element: <PieCharts />

}, {

  path: '/charts/radar',

  name: 'Radar',

  element: <RadarCharts />

}, {

  path: '/charts/radialBar',

  name: 'RadialBar',

  element: <RadialBarCharts />

}, {

  path: '/charts/scatter',

  name: 'Scatter',

  element: <ScatterCharts />

}, {

  path: '/charts/polar',

  name: 'Polar Area',

  element: <PolarCharts />

}, {

  path: '/charts/sparklines',

  name: 'Sparklines',

  element: <SparklinesCharts />

}, {

  path: '/charts/slope',

  name: 'Slop',

  element: <Slop />

}, {

  path: '/charts/funnel',

  name: 'Funnel',

  element: <Funnel />

}];

const formsRoutes = [{

  path: '/forms/basic',

  name: 'Basic Elements',

  element: <BasicElements />

}, {

  path: '/forms/inputmask',

  name: 'Inputmask',

  element: <Inputmask />

}, {

  path: '/forms/picker',

  name: 'Picker',

  element: <Picker />

}, {

  path: '/forms/select',

  name: 'Select',

  element: <Select />

}, {

  path: '/forms/slider',

  name: 'Range Slider',

  element: <Slider />

}, {

  path: '/forms/validation',

  name: 'Validation',

  element: <Validation />

}, {

  path: '/forms/wizard',

  name: 'Wizard',

  element: <Wizard />

}, {

  path: '/forms/file-uploads',

  name: 'File Uploads',

  element: <FileUploads />

}, {

  path: '/forms/editors',

  name: 'Editors',

  element: <Editors />

}, {

  path: '/forms/layouts',

  name: 'Layouts',

  element: <LayoutsForms />

}];

const tablesRoutes = [{

  path: '/tables/basic-table',

  name: 'Basic Tables',

  element: <BasicTables />

}, {

  path: '/tables/gridJs',

  name: 'GridJs Tables',

  element: <GridJsTables />

}, {

  path: '/tables/gridJs',

  name: 'DataTables',

  element: <DataTables />

}];

const mapsRoutes = [{

  path: '/maps/google',

  name: 'Google Maps',

  element: <GoogleMaps />

}, {

  path: '/maps/vector',

  name: 'Vector Maps',

  element: <VectorMaps />

}, {

  path: '/maps/leaflet',

  name: 'Leaflet Maps',

  element: <LeafletMaps />

}];

const invoicesRoutes = [{

  path: '/invoices',

  name: 'Invoice',

  element: <Invoices />

}, {

  path: '/invoices/view-invoice',

  name: 'View Invoice',

  element: <ViewInvoices />

}, {

  path: '/invoices/create-invoice',

  name: 'Create Invoice',

  element: <CreateInvoices />

}];



// const pricingRoutes: RoutesProps[] = [

//   {

//     path: '/pricing/pricing-one',

//     name: 'Pricing One',

//     element: <PricingOne />,

//   },

//   {

//     path: '/pricing/pricing-two',

//     name: 'Pricing Two',

//     element: <PricingTwo />,

//   },

// ]



// auth

const authRoutes = [{

  path: '/auth/login',

  name: 'Login',

  element: <Login />,

  redirectIfAuthenticated: true

}, {

  path: '/auth/register',

  name: 'Register',

  element: <Register />

}, {

  path: '/auth/logout',

  name: 'Logout',

  element: <Logout />

}, {

  path: '/auth/recover-password',

  name: 'Recover Password',

  element: <RecoverPassword />

}, {

  path: '/auth/create-password',

  name: 'Create Password',

  element: <CreatePassword />

}, {

  path: '/auth/lock-screen',

  name: 'Lock Screen',

  element: <LockScreen />

}, {

  path: '/auth/confirm-mail',

  name: 'Confirm Mail',

  element: <ConfirmMail />

}, {

  path: '/auth/login-pin',

  name: 'Login with PIN',

  element: <LoginPin />,

  redirectIfAuthenticated: true

}];



// public routes

const otherPublicRoutes = [{

  path: '/errors/error-401',

  name: '401 Unauthorized',

  element: <Error401 />

}, {

  path: '/errors/error-400',

  name: '400 Bad Reques',

  element: <Error400 />

}, {

  path: '/maintenance',

  name: 'Maintenance',

  element: <Maintenance />

}, {

  path: '/coming-soon',

  name: 'Coming Soon',

  element: <ComingSoonPage />

}, {

  path: '/errors/error-403',

  name: '403 Forbidden',

  element: <Error403 />

}, {

  path: '/errors/error-404',

  name: '404 Not Found',

  element: <Error404 />

},

// {

//   path: '/errors/error-408',

//   name: '408 Request Timeout',

//   element: <Error408 />,

// },

{

  path: '/errors/error-500',

  name: '500 Internal Server',

  element: <Error500 />

},

// {

//   path: '/errors/error-501',

//   name: '501 Not Implemented',

//   element: <Error501 />,

// },

// {

//   path: '/errors/error-502',

//   name: '502 Service Overloaded',

//   element: <Error502 />,

// },

{

  path: '/errors/service-unavailable',

  name: 'Service Unavailable',

  element: <ServiceUnavailable />

}, {

  path: '/maintenance',

  name: 'Maintenance',

  element: <MaintenancePages />

}

// {

//   path: '/email-templates/basic-email',

//   name: 'Basic Email',

//   element: <BasicEmail />,

// },

// {

//   path: '/email-templates/purchase-invoice',

//   name: 'Purchase Invoice',

//   element: <PurchaseInvoice />,

// },

// {

//   path: '/email-templates/account-activation',

//   name: 'Account Activation',

//   element: <AccountActivation />,

// },

];

const layoutsRoutes = [{

  name: 'Horizontal',

  path: '/horizontal',

  element: <Horizontal />

}, {

  name: 'Full view',

  path: '/full-view',

  element: <FullView />

}, {

  name: 'Fullscreen View',

  path: '/fullscreen-view',

  element: <FullScreenView />

}, {

  name: 'Hover Menu',

  path: '/hover-menu',

  element: <HoverMenu />

}, {

  name: 'Compact',

  path: '/compact',

  element: <Compact />

}, {

  name: 'Icon View',

  path: '/icon-view',

  element: <IconView />

}, {

  name: 'Dark Mode',

  path: '/dark-mode',

  element: <DarkMode />

}, {

  name: 'detached',

  path: '/detached',

  element: <Detached />

}];

export const appRoutes = [...initialRoutes, ...generalRoutes, ...uiRoutes,

// ...hospitalRoutes,

...customPagesRoutes, ...appsRoutes, ...iconsRoutes, ...extendedRoutes, ...chartsRoutes, ...invoicesRoutes, ...formsRoutes,

// ...eCommerceRoutes,

...tablesRoutes,

// ...pricingRoutes,

...mapsRoutes];

export const publicRoutes = [...authRoutes, ...otherPublicRoutes, ...layoutsRoutes];