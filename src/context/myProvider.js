import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [searchPlanets, setSearchPlanets] = useState('');
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

  useEffect(() => {
    const getPlanetsAPI = async () => {
      const request = await fetch(endpoint);
      const response = await request.json();
      const { results } = response;
      const data = results.map((e) => {
        delete e.residents;
        return e;
      });
      const filterPlanets = data.filter(({ name }) => name.includes(searchPlanets));
      setPlanets(filterPlanets);
    };
    getPlanetsAPI();
  }, [searchPlanets]);

  const providerValue = useMemo(() => ({
    planets,
    setSearchPlanets,
  }), [planets]);

  return (
    <MyContext.Provider value={ providerValue }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Provider;
