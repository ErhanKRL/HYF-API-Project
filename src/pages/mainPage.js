import {
  USER_INTERFACE,
  HOME_ICON,
  CURRENCIES_BUTTON,
  CATEGORIES_BUTTON,
  GOTO_TOP_BUTTON,
} from '../elementSelector';
import { createGlobalComponent } from '../components/globalComponent';
import { createCurrencyListComponent } from '../components/listComponent';
import { createCategoriesComponent } from '../components/categoriesComponent';

export const initMainPage = async () => {
  window.addEventListener("scroll", showGoToTopButton);
  USER_INTERFACE.innerHTML = '';
  const globalComponent = await createGlobalComponent();
  USER_INTERFACE.appendChild(globalComponent);
  HOME_ICON.addEventListener('click', () => {
    USER_INTERFACE.innerHTML = '';
    USER_INTERFACE.appendChild(globalComponent);
  });
  CURRENCIES_BUTTON.addEventListener('click', () => {
    renderCurrenciesPage(1);
  });
  CATEGORIES_BUTTON.addEventListener('click', () => {
    renderCategoriesPage(1)
  });

  GOTO_TOP_BUTTON.addEventListener('click', goToTop)
};

const renderCurrenciesPage = async (page) => {
  USER_INTERFACE.innerHTML = '';
  const currencyListComponent = await createCurrencyListComponent(page, (start) => {
    renderCurrenciesPage(start);
  });
  USER_INTERFACE.appendChild(currencyListComponent);
}

const renderCategoriesPage = async (page) => {
  USER_INTERFACE.innerHTML = '';
  const categoryListComponent = await createCategoriesComponent(page, (start) => {
    renderCategoriesPage(start);
  });
  USER_INTERFACE.appendChild(categoryListComponent);
}

const goToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const showGoToTopButton = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    GOTO_TOP_BUTTON.style.display = "block";
  } else {
    GOTO_TOP_BUTTON.style.display = "none";
  }
};
