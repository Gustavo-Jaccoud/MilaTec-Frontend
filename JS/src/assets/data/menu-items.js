export const FUNNEL_MENU_ITEMS = [{
  key: 'funil-obras',
  label: 'Funil de Obras',
  icon: 'tabler:building-factory-2',
  url: '/funil-obras'
}, {
  key: 'funil-projetos',
  label: 'Funil de Projetos',
  icon: 'tabler:building-warehouse',
  url: '/funil-projetos'
}, {
  key: 'programacao-entregas',
  label: 'Programação de Entregas',
  icon: 'tabler:truck-delivery',
  url: '/programacao-entregas'
}];

export const MENU_ITEMS = [{
  key: 'dashboard',
  label: 'Gráficos',
  icon: 'tabler:dashboard',
  badge: {
    text: "9",
    variant: "danger",
    icon: ''
  },
  url: '/dashboard'
}, {
  key: 'chat',
  label: 'Bate Papo',
  icon: 'tabler:message',
  url: '/apps/chat'
}, {
  key: 'calendar',
  label: 'Calendario',
  icon: 'tabler:calendar',
  url: '/apps/calendar'
}, {
  key: 'users',
  label: 'Usuários',
  icon: 'tabler:user-square-rounded',
  children: [{
    key: 'contacts',
    label: 'Contatos',
    url: '/users/contacts',
    parentKey: 'users'
  }, {
    key: 'profile',
    label: 'Perfil',
    url: '/users/profile',
    parentKey: 'users'
  }]
}, {
  key: 'email',
  label: 'Email',
  icon: 'tabler:mailbox',
  url: '/apps/email'
}, {
  key: 'file-manager',
  label: 'Gerenciador de Arquivos',
  icon: 'tabler:folders',
  url: '/apps/file-manager'
}, {
  key: 'projects',
  label: 'Projetos',
  icon: 'tabler:briefcase',
  url: '/apps/Projects'
}, {
  key: 'tasks',
  label: 'Tarefas',
  icon: 'tabler:layout-kanban',
  children: [{
    key: 'kanban',
    label: 'Kanban',
    url: '/tasks/kanban',
    parentKey: 'tasks'
  }, {
    key: 'view-details',
    label: 'Detalhamento',
    url: '/tasks/view-details',
    parentKey: 'tasks'
  }]
}, {
  key: 'invoice',
  label: 'Fatura',
  icon: 'tabler:invoice',
  children: [{
    key: 'invoices',
    label: 'Faturas',
    url: '/invoices',
    parentKey: 'invoice'
  }, {
    key: 'view-invoice',
    label: 'Detalhe da Fatura',
    url: '/invoices/view-invoice',
    parentKey: 'invoice'
  }, {
    key: 'create-invoice',
    label: 'Criar Fatura',
    url: '/invoices/create-invoice',
    parentKey: 'invoice'
  }]
}, {
  key: 'custom',
  label: 'Customização',
  isTitle: true
}, {
  key: 'pages',
  label: 'Páginas',
  icon: 'tabler:package',
  children: [{
    key: 'starter-page',
    label: 'Nova Página',
    url: '/pages/starter-page',
    parentKey: 'pages'
  }, {
    key: 'pricing',
    label: 'Preço',
    url: '/pages/pricing',
    parentKey: 'pages'
  }, {
    key: 'faq',
    label: 'Perguntas Frequentes',
    url: '/pages/faq',
    parentKey: 'pages'
  }, {
    key: 'maintenance',
    label: 'Manuntenção',
    url: '/maintenance',
    parentKey: 'pages'
  }, {
    key: 'timeline',
    label: 'Linha do Tempo',
    url: '/pages/timeline',
    parentKey: 'pages'
  }, {
    key: 'coming-soon',
    label: 'Volto em Breve',
    url: '/coming-soon',
    parentKey: 'pages'
  }]
}, {
  key: 'auth',
  label: 'Autenticação',
  icon: 'tabler:user-shield',
  children: [{
    key: 'login',
    label: 'Login',
    url: '/auth/login',
    parentKey: 'auth'
  }, {
    key: 'register',
    label: 'Registro',
    url: '/auth/register',
    parentKey: 'auth'
  }, {
    key: 'logout',
    label: 'Sair',
    url: '/auth/logout',
    parentKey: 'auth'
  }, {
    key: 'recover-password',
    label: 'Recuperar Senha',
    url: '/auth/recover-password',
    parentKey: 'auth'
  }, {
    key: 'create-password',
    label: 'Criar Senha',
    url: '/auth/create-password',
    parentKey: 'auth'
  }, {
    key: 'lock-screen',
    label: 'Tela Bloqueada',
    url: '/auth/lock-screen',
    parentKey: 'auth'
  }, {
    key: 'confirm-mail',
    label: 'Confirmar Email',
    url: '/auth/confirm-mail',
    parentKey: 'auth'
  }, {
    key: 'login-pin',
    label: 'Login com PIN',
    url: '/auth/login-pin',
    parentKey: 'auth'
  }]
}, {
  key: 'errors',
  label: 'Página de Erro',
  icon: 'tabler:exclamation-circle',
  children: [{
    key: 'error-401',
    label: 'Erro 401',
    url: '/errors/error-401',
    parentKey: 'errors'
  }, {
    key: 'error-400',
    label: 'Erro 400',
    url: '/errors/error-400',
    parentKey: 'errors'
  }, {
    key: 'error-403',
    label: 'Erro 403',
    url: '/errors/error-403',
    parentKey: 'errors'
  }, {
    key: 'error-404',
    label: 'Erro 404',
    url: '/errors/error-404',
    parentKey: 'errors'
  }, {
    key: 'error-500',
    label: 'Erro 500',
    url: '/errors/error-500',
    parentKey: 'errors'
  }, {
    key: 'service-unavailable',
    label: 'Serviço Indisponivel',
    url: '/errors/service-unavailable',
    parentKey: 'errors'
  }, {
    key: 'error-404-alt',
    label: 'Erro 404 Alternativo',
    url: '/pages/error-404-alt',
    parentKey: 'errors'
  }]
}, {
  key: 'widgets',
  label: 'Widgets',
  url: '/wallet',
  icon: 'tabler:layout-dashboard'
}, {
  key: 'components',
  label: 'Componentes',
  isTitle: true
}, {
  key: 'base-ui',
  label: 'UI Básico',
  icon: 'tabler:aperture',
  children: [{
    key: 'base-ui-accordions',
    label: 'Acordeão',
    url: '/ui/accordions',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-alerts',
    label: 'Alertas',
    url: '/ui/alerts',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-avatars',
    label: 'Avatares',
    url: '/ui/avatars',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-badges',
    label: 'Emblemas',
    url: '/ui/badges',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-breadcrumb',
    label: 'Breadcrumb',
    url: '/ui/breadcrumb',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-buttons',
    label: 'Botões',
    url: '/ui/buttons',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-cards',
    label: 'Cards',
    url: '/ui/cards',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-carousel',
    label: 'Carrossel',
    url: '/ui/carousel',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-collapse',
    label: 'Collapse',
    url: '/ui/collapse',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-dropdowns',
    label: 'Dropdowns',
    url: '/ui/dropdowns',
    parentKey: 'base-ui'
  }, {
    key: 'ul-ratio',
    label: 'Ratio',
    url: '/ui/ratio',
    parentKey: 'base-ui'
  }, {
    key: 'ul-grid',
    label: 'Grid',
    url: '/ui/grid',
    parentKey: 'base-ui'
  }, {
    key: 'ul-links',
    label: 'Links',
    url: '/ui/links',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-list-group',
    label: 'Lista Agrupadas',
    url: '/ui/list-group',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-modals',
    label: 'Modais',
    url: '/ui/modals',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-notifications',
    label: 'Notificações',
    url: '/ui/notifications',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-offcanvas',
    label: 'Gavetas',
    url: '/ui/offcanvas',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-placeholders',
    label: 'Placeholders',
    url: '/ui/placeholders',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-pagination',
    label: 'Paginação',
    url: '/ui/pagination',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-popovers',
    label: 'Popovers',
    url: '/ui/popovers',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-progress',
    label: 'Progresso',
    url: '/ui/progress',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-spinners',
    label: 'Loading',
    url: '/ui/spinners',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-tabs',
    label: 'Abas',
    url: '/ui/tabs',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-tooltips',
    label: 'Tooltips',
    url: '/ui/tooltips',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-typography',
    label: 'Tipografia',
    url: '/ui/typography',
    parentKey: 'base-ui'
  }, {
    key: 'base-ui-utilities',
    label: 'Utilidades',
    url: '/ui/utilities',
    parentKey: 'base-ui'
  }]
}, {
  key: 'extended-ui',
  label: 'UI Avançado',
  icon: 'tabler:macro',
  children: [{
    key: 'dragula',
    label: 'Drag',
    url: '/extended/dragula',
    parentKey: 'extended-ui'
  }, {
    key: 'sweet-alert',
    label: 'Alertas em Modal',
    url: '/extended/sweet-alert',
    parentKey: 'extended-ui'
  }, {
    key: 'ratings',
    label: 'Estrelas',
    url: '/extended/ratings',
    parentKey: 'extended-ui'
  }, {
    key: 'scrollbar',
    label: 'Scroll',
    url: '/extended/scrollbar',
    parentKey: 'extended-ui'
  }]
}, {
  key: 'icons',
  label: 'Icones',
  icon: 'tabler:icons',
  children: [{
    key: 'remix',
    label: 'Remix',
    url: '/icons/remix',
    parentKey: 'icons'
  }, {
    key: 'tabler',
    label: 'Tabler',
    url: '/icons/tabler',
    parentKey: 'icons'
  }, {
    key: 'solar',
    label: 'Solar',
    url: '/icons/solar',
    parentKey: 'icons'
  }]
}, {
  key: 'charts',
  label: 'Gráficos',
  icon: 'tabler:chart-infographic',
  children: [{
    key: 'area',
    label: 'Area',
    url: '/charts/area',
    parentKey: 'charts'
  }, {
    key: 'bar',
    label: 'Barra',
    url: '/charts/bar',
    parentKey: 'charts'
  }, {
    key: 'bubble',
    label: 'Bolha',
    url: '/charts/bubble',
    parentKey: 'charts'
  }, {
    key: 'candlestick',
    label: 'Vela',
    url: '/charts/candlestick',
    parentKey: 'charts'
  }, {
    key: 'column',
    label: 'Coluna',
    url: '/charts/column',
    parentKey: 'charts'
  }, {
    key: 'heatmap',
    label: 'Heatmap',
    url: '/charts/heatmap',
    parentKey: 'charts'
  }, {
    key: 'line',
    label: 'Linha',
    url: '/charts/line',
    parentKey: 'charts'
  }, {
    key: 'mixed',
    label: 'Mix',
    url: '/charts/mixed',
    parentKey: 'charts'
  }, {
    key: 'timeline-chart',
    label: 'Linha do Tempo',
    url: '/charts/timeline',
    parentKey: 'charts'
  }, {
    key: 'boxplot',
    label: 'Boxplot',
    url: '/charts/boxplot',
    parentKey: 'charts'
  }, {
    key: 'treemap',
    label: 'Treemap',
    url: '/charts/treemap',
    parentKey: 'charts'
  }, {
    key: 'pie',
    label: 'Pizza',
    url: '/charts/pie',
    parentKey: 'charts'
  }, {
    key: 'radar',
    label: 'Radar',
    url: '/charts/radar',
    parentKey: 'charts'
  }, {
    key: 'radialBar',
    label: 'Raio',
    url: '/charts/radialBar',
    parentKey: 'charts'
  }, {
    key: 'scatter',
    label: 'Scatter',
    url: '/charts/scatter',
    parentKey: 'charts'
  }, {
    key: 'polar',
    label: 'Polar',
    url: '/charts/polar',
    parentKey: 'charts'
  }, {
    key: 'sparklines',
    label: 'Sparklines',
    url: '/charts/sparklines',
    parentKey: 'charts'
  }, {
    key: 'slope',
    label: 'Slope',
    url: '/charts/slope',
    parentKey: 'charts'
  }, {
    key: 'funnel',
    label: 'Funil',
    url: '/charts/funnel',
    parentKey: 'charts'
  }]
}, {
  key: 'forms',
  label: 'Formulários',
  icon: 'tabler:list-details',
  children: [{
    key: 'basic',
    label: 'Elementos Básicos',
    url: '/forms/basic',
    parentKey: 'forms'
  }, {
    key: 'inputmask',
    label: 'Máscara de Input',
    url: '/forms/inputmask',
    parentKey: 'forms'
  }, {
    key: 'picker',
    label: 'Picker',
    url: '/forms/picker',
    parentKey: 'forms'
  }, {
    key: 'select',
    label: 'Select',
    url: '/forms/select',
    parentKey: 'forms'
  }, {
    key: 'slider',
    label: 'Range',
    url: '/forms/slider',
    parentKey: 'forms'
  }, {
    key: 'validation',
    label: 'Validação',
    url: '/forms/validation',
    parentKey: 'forms'
  }, {
    key: 'wizard',
    label: 'Multi Step',
    url: '/forms/wizard',
    parentKey: 'forms'
  }, {
    key: 'file-uploads',
    label: 'Upload',
    url: '/forms/file-uploads',
    parentKey: 'forms'
  }, {
    key: 'editors',
    label: 'Editor de Texto',
    url: '/forms/editors',
    parentKey: 'forms'
  }]
}, {
  key: 'tables',
  label: 'Tabelas',
  icon: 'tabler:table-row',
  children: [{
    key: 'basic-table',
    label: 'Tabelas Básicas',
    url: '/tables/basic-table',
    parentKey: 'tables'
  }, {
    key: 'gridJs',
    label: 'Tabela em Grid',
    url: '/tables/gridJs',
    parentKey: 'tables'
  }]
}, {
  key: 'maps',
  label: 'Mapas',
  icon: 'tabler:map-2',
  children: [{
    key: 'google',
    label: 'Google Maps',
    url: '/maps/google',
    parentKey: 'maps'
  }, {
    key: 'vector',
    label: 'Vetor',
    url: '/maps/vector',
    parentKey: 'maps'
  }, {
    key: 'leaflet',
    label: 'Mapa Interativo',
    url: '/maps/leaflet',
    parentKey: 'maps'
  }]
}, {
  key: 'more',
  label: 'More',
  isTitle: true
}, {
  key: 'layouts',
  label: 'Layouts',
  icon: 'solar:window-frame-outline',
  children: [{
    key: 'horizontal',
    label: 'Horizontal',
    url: '/horizontal',
    parentKey: 'layouts',
    target: '_blank'
  }, {
    key: 'detached',
    label: 'Detached',
    target: '_blank',
    url: '/detached',
    parentKey: 'layouts'
  }, {
    key: 'full-view',
    label: 'Tela Cheia',
    url: '/full-view',
    parentKey: 'layouts',
    target: '_blank'
  }, {
    key: 'hover-menu',
    label: 'Menu com Hover',
    url: '/hover-menu',
    parentKey: 'layouts',
    target: '_blank'
  }, {
    key: 'compact',
    label: 'Compacto',
    url: '/compact',
    parentKey: 'layouts',
    target: '_blank'
  }, {
    key: 'icon-view',
    label: 'Visualização de Ícones',
    url: '/icon-view',
    parentKey: 'layouts',
    target: '_blank'
  }, {
    key: 'dark-mode',
    label: 'Modo Escuro',
    url: '/dark-mode',
    parentKey: 'layouts',
    target: '_blank'
  }]
},
// {
//   key: 'multi-level',
//   label: 'Multi Level',
//   icon: 'tabler:share',
//   children: [
//     {
//       key: 'second-level',
//       label: 'Second Level',
//       parentKey: 'multi-level',
//       children: [
//         {
//           key: 'item11',
//           label: 'Item 1',
//           parentKey: 'second-level',
//         },
//         {
//           key: 'item22',
//           label: 'Item 2',
//           parentKey: 'second-level',
//         },
//       ]
//     },
//     {
//       key: 'third-level',
//       label: 'Third Level',
//       parentKey: 'multi-level',
//       children: [
//         {
//           key: 'item1',
//           label: 'Item 1',
//           parentKey: 'third-level',
//         },
//         {
//           key: 'item2',
//           label: 'Item 2',
//           parentKey: 'third-level',
//           children: [
//             {
//               key: 'item2.1',
//               label: 'Item 2.1',
//               parentKey: 'item2',
//             },
//             {
//               key: 'item2.2',
//               label: 'Item 2.2',
//               parentKey: 'item2',
//             },
//           ]
//         },
//       ]
//     },
//   ]
// },
{
  key: 'multi-level',
  label: 'Multi Level',
  icon: 'tabler:share',
  children: [{
    key: 'second-level',
    label: 'Second Level',
    parentKey: 'multi-level',
    children: [{
      key: 'item11',
      label: 'Item 1',
      parentKey: 'second-level'
    }, {
      key: 'item22',
      label: 'Item 2',
      parentKey: 'second-level'
    }]
  }, {
    key: 'third-level',
    label: 'Third Level',
    parentKey: 'multi-level',
    children: [{
      key: 'item1',
      label: 'Item 1',
      parentKey: 'third-level'
    }, {
      key: 'item2',
      label: 'Item 2',
      parentKey: 'third-level',
      children: [{
        key: 'item2.1',
        label: 'Item 2.1',
        parentKey: 'item2'
      }, {
        key: 'item2.2',
        label: 'Item 2.2',
        parentKey: 'item2'
      }]
    }]
  }]
}];
export const HORIZONTAL_MENU_ITEM = [{
  key: 'dashboard',
  label: 'Gráficos',
  icon: 'tabler:dashboard',
  url: '/dashboard'
}, {
  key: 'apps',
  label: 'Aplicativos',
  icon: 'tabler:apps',
  children: [{
    key: 'chat',
    label: 'Bate Papo',
    url: '/apps/chat',
    parentKey: 'apps'
  }, {
    key: 'calendar',
    label: 'Calendário',
    url: '/apps/calendar',
    parentKey: 'apps'
  }, {
    key: 'email',
    label: 'Email',
    url: '/apps/email',
    parentKey: 'apps'
  }, {
    key: 'file-manager',
    label: 'Gerenciador de Arquivos',
    url: '/apps/file-manager',
    parentKey: 'apps'
  }, {
    key: 'invoice',
    label: 'Fatura',
    parentKey: 'apps',
    children: [{
      key: 'invoices',
      label: 'Fatura',
      url: '/invoices',
      parentKey: 'invoice'
    }, {
      key: 'view-invoice',
      label: 'Detalhe Fatura',
      url: '/invoices/view-invoice',
      parentKey: 'invoice'
    }, {
      key: 'create-invoice',
      label: 'Criar Fatura',
      url: '/invoices/create-invoice',
      parentKey: 'invoice'
    }]
  }]
}, {
  key: 'pages',
  label: 'Páginas',
  icon: 'tabler:file-description',
  children: [{
    key: 'auth',
    label: 'Autenticação',
    parentKey: 'pages',
    children: [{
      key: 'login',
      label: 'Login',
      url: '/auth/login',
      parentKey: 'auth'
    }, {
      key: 'register',
      label: 'Registro',
      url: '/auth/register',
      parentKey: 'auth'
    }, {
      key: 'logout',
      label: 'Sair',
      url: '/auth/logout',
      parentKey: 'auth'
    }, {
      key: 'recover-password',
      label: 'Recuperar Senha',
      url: '/auth/recover-password',
      parentKey: 'auth'
    }, {
      key: 'create-password',
      label: 'Criar Senha',
      url: '/auth/create-password',
      parentKey: 'auth'
    }, {
      key: 'lock-screen',
      label: 'Tela de Bloqueio',
      url: '/auth/lock-screen',
      parentKey: 'auth'
    }, {
      key: 'confirm-mail',
      label: 'Confirmação de Email',
      url: '/auth/confirm-mail',
      parentKey: 'auth'
    }, {
      key: 'login-pin',
      label: 'Login com PIN',
      url: '/auth/login-pin',
      parentKey: 'auth'
    }]
  }, {
    key: 'errors',
    label: 'Páginas de Erro',
    parentKey: 'pages',
    children: [{
      key: 'error-401',
      label: 'Erro 401',
      url: '/errors/error-401',
      parentKey: 'errors'
    }, {
      key: 'error-400',
      label: 'Erro 400',
      url: '/errors/error-400',
      parentKey: 'errors'
    }, {
      key: 'error-403',
      label: 'Erro 403',
      url: '/errors/error-403',
      parentKey: 'errors'
    }, {
      key: 'error-404',
      label: 'Erro 404',
      url: '/errors/error-404',
      parentKey: 'errors'
    }, {
      key: 'error-408',
      label: 'Erro 408',
      url: '/errors/error-408',
      parentKey: 'errors'
    }, {
      key: 'error-500',
      label: 'Erro 500',
      url: '/errors/error-500',
      parentKey: 'errors'
    }, {
      key: 'error-501',
      label: 'Erro 501',
      url: '/errors/error-501',
      parentKey: 'errors'
    }, {
      key: 'error-502',
      label: 'Erro 502',
      url: '/errors/error-502',
      parentKey: 'errors'
    }, {
      key: 'service-unavailable',
      label: 'Serviço Indisponivel',
      url: '/errors/service-unavailable',
      parentKey: 'errors'
    }]
  }, {
    key: 'starter-page',
    label: 'Criar Nova Página',
    url: '/pages/starter-page',
    parentKey: 'pages'
  }, {
    key: 'faq',
    label: 'Perguntas Frequentes',
    url: '/pages/faq',
    parentKey: 'pages'
  }, {
    key: 'maintenance',
    label: 'Manuntenção',
    url: '/maintenance',
    parentKey: 'pages'
  }, {
    key: 'timeline',
    label: 'Linha do Tempo',
    url: '/pages/timeline',
    parentKey: 'pages'
  }]
}, {
  key: 'components',
  label: 'Componentes',
  icon: 'tabler:components',
  children: [{
    key: 'widgets',
    label: 'Widgets',
    url: '/wallet',
    parentKey: 'components'
  }, {
    key: 'base-ui',
    label: 'UI Básico',
    children: [{
      key: 'base-ui-accordions',
      label: 'Acordeão',
      url: '/ui/accordions',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-alerts',
      label: 'Alertas',
      url: '/ui/alerts',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-avatars',
      label: 'Avatares',
      url: '/ui/avatars',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-badges',
      label: 'Emblemas',
      url: '/ui/badges',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-breadcrumb',
      label: 'Breadcrumb',
      url: '/ui/breadcrumb',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-buttons',
      label: 'Botões',
      url: '/ui/buttons',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-cards',
      label: 'Cards',
      url: '/ui/cards',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-carousel',
      label: 'Carrossel',
      url: '/ui/carousel',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-collapse',
      label: 'Collapse',
      url: '/ui/collapse',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-dropdowns',
      label: 'Dropdowns',
      url: '/ui/dropdowns',
      parentKey: 'base-ui'
    }, {
      key: 'ul-ratio',
      label: 'Ratio',
      url: '/ui/ratio',
      parentKey: 'base-ui'
    }, {
      key: 'ul-grid',
      label: 'Grid',
      url: '/ui/grid',
      parentKey: 'base-ui'
    }, {
      key: 'ul-links',
      label: 'Links',
      url: '/ui/links',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-list-group',
      label: 'Listas Agrupadas',
      url: '/ui/list-group',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-modals',
      label: 'Modais',
      url: '/ui/modals',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-notifications',
      label: 'Notificações',
      url: '/ui/notifications',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-offcanvas',
      label: 'Offcanvas',
      url: '/ui/offcanvas',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-placeholders',
      label: 'Placeholders',
      url: '/ui/placeholders',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-pagination',
      label: 'Paginação',
      url: '/ui/pagination',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-popovers',
      label: 'Popovers',
      url: '/ui/popovers',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-progress',
      label: 'Progresso',
      url: '/ui/progress',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-spinners',
      label: 'Loading',
      url: '/ui/spinners',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-tabs',
      label: 'Abas',
      url: '/ui/tabs',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-tooltips',
      label: 'Tooltips',
      url: '/ui/tooltips',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-typography',
      label: 'Tipografia',
      url: '/ui/typography',
      parentKey: 'base-ui'
    }, {
      key: 'base-ui-utilities',
      label: 'Utilidades',
      url: '/ui/utilities',
      parentKey: 'base-ui'
    }]
  }, {
    key: 'extended-ui',
    label: 'UI Avançado',
    children: [{
      key: 'dragula',
      label: 'Drag',
      url: '/extended/dragula',
      parentKey: 'extended-ui'
    }, {
      key: 'sweet-alert',
      label: 'Alertas em Modais',
      url: '/extended/sweet-alert',
      parentKey: 'extended-ui'
    }, {
      key: 'ratings',
      label: 'Estrelas',
      url: '/extended/ratings',
      parentKey: 'extended-ui'
    }, {
      key: 'scrollbar',
      label: 'Scroll',
      url: '/extended/scrollbar',
      parentKey: 'extended-ui'
    }]
  }, {
    key: 'forms',
    label: 'Formulários',
    children: [{
      key: 'basic',
      label: 'Elementos Básicos',
      url: '/forms/basic',
      parentKey: 'forms'
    }, {
      key: 'inputmask',
      label: 'Máscara de Input',
      url: '/forms/inputmask',
      parentKey: 'forms'
    }, {
      key: 'picker',
      label: 'Picker',
      url: '/forms/picker',
      parentKey: 'forms'
    }, {
      key: 'select',
      label: 'Select',
      url: '/forms/select',
      parentKey: 'forms'
    }, {
      key: 'slider',
      label: 'Range',
      url: '/forms/slider',
      parentKey: 'forms'
    }, {
      key: 'validation',
      label: 'Validação',
      url: '/forms/validation',
      parentKey: 'forms'
    }, {
      key: 'wizard',
      label: 'Multi Step',
      url: '/forms/wizard',
      parentKey: 'forms'
    }, {
      key: 'file-uploads',
      label: 'Uploads',
      url: '/forms/file-uploads',
      parentKey: 'forms'
    }, {
      key: 'editors',
      label: 'Editor de Texto',
      url: '/forms/editors',
      parentKey: 'forms'
    }]
  }, {
    key: 'charts',
    label: 'Gráficos',
    children: [{
      key: 'area',
      label: 'Area',
      url: '/charts/area',
      parentKey: 'charts'
    }, {
      key: 'bar',
      label: 'Barra',
      url: '/charts/bar',
      parentKey: 'charts'
    }, {
      key: 'bubble',
      label: 'Bolha',
      url: '/charts/bubble',
      parentKey: 'charts'
    }, {
      key: 'candlestick',
      label: 'Vela',
      url: '/charts/candlestick',
      parentKey: 'charts'
    }, {
      key: 'column',
      label: 'Coluna',
      url: '/charts/column',
      parentKey: 'charts'
    }, {
      key: 'heatmap',
      label: 'Heatmap',
      url: '/charts/heatmap',
      parentKey: 'charts'
    }, {
      key: 'line',
      label: 'Linha',
      url: '/charts/line',
      parentKey: 'charts'
    }, {
      key: 'mixed',
      label: 'Mix',
      url: '/charts/mixed',
      parentKey: 'charts'
    }, {
      key: 'timeline-chart',
      label: 'Linha do Tempo',
      url: '/charts/timeline',
      parentKey: 'charts'
    }, {
      key: 'boxplot',
      label: 'Boxplot',
      url: '/charts/boxplot',
      parentKey: 'charts'
    }, {
      key: 'treemap',
      label: 'Treemap',
      url: '/charts/treemap',
      parentKey: 'charts'
    }, {
      key: 'pie',
      label: 'Pizza',
      url: '/charts/pie',
      parentKey: 'charts'
    }, {
      key: 'radar',
      label: 'Radar',
      url: '/charts/radar',
      parentKey: 'charts'
    }, {
      key: 'radialBar',
      label: 'Raio',
      url: '/charts/radialBar',
      parentKey: 'charts'
    }, {
      key: 'scatter',
      label: 'Scatter',
      url: '/charts/scatter',
      parentKey: 'charts'
    }, {
      key: 'polar',
      label: 'Area Polar',
      url: '/charts/polar',
      parentKey: 'charts'
    }, {
      key: 'sparklines',
      label: 'Sparklines',
      url: '/charts/sparklines',
      parentKey: 'charts'
    }]
  }, {
    key: 'tables',
    label: 'Tabelas',
    children: [{
      key: 'basic-table',
      label: 'Tabelas Básicas',
      url: '/tables/basic-table',
      parentKey: 'tables'
    }, {
      key: 'gridJs',
      label: 'Tabelas em Grid',
      url: '/tables/gridJs',
      parentKey: 'tables'
    }]
  }, {
    key: 'icons',
    label: 'Ícones',
    children: [{
      key: 'tabler',
      label: 'Tabler',
      url: '/icons/tabler',
      parentKey: 'icons'
    }, {
      key: 'solar',
      label: 'Solar',
      url: '/icons/solar',
      parentKey: 'icons'
    }]
  }, {
    key: 'maps',
    label: 'Mapas',
    children: [{
      key: 'google',
      label: 'Google Maps',
      url: '/maps/google',
      parentKey: 'maps'
    }, {
      key: 'vector',
      label: 'Vector',
      url: '/maps/vector',
      parentKey: 'maps'
    }, {
      key: 'leaflet',
      label: 'Mapas Interativos',
      url: '/maps/leaflet',
      parentKey: 'maps'
    }]
  }]
}, {
  key: 'layouts',
  label: 'Layouts',
  icon: 'solar:window-frame-outline',
  children: [{
    key: 'horizontal',
    label: 'Horizontal',
    url: '/horizontal',
    parentKey: 'layouts',
    target: '_blank'
  }, {
    key: 'detached',
    label: 'Detached',
    target: '_blank',
    url: '/detached',
    parentKey: 'layouts'
  }, {
    key: 'full-view',
    label: 'Tela Cheia',
    url: '/full-view',
    parentKey: 'layouts',
    target: '_blank'
  }, {
    key: 'hover-menu',
    label: 'Menu com Hover',
    url: '/hover-menu',
    parentKey: 'layouts',
    target: '_blank'
  }, {
    key: 'compact',
    label: 'Compacto',
    url: '/compact',
    parentKey: 'layouts',
    target: '_blank'
  }, {
    key: 'icon-view',
    label: 'Visualização de Ícones',
    url: '/icon-view',
    parentKey: 'layouts',
    target: '_blank'
  }, {
    key: 'dark-mode',
    label: 'Modo Escuro',
    url: '/dark-mode',
    parentKey: 'layouts',
    target: '_blank'
  }]
}];
