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
  HOME_ICON.addEventListener('click', () => {
    USER_INTERFACE.innerHTML = '';
    USER_INTERFACE.appendChild(globalComponent);
  });
  CURRENCIES_BUTTON.addEventListener('click',async () => {
    USER_INTERFACE.innerHTML = '';
    const currencyListComponent = await createCurrencyListComponent();
    USER_INTERFACE.appendChild(currencyListComponent);
  });
  CATEGORIES_BUTTON.addEventListener('click', () => {
    USER_INTERFACE.innerHTML = '';
    const categoriesComponent = createCategoriesComponent();
    USER_INTERFACE.appendChild(categoriesComponent);
  });
  EXCHANGES_BUTTON.addEventListener('click', () => {
    USER_INTERFACE.innerHTML = '';
    const exchangesComponent = createExchangesComponent();
    USER_INTERFACE.appendChild(exchangesComponent);
  });
  FAVORITES_BUTTON.addEventListener('click', () => {
    USER_INTERFACE.innerHTML = '';
    const favoritesComponent = createFavoritesComponent();
    USER_INTERFACE.appendChild(favoritesComponent);
  });
};
