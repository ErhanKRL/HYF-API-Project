import {
  USER_INTERFACE,
  HOME_ICON,
  CURRENCIES_BUTTON,
  CATEGORIES_BUTTON,
  EXCHANGES_BUTTON,
  FAVORITES_BUTTON,
  SEARCH_INPUT,
  GOTO_TOP_BUTTON,
} from '../elementSelector';
import { createGlobalComponent } from '../components/globalComponent';
import { createCurrencyListComponent } from '../components/listComponent';
import { createExchangesComponent } from '../components/exchangesComponent';
import { createFavoritesComponent } from '../components/favoritesComponent';
import { createCategoriesComponent } from '../components/categoriesComponent';

export const initMainPage = async () => {
  
  USER_INTERFACE.innerHTML = '';
  const globalComponent = await createGlobalComponent();
  USER_INTERFACE.appendChild(globalComponent);
  const currencyListComponent = createCurrencyListComponent();
  const categoriesComponent = createCategoriesComponent();
  const exchangesComponent = createExchangesComponent();
  const favoritesComponent = createFavoritesComponent();
  HOME_ICON.addEventListener('click', () => {
    USER_INTERFACE.innerHTML = '';
    USER_INTERFACE.appendChild(globalComponent);
  });
  CURRENCIES_BUTTON.addEventListener('click', () => {
    USER_INTERFACE.innerHTML = '';
    USER_INTERFACE.appendChild(currencyListComponent);
  });
  CATEGORIES_BUTTON.addEventListener('click', () => {
    USER_INTERFACE.innerHTML = '';
    USER_INTERFACE.appendChild(categoriesComponent);
  });
  EXCHANGES_BUTTON.addEventListener('click', () => {
    USER_INTERFACE.innerHTML = '';
    USER_INTERFACE.appendChild(exchangesComponent);
  });
  FAVORITES_BUTTON.addEventListener('click', () => {
    USER_INTERFACE.innerHTML = '';
    USER_INTERFACE.appendChild(favoritesComponent);
  });
};
