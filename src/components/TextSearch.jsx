import React, { useContext } from 'react';
import MyContext from '../context/myContext';

function TextSearch() {
  const { setSearchPlanets } = useContext(MyContext);

  const handleChange = ({ target: { value } }) => {
    setSearchPlanets(value);
  };

  return (
    <div>
      Projeto Star Wars
      <form>
        <label htmlFor="name">
          Search Planet:
          <input
            data-testid="name-filter"
            type="text"
            id="name"
            onChange={ handleChange }
          />
        </label>
      </form>
    </div>
  );
}

export default TextSearch;
