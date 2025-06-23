import { createUseStyles } from 'react-jss';
import type { ThemeProps } from '../WebUnifiTheme';
import UDefault from '../assets/icons/UDefault';
import { useContext } from 'react';
import { GlobalContext } from '../globalContext';

const useStyles = createUseStyles((theme: ThemeProps) => ({
  headerContainer: {
    gridArea: 'header',
    width: '100vw',
    height: '52px',
    margin: 0,
    padding: '0',
    backgroundColor: theme.color.unifiNeutral02,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start'
  },
  breadcrumbs: {
    width: '60rem',
    height: '100%',
    alignContent: 'center',
    padding: 0
  },
  author: {
    paddingRight: '50px',
    width: '100%',
    height: '100%',
    alignContent: 'center',
    textAlign: 'right',
    padding: `0 ${theme.sizes.paddings.medium}`
  },
  pointer: {
    cursor: 'pointer'
  }
}));

const Header = () => {
  const styles = useStyles();

  const { globalDispatch } = useContext(GlobalContext);

  return (
    <div
      className={styles.headerContainer}
      onClick={() => {
        globalDispatch({ type: 'SET_ACTIVE_VIEW', payload: 'list' });
        globalDispatch({ type: 'SET_CHECKED_FILTER_ITEMS', payload: [] });
        globalDispatch({ type: 'SET_FILTERED_DEVICE_LIST', payload: [] });
      }}
    >
      <UDefault className={styles.pointer} />
      <span className={styles.breadcrumbs}>Devices</span>
      <span className={styles.author}>Author/Camila Paschini</span>
    </div>
  );
};

export default Header;
