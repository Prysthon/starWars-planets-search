import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import MyContext from './myContext';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [searchPlanets, setSearchPlanets] = useState('');
  const [filters, setFilters] = useState([]);
  const [orderFilters, setOrderFilters] = useState({});
  const endpoint = 'https://swapi.dev/api/planets';

  useEffect(() => {
    const filterPlanetsByName = async () => {
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
    filterPlanetsByName();
  }, [searchPlanets]);

  useEffect(() => {
    const filterPlanetsFunc = () => {
      let filterPlanets = [];
      filters.forEach(({ columns, comparison, value }) => {
        if (comparison === 'maior que') {
          filterPlanets = planets.filter((e) => e[columns] > Number(value));
        } else if (comparison === 'menor que') {
          filterPlanets = planets.filter((e) => e[columns] < Number(value));
        } else if (comparison === 'igual') {
          filterPlanets = planets.filter((e) => Number(e[columns]) === Number(value));
        }
        setPlanets(filterPlanets);
      });
    };
    const getPlanetsAPI = async () => {
      const request = await fetch(endpoint);
      const response = await request.json();
      const { results } = response;
      const data = results.map((e) => {
        delete e.residents;
        return e;
      });
      setPlanets(data);
      filterPlanetsFunc();
    };
    getPlanetsAPI();
  }, [filters]);

  const providerValue = useMemo(() => ({
    planets,
    setSearchPlanets,
    filters,
    setFilters,
    setOrderFilters,
  }), [planets, filters]);

  useEffect(() => {
    const sortPlanets = () => {
      planets.sort((a, b) => {
        if (orderFilters.sort === 'ASC') {
          return +a[orderFilters.column] - +b[orderFilters.column];
        }
        return +b[orderFilters.column] - +a[orderFilters.column];
      });
      const filter1 = planets.filter((e) => e[orderFilters.column] === 'unknown');
      const filter2 = planets.filter((e) => e[orderFilters.column] !== 'unknown');
      const newSortedValue = [...filter2, ...filter1];
      setPlanets(newSortedValue);
    };
    sortPlanets();
  }, [orderFilters]);

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
