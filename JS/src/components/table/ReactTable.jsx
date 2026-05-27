import { flexRender, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import classNames from "classnames";
import { useEffect, useRef, useState } from 'react';
import { Table } from "react-bootstrap";
import Pagination from "./Pagination";
const IndeterminateCheckbox = ({
  indeterminate,
  ...rest
}) => {
  const ref = useRef(null);
  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);
  return <div className="form-check">
      <input type="checkbox" className="form-check-input cursor-pointer" ref={ref} {...rest} />
      <label htmlFor="form-check-input" className="form-check-label"></label>
    </div>;
};
const ReactTable = ({
  options,
  columns,
  data,
  pageSize,
  showPagination,
  rowsPerPageList,
  tableClass,
  isSearchable,
  searchBoxClass,
  searchLabel,
  searchPlaceholder,
  theadClass,
  isSelectable
}) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize ?? 5
  });
  const [globalFilter, setGlobalFilter] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [expanded, setExpanded] = useState({});
  const table = useReactTable({
    ...options,
    data,
    columns,
    onPaginationChange: setPagination,
    state: {
      pagination,
      globalFilter,
      rowSelection,
      expanded
    },
    initialState: {
      globalFilter: '' // Initial empty filter state
    },
    enableRowSelection: true,
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    ...(showPagination && {
      getPaginationRowModel: getPaginationRowModel()
    })
  });
  return <>
      {isSearchable && <div className={classNames(searchBoxClass)}>
          <span className="d-flex align-items-center">
            {searchLabel ?? 'Search'} :
            <input value={globalFilter ?? ''} onChange={e => table.setGlobalFilter(e.target.value)} placeholder={searchPlaceholder ?? 'Buscar....'} className="form-control w-auto ms-1" />
          </span>
        </div>}
      <Table responsive className={classNames("table table-centered w-100 dt-responsive nowrap dataTable no-footer dtr-inline", tableClass)} id="products-datatable" aria-describedby="products-datatable_info" style={{
      width: 1552
    }}>
        <thead className={theadClass}>

          {table.getHeaderGroups().map(headerGroup => <tr key={headerGroup.id}>
              {isSelectable && <th>
                  <IndeterminateCheckbox {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }} />
                </th>}
              {headerGroup.headers.map(header => <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>)}
            </tr>)}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => <tr key={row.id}>
              {isSelectable && <td>
                  <IndeterminateCheckbox {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }} />
                </td>}
              {row.getVisibleCells().map(cell => <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>)}
            </tr>)}
        </tbody>
      </Table>
      {showPagination && <Pagination table={table} currentPage={table.getState().pagination.pageIndex + 1} totalPages={table.getPageCount()} rowsPerPageList={rowsPerPageList} pagination={pagination} />}
    </>;
};
export default ReactTable;
