import SearchInput from './search/SearchInput.tsx';
import Count from '../components/Count.tsx';
import ListView from '../assets/icons/ListView.tsx';
import GridView from '../assets/icons/GridView.tsx';
import Filter from './filter/Filter.tsx';
import { createUseStyles } from 'react-jss';
import type { ThemeProps } from '../WebUnifiTheme.tsx';
import { useContext } from 'react';
import { GlobalContext } from '../globalContext.tsx';

const useStyles = createUseStyles((theme: ThemeProps) => ({
  menuContainer: {
    gridArea: 'menu',
    display: 'flex',
    maxWidth: '95vw',
    margin: 0,
    padding: '20px 40px 20px 40px',
    backgroundColor: theme.color.natural,
    justifyContent: 'space-between'
  },
  leftContainer: {
    display: 'flex',
    maxWidth: '40%'
  },
  rightContainer: {
    display: 'flex',
    maxWidth: 'min-content',
    alignSelf: 'center'
  },
  iconPlacement: {
    alignSelf: 'center'
  }
}));

const DefaultMenu = () => {
  const styles = useStyles();

  const {
    globalState: { activeView, deviceList, filteredDeviceList },
    globalDispatch
  } = useContext(GlobalContext);

  return (
    <div className={styles.menuContainer}>
      <div className={styles.leftContainer} style={{ width: '60%' }}>
        <SearchInput />
        <Count total={filteredDeviceList.length > 0 ? filteredDeviceList.length : deviceList.length} />
      </div>
      <div className={styles.rightContainer}>
        <ListView
          className={styles.iconPlacement}
          isActive={activeView === 'list'}
          onClick={() => globalDispatch({ type: 'SET_ACTIVE_VIEW', payload: 'list' })}
        />
        <GridView
          className={styles.iconPlacement}
          isActive={activeView === 'grid'}
          onClick={() => globalDispatch({ type: 'SET_ACTIVE_VIEW', payload: 'grid' })}
        />
        <Filter />
      </div>
    </div>
  );
};

export default DefaultMenu;
