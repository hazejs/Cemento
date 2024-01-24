import React, { useState, useEffect } from 'react';
import ColumnFilter from './ColumnFilter';
import EditableCell from './EditableCell';

const Table = ({ tableData }) => {
    const [collapsedRows, setCollapsedRows] = useState(
    tableData.data.reduce((acc, row) => ({ ...acc, [row.id]: true }), {})
  );
  const [columns, setColumns] = useState(tableData.columns || {});
  const [rows, setRows] = useState(() => {
    const storedData = localStorage.getItem('tableData');
    return storedData ? JSON.parse(storedData) : tableData.data || [];
  });
  const [filteredColumns, setFilteredColumns] = useState(Object.keys(columns));
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setColumns(tableData.columns || {});
    setFilteredColumns(Object.keys(tableData.columns || {}));
    setRows(tableData.data || []);
  }, [tableData]);

  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(rows));
  }, [rows]);

  const handleColumnFilterChange = (selectedColumns) => {
    setFilteredColumns(selectedColumns);
  };

  const handleCellEdit = (rowId, columnId, newValue) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId
          ? { ...row, [columnId]: newValue }
          : row.subRows && row.subRows.length > 0
            ? { ...row, subRows: row.subRows.map((subRow) => (subRow.id === rowId ? { ...subRow, [columnId]: newValue } : subRow)) }
            : row
      )
    );
  };

  const filterRows = () => {
    return rows.filter((row) => {
      const matchingColumns = filteredColumns.map((columnId) => String(row[columnId]));
      const includesSearchQuery = matchingColumns
        .join(' ')
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return includesSearchQuery;
    });
  };

  const renderTableHeader = () => {
    return (
      <tr>
        <th><strong>#</strong></th>
        {Object.entries(columns)
          .filter(([columnId]) => filteredColumns.includes(columnId))
          .map(([columnId, column]) => (
            <th key={columnId} style={{ width: column.width }}>
              {column.title}
            </th>
          ))}
      </tr>
    );
  };

  const renderTableBody = () => {
    const filteredRows = filterRows();
    const allRows = [];
  
    filteredRows.forEach((row) => {
      allRows.push(
        <tr key={row.id}>
          <td>
            {row.subRows && row.subRows.length > 0 && (
              <button style={{background: 'transparent', border: 0, cursor: 'pointer', width: '100%'}} onClick={() => toggleCollapsedRow(row.id)}>
                 <div style={collapsedRows[row.id] ? {transform: 'rotate(0deg)', transition: '0.5s all', fontSize: '20px'} :
                  {transform: 'rotate(180deg)', transition: '0.5s all', fontSize: '20px'}}>
                  ▼
                 </div>
               
              </button>
            )}
          </td>
          {filteredColumns.map((columnId) => (
            <EditableCell
              key={columnId}
              value={row[columnId]}
              onSave={(newValue) => handleCellEdit(row.id, columnId, newValue)}
            />
          ))}

          
        </tr>
      );
  
      if (!collapsedRows[row.id] && row.subRows && row.subRows.length > 0) {
        row.subRows.forEach((subRow) => {
          allRows.push(
            <tr key={subRow.id}>
              <td></td>
              {filteredColumns.map((columnId) => (
                <EditableCell
                  key={columnId}
                  value={subRow[columnId]}
                  onSave={(newValue) => handleCellEdit(subRow.id, columnId, newValue)}
                />
              ))}
            </tr>
          );
        });
      }
    });
  
    return allRows;
  };
  

  const toggleCollapsedRow = (rowId) => {
    setCollapsedRows((prevCollapsedRows) => ({
      ...prevCollapsedRows,
      [rowId]: !prevCollapsedRows[rowId],
    }));
  };

  return (
    <div>
      <ColumnFilter columns={columns} onColumnFilterChange={handleColumnFilterChange} />
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table>
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
};

export default Table;
