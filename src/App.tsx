import { BrowserRouter } from 'react-router-dom';

import Header from './components/Header';

import GlobalStyle from './styles/global';
import Routes from './routes';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Header />
      <Routes />
    </BrowserRouter>
    <GlobalStyle />
  </>
);

export default App;
