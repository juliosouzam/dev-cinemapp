import { FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Wrapper } from './styles';

import logo from '../../assets/logo.svg';

const Header: React.FC = () => {
  return (
    <Wrapper>
      <Link to="/">
        <img src={logo} alt="Cinema App" />
      </Link>

      <Link to="/favorites" data-testid="goto-favorites">
        <FiStar size={16} />
        Favoritos
      </Link>
    </Wrapper>
  );
};

export default Header;
