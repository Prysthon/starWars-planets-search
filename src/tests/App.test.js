import React from 'react';
import { screen } from '@testing-library/react';
import testData from "../../cypress/mocks/testData";
import renderContext from './renderContext';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('test app', () => {
  it('test textSearch', async () => {
    global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(testData),
    })
  );

    renderContext(<App />)

    expect(fetch).toHaveBeenCalled();

    const projectTitle = screen.getByText(/projeto star wars/i)
    const searchPlanet = screen.getByText(/search planet:/i)

    expect(projectTitle).toBeInTheDocument();
    expect(searchPlanet).toBeInTheDocument();

    userEvent.type(searchPlanet, 'aa');

    const planetShowed = await screen.findByRole('cell', {
      name: /alderaan/i
    });
    expect(planetShowed).toBeInTheDocument();
  });
  it('test showFilters', async () => {
    global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(testData),
    })
  );

    renderContext(<App />)

    expect(fetch).toHaveBeenCalled();

    const valueInput = screen.getByRole('spinbutton', {
      name: /value:/i
    });
    const submitButton = screen.getByRole('button', {
      name: /submit/i
    });

    expect(valueInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    userEvent.type(valueInput, 10);
    userEvent.click(submitButton);

    const deleteFilterButton = await screen.getByRole('button', {
      name: /delete/i
    });

    expect(deleteFilterButton).toBeInTheDocument();
  });
  it('test sort planets', async () => {
    global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(testData),
    })
  );

    renderContext(<App />)

    expect(fetch).toHaveBeenCalled();

    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const submitButton = screen.getByTestId('button-filter')

    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    userEvent.selectOptions(comparisonFilter, ['igual a']);
    userEvent.type(valueFilter, 1000);
    userEvent.click(submitButton);

    const planetShowed = await screen.findByRole('cell', {
      name: /yavin iv/i
    });
    expect (planetShowed).toBeInTheDocument();
  });
});

