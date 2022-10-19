import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const endpoint = 'https://swapi.dev/api/planets';

  useEffect(() => {
    const getPlanetsAPI = async () => {
      const request = await fetch(endpoint);
      const response = await request.json();
      const { results } = response;
      const data = results.map((e) => {
        delete e.residents;
        return e;
      });
      setPlanets(data);
    };
    getPlanetsAPI();
  }, []);

  return (
    <MyContext.Provider value={ planets }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Provider;
