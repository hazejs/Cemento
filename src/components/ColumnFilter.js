// ColumnFilter.js
import React, { useState } from 'react';

const ColumnFilter = ({ columns, onColumnFilterChange }) => {
  const columnArray = Object.values(columns);
  const [selectedColumns, setSelectedColumns] = useState(() => {
    return columnArray.map((column) => column.id);
  });

  const handleCheckboxChange = (columnId) => {
    const updatedColumns = selectedColumns.includes(columnId)
      ? selectedColumns.filter((id) => id !== columnId)
      : [...selectedColumns, columnId];

    setSelectedColumns(updatedColumns);
    onColumnFilterChange(updatedColumns);
  };

  return (
    <div>
      {columnArray.map((column) => (
        <label key={column.id}>
          <input
            className='generic-input'
            type="checkbox"
            checked={selectedColumns.includes(column.id)}
            onChange={() => handleCheckboxChange(column.id)}
          />
          {column.title}
        </label>
      ))}
    </div>
  );
};

export default ColumnFilter;
