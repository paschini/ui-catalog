import { useContext } from 'react';
import { GlobalContext } from '../globalContext';
import DefaultMenu from './DefaultMenu';
import DetailsMenu from './DetailsMenu';

const Menu = () => {
  const {
    globalState: { activeView }
  } = useContext(GlobalContext);

  return activeView === 'details' ? <DetailsMenu /> : <DefaultMenu />;
};

export default Menu;
