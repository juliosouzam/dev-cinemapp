import { FiStar } from 'react-icons/fi';
import { useCallback, useEffect, useState } from 'react';

import { Movies, Movie } from './styles';

interface IMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<IMovie[]>(() => {
    const favoritesLocaly = localStorage.getItem('favorites');

    if (favoritesLocaly) {
      return JSON.parse(favoritesLocaly);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToogleFavorite = useCallback((mov: IMovie) => {
    setFavorites(prev =>
      prev.find(p => p.imdbID === mov.imdbID)
        ? prev.filter(p => p.imdbID !== mov.imdbID)
        : [...prev, mov],
    );
  }, []);

  return (
    <Movies>
      {favorites.map(favorite => (
        <Movie key={favorite.imdbID}>
          <img src={favorite.Poster} alt={favorite.Title} />

          <div>
            <strong>{favorite.Title}</strong>
            <p>{favorite.Year}</p>
          </div>

          <button type="button" onClick={() => handleToogleFavorite(favorite)}>
            <FiStar size={24} />
          </button>
        </Movie>
      ))}
    </Movies>
  );
};

export default Favorites;
