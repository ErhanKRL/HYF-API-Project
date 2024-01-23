import {
  USER_INTERFACE,
  HOME_ICON,
  NAV_HOME_BUTTON,
  CURRENCIES_BUTTON,
  CATEGORIES_BUTTON,
  GOTO_TOP_BUTTON,
} from '../elementSelector';
import { createGlobalComponent } from '../components/globalComponent';
import { createCurrencyListComponent } from '../components/listComponent';
import { createCategoriesComponent } from '../components/categoriesComponent';

export const initMainPage = async () => {
    window.addEventListener('scroll', showGoToTopButton);
    await renderHomePage()
    HOME_ICON.addEventListener('click', async () => {
      await renderHomePage()
    });
    NAV_HOME_BUTTON.addEventListener('click', async () => {
      await renderHomePage()
    });
    CURRENCIES_BUTTON.addEventListener('click', async () => {
     renderCurrenciesPage(1);
    });
    CATEGORIES_BUTTON.addEventListener('click', async () => {
      renderCategoriesPage(1);
    });
  
    GOTO_TOP_BUTTON.addEventListener('click', goToTop);
};

const renderHomePage = async () => {
  USER_INTERFACE.innerHTML = '';
  try{
    const globalComponent = await createGlobalComponent();
    USER_INTERFACE.appendChild(globalComponent);
  }catch (error){
    console.log(error);
  } 
}

const renderCurrenciesPage = async (page) => {
  USER_INTERFACE.innerHTML = '';
  try{
    const currencyListComponent = await createCurrencyListComponent(
      page,
      (start) => {
        renderCurrenciesPage(start);
      }
    );
    USER_INTERFACE.appendChild(currencyListComponent);
  }catch(error){
    console.log('list error', error)
  }
};

const renderCategoriesPage = async (page) => {
  USER_INTERFACE.innerHTML = '';
  try{
  const categoryListComponent = await createCategoriesComponent(
    page,
    (start) => {
      renderCategoriesPage(start);
    }
  );
  USER_INTERFACE.appendChild(categoryListComponent);
  }catch(error) {
    console.log('categories error', error)
  }
  
};

const goToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const showGoToTopButton = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    GOTO_TOP_BUTTON.style.display = 'block';
  } else {
    GOTO_TOP_BUTTON.style.display = 'none';
  }
};
