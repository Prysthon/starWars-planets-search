import React, { useState, useContext } from 'react';
import MyContext from '../context/myContext';
import ShowFilters from './ShowFilters';

function Filters() {
  const { filters, setFilters } = useContext(MyContext);

  const [localFilters, setLocalFilters] = useState({
    columns: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  const handleChange = ({ target: { name, value } }) => {
    setLocalFilters({
      ...localFilters,
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
      </form>
      {showFilters && <ShowFilters filters={ filters } />}
    </div>
  );
}

export default Filters;
