import React from 'react';

function ShowFilters(filtersArray) {
  const { filters } = filtersArray;
  return (
    <div>
      Filters:
      <ul>
        {filters.map(({ columns, comparison, value }) => (
          <li key={ columns }>
            {columns}
            {comparison}
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowFilters;
