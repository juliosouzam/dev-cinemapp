import { render, fireEvent, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';

import api from '../../services/api';

import Dashboard from '../../pages/Dashboard';

const apiMock = new MockAdapter(api);

describe('Dashboard page', () => {
  it('should be able to search movies', async () => {
    apiMock.onGet('').reply(200, {
      Search: [
        {
          Title: 'Batman Begins',
          Year: '2005',
          imdbID: 'tt0372784',
          Type: 'movie',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        },
        {
          Title: 'Batman v Superman: Dawn of Justice',
          Year: '2016',
          imdbID: 'tt2975590',
          Type: 'movie',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        },
        {
          Title: 'Batman Returns',
          Year: '1992',
          imdbID: 'tt0103776',
          Type: 'movie',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg',
        },
      ],
    });
    const { getByPlaceholderText, getByText } = render(<Dashboard />);

    const searchField = getByPlaceholderText('Digite o nome do filme');
    const buttonField = getByText('Pesquisar');

    fireEvent.change(searchField, {
      target: {
        value: 'batman',
      },
    });

    fireEvent.click(buttonField);

    await waitFor(() => expect(getByText('Batman Begins')).toBeTruthy(), {
      timeout: 200,
    });
    expect(getByText('Batman v Superman: Dawn of Justice')).toBeTruthy();
    expect(getByText('Batman Returns')).toBeTruthy();
  });

  it('should be able to favorite a movie', async () => {
    apiMock.onGet('').reply(200, {
      Search: [
        {
          Title: 'Batman Begins',
          Year: '2005',
          imdbID: 'tt0372784',
          Type: 'movie',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        },
        {
          Title: 'Batman v Superman: Dawn of Justice',
          Year: '2016',
          imdbID: 'tt2975590',
          Type: 'movie',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        },
        {
          Title: 'Batman Returns',
          Year: '1992',
          imdbID: 'tt0103776',
          Type: 'movie',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg',
        },
      ],
    });
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Dashboard />,
    );

    const searchField = getByPlaceholderText('Digite o nome do filme');
    const buttonField = getByText('Pesquisar');

    fireEvent.change(searchField, {
      target: {
        value: 'batman',
      },
    });

    fireEvent.click(buttonField);

    await waitFor(() => expect(getByText('Batman Begins')).toBeTruthy(), {
      timeout: 200,
    });
    const buttonFavorite = getByTestId('favorite-tt0372784');
    fireEvent.click(buttonFavorite);

    const setItemSpy = jest.spyOn(localStorage, 'setItem');

    expect(setItemSpy).toBeCalledWith(
      'favorites',
      JSON.stringify([
        {
          Title: 'Batman Begins',
          Year: '2005',
          imdbID: 'tt0372784',
          Type: 'movie',
          Poster:
            'https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
        },
      ]),
    );
  });
});
