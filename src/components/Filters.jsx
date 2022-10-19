import React, { useState, useContext } from 'react';
import MyContext from '../context/myContext';

function Filters() {
  const { setFilters } = useContext(MyContext);

  const [localFilters, setLocalFilters] = useState({
    columns: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const handleChange = ({ target: { name, value } }) => {
    setLocalFilters({
      ...localFilters,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setFilters(localFilters);
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
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
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
    </div>
  );
}

export default Filters;
