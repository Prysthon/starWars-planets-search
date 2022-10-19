import React, { useContext } from 'react';
import MyContext from '../context/myContext';

function Table() {
  const { planets } = useContext(MyContext);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital_period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {planets.map((planet) => (
            <tr key={ planet.name }>
              {Object.values(planet).map((inf) => (
                <td key={ inf }>
                  {inf}
                </td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
