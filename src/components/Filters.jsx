import React, { useState, useContext } from 'react';
import MyContext from '../context/myContext';
import ShowFilters from './ShowFilters';

function Filters() {
  const { filters, setFilters, setOrderFilters } = useContext(MyContext);

  const [localFilters, setLocalFilters] = useState({
    columns: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [sortLocal, setSortLocal] = useState({ column: 'population', sort: 'ASC' });

  const handleChange = ({ target: { name, value } }) => {
    setLocalFilters({
      ...localFilters,
      [name]: value,
    });
  };

  const handleChangeOrder = ({ target: { name, value } }) => {
    setSortLocal({
      ...sortLocal,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setFilters([...filters, localFilters]);
    setShowFilters(true);
    const removeColumn = localFilters.columns;
    const newOptions = filterOptions.filter((option) => option !== removeColumn);
    setLocalFilters({
      ...localFilters,
      columns: newOptions[0],
    });
    setFilterOptions(newOptions);
  };

  return (
    <div>
      <form>
        <label htmlFor="column-filter">
          Columns:
          <select
            onChange={ handleChange }
            data-testid="column-filter"
            id="column-filter"
            name="columns"
            value={ localFilters.columns }
          >
            {filterOptions
              .map((option) => <option value={ option } key={ option }>{option}</option>)}
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Comparison:
          <select
            onChange={ handleChange }
            data-testid="comparison-filter"
            id="comparison-filter"
            name="comparison"
            value={ localFilters.comparison }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual">igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          Value:
          <input
            onChange={ handleChange }
            name="value"
            type="number"
            id="value-filter"
            data-testid="value-filter"
            value={ localFilters.value }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleSubmit }
        >
          Submit
        </button>
        <label htmlFor="column-sort">
          Order by column:
          <select
            onChange={ handleChangeOrder }
            data-testid="column-sort"
            id="column-sort"
            name="column"
            value={ sortLocal.column }
          >
            {filterOptions
              .map((option) => <option value={ option } key={ option }>{option}</option>)}
          </select>
        </label>
        <label htmlFor="column-sort-input-asc">
          Asc
          <input
            type="radio"
            onChange={ handleChangeOrder }
            data-testid="column-sort-input-asc"
            id="column-sort-input-asc"
            name="sort"
            value="ASC"
          />
        </label>
        <label htmlFor="column-sort-input-desc">
          Desc
          <input
            type="radio"
            onChange={ handleChangeOrder }
            data-testid="column-sort-input-desc"
            id="column-sort-input-desc"
            name="sort"
            value="DESC"
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => setOrderFilters(sortLocal) }
        >
          Sort
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => setFilters([]) }
        >
          Clear all
        </button>
      </form>
      {showFilters && <ShowFilters />}
    </div>
  );
}

export default Filters;
