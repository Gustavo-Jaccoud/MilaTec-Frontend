import ReactTable from '@/components/table/ReactTable';
import { Link } from 'react-router-dom';

const sizePerPageList = [5, 10, 25, 50];

const buildColumns = (type) => {
  const commonActionColumn = {
    header: 'A\u00e7\u00e3o',
    accessorKey: 'id',
    enableSorting: false,
    cell: ({ row }) => (
      <Link to={row.original.detailsPath} className="btn btn-sm btn-outline-primary">
        Ver detalhes
      </Link>
    )
  };

  if (type === 'constructions') {
    return [
      { header: 'Obra/Or\u00e7amento', accessorKey: 'title' },
      { header: 'Etapa', accessorKey: 'stage' },
      { header: 'Tipo de or\u00e7amento', accessorKey: 'type' },
      { header: 'Cidade da obra', accessorKey: 'city' },
      commonActionColumn
    ];
  }

  return [
    { header: 'Projeto', accessorKey: 'title' },
    { header: 'Etapa', accessorKey: 'stage' },
    { header: 'Or\u00e7amento', accessorKey: 'budgetName' },
    { header: 'Tipo de or\u00e7amento', accessorKey: 'budgetType' },
    { header: 'Cidade da obra', accessorKey: 'category' },
    { header: 'Data de cria\u00e7\u00e3o', accessorKey: 'createdAt' },
    commonActionColumn
  ];
};

const FunnelTable = ({ type, rows }) => {
  return (
    <ReactTable
      columns={buildColumns(type)}
      data={rows}
      pageSize={5}
      rowsPerPageList={sizePerPageList}
      showPagination
      isSearchable
      searchLabel="Buscar"
      searchPlaceholder="Buscar no funil..."
      tableClass="funnel-data-table"
      theadClass="table-light"
    />
  );
};

export default FunnelTable;
