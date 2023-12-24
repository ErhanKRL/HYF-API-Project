import {
  USER_INTERFACE,
  HOME_ICON,
  CURRENCIES_BUTTON,
  NETWORKS_BUTTON,
  EXCHANGES_BUTTON,
  INVESTORS_BUTTON,
  FILTERS_BUTTON,
  FAVORITES_BUTTON,
  SEARCH_INPUT,
  GOTO_TOP_BUTTON,
} from '../elementSelector';
import { createGlobalComponent } from '../components/globalComponent';
import { createCurrencyListComponent } from '../components/listComponent';
import { createExchangesComponent } from '../components/exchangesComponent';
import { createFavoritesComponent } from '../components/favoritesComponent';
import { createFiltersComponent } from '../components/filtersComponent';
import { createInvestorsComponent } from '../components/investorsComponent';
import { createNetworksComponent } from '../components/NetworksComponent';

export const initMainPage = () => {
  USER_INTERFACE.innerHTML = '';
  const globalComponent = createGlobalComponent();
  USER_INTERFACE.appendChild(globalComponent);
  const currencyListComponent = createCurrencyListComponent();
  const networksComponent = createNetworksComponent();
  const exchangesComponent = createExchangesComponent();
  const investorsComponent = createInvestorsComponent();
  const filtersComponent = createFiltersComponent();
  const favoritesComponent = createFavoritesComponent();
  HOME_ICON.addEventListener('click', ()=> {
    USER_INTERFACE.innerHTML = '';
    USER_INTERFACE.appendChild(globalComponent)
  })
  CURRENCIES_BUTTON.addEventListener('click', ()=> {
    USER_INTERFACE.innerHTML = '';
    USER_INTERFACE.appendChild(currencyListComponent);
  })
  NETWORKS_BUTTON.addEventListener('click', ()=> {
    USER_INTERFACE.innerHTML = '';
    USER_INTERFACE.appendChild(networksComponent);
  })
  EXCHANGES_BUTTON.addEventListener('click', ()=> {
    USER_INTERFACE.innerHTML = '';
    USER_INTERFACE.appendChild(exchangesComponent);
  })
  INVESTORS_BUTTON.addEventListener('click', ()=> {
    USER_INTERFACE.innerHTML = '';
    USER_INTERFACE.appendChild(investorsComponent);
  })
  FILTERS_BUTTON.addEventListener('click', ()=> {
    USER_INTERFACE.innerHTML = '';
    USER_INTERFACE.appendChild(filtersComponent);
  })
  FAVORITES_BUTTON.addEventListener('click', ()=> {
    USER_INTERFACE.innerHTML = '';
    USER_INTERFACE.appendChild(favoritesComponent);
  })
};
