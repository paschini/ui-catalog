import { createUseStyles } from 'react-jss';
import type { ThemeProps } from '../WebUnifiTheme.tsx';
import UDefault from '../assets/icons/UDefault.tsx';

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
    padding: `0 ${theme.sizes.paddings.medium}`
  },
  author: {
    paddingRight: '50px',
    width: '20rem',
    height: '100%',
    alignContent: 'center',
    textAlign: 'right',
    padding: `0 ${theme.sizes.paddings.medium}`
  }
}));

const Header = () => {
  const styles = useStyles();

  return (
    <div className={styles.headerContainer}>
      <UDefault />
      {/* TODO: add breadcrumb text to context */}
      <span className={styles.breadcrumbs}>Devices</span>
      <span className={styles.author}>Author/Camila Paschini</span>
    </div>
  );
};

export default Header;
