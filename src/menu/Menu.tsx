import { useContext } from 'react';
import { GlobalContext } from '../globalContext.tsx';
import DefaultMenu from './DefaultMenu.tsx';
import DetailsMenu from './DetailsMenu.tsx';

const Menu = () => {
  const {
    globalState: { activeView }
  } = useContext(GlobalContext);

  return activeView === 'details' ? <DetailsMenu /> : <DefaultMenu />;
};

export default Menu;
