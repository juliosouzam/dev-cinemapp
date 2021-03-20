import { FormEvent, useCallback, useEffect, useState } from 'react';
import { FiStar } from 'react-icons/fi';

import { Title, Form, Movies, Movie, Error } from './styles';

import api from '../../services/api';

interface MovieResponse {
  Search?: IMovie[];
}

interface IMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const Dashboard: React.FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [favorites, setFavorites] = useState<IMovie[]>(() => {
    const favoritesLocaly = localStorage.getItem('favorites');

    if (favoritesLocaly) {
      return JSON.parse(favoritesLocaly);
    }

    return [];
  });
  const [movie, setMovie] = useState('');
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleAddMovie = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!movie) {
        setInputError('Digite o filme');

        return;
      }

      try {
        const response = await api.get<MovieResponse>('', {
          params: {
            s: movie,
          },
        });

        const { Search } = response.data;
        if (Search) {
          setMovies(Search);
          setMovie('');
          setInputError('');
        } else {
          setInputError('Filme não encontrado');
        }
      } catch (error) {
        setInputError('Erro na busca por esse filme');
      }
    },
    [movie],
  );

  const handleToogleFavorite = useCallback((mov: IMovie) => {
    setFavorites(prev =>
      prev.find(p => p.imdbID === mov.imdbID)
        ? prev.filter(p => p.imdbID !== mov.imdbID)
        : [...prev, mov],
    );
  }, []);

  return (
    <>
      <Title>Cinema App</Title>

      <Form onSubmit={handleAddMovie} hasError={!!inputError}>
        <input
          type="text"
          placeholder="Digite o nome do filme"
          value={movie}
          onChange={e => setMovie(e.target.value)}
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Movies>
        {movies.map(mov => (
          <Movie
            key={mov.imdbID}
            isFavorite={!!favorites.find(f => f.imdbID === mov.imdbID)}
          >
            <img src={mov.Poster} alt={mov.Title} />

            <div>
              <strong>{mov.Title}</strong>
              <p>{mov.Year}</p>
            </div>

            <button
              type="button"
              onClick={() => handleToogleFavorite(mov)}
              data-testid={`favorite-${mov.imdbID}`}
            >
              <FiStar size={24} />
            </button>
          </Movie>
        ))}
      </Movies>
    </>
  );
};

export default Dashboard;
