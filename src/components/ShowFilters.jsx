import React, { useContext } from 'react';
import MyContext from '../context/myContext';

function ShowFilters() {
  const { filters, setFilters } = useContext(MyContext);

  const handleClick = ({ target: { id: column } }) => {
    const newFilterArray = filters.filter(({ columns }) => columns !== column);
    setFilters(newFilterArray);
  };

  return (
    <div>
      Filters:
      <ul>
        {filters.map(({ columns, comparison, value }) => (
          <li key={ columns } data-testid="filter">
            {columns}
            {comparison}
            {value}
            <button
              type="button"
              id={ columns }
              onClick={ (e) => handleClick(e) }
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowFilters;
