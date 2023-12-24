import '../public/style/style.scss';
import { initMainPage } from './pages/mainPage';

const loadApp = () => {
  initMainPage();
};

window.addEventListener('load', loadApp);
