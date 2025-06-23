import { useContext } from 'react';
import { createUseStyles } from 'react-jss';
import type { ThemeProps } from '../WebUnifiTheme';
import Button from '../components/Button';
import ArrowLeftPrimary from '../assets/icons/ArrowLeftPrimary';
import ArrowRightPrimary from '../assets/icons/ArrowRightPrimary';
import { GlobalContext } from '../globalContext';

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
    width: '70px',
    alignSelf: 'center',
    justifyContent: 'space-between'
  },
  iconPlacement: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonTextPlacement: {
    paddingRight: theme.sizes.paddings.small
  }
}));

const DetailsMenu = () => {
  const styles = useStyles();

  const {
    globalState: { previousView, activeDeviceIndex, deviceList },
    globalDispatch
  } = useContext(GlobalContext);

  return (
    <div className={styles.menuContainer}>
      <div className={styles.leftContainer}>
        <Button
          onClick={() => {
            globalDispatch({ type: 'SET_ACTIVE_VIEW', payload: previousView });
          }}
          type={'shadowed'}
        >
          <div className={styles.iconPlacement}>
            <ArrowLeftPrimary />
            <span className={styles.buttonTextPlacement}>Back</span>
          </div>
        </Button>
      </div>

      <div className={styles.rightContainer}>
        <Button
          onClick={() =>
            globalDispatch({ type: 'SET_ACTIVE_DEVICE', index: activeDeviceIndex - 1 < 0 ? 0 : activeDeviceIndex - 1 })
          }
          type={'shadowed'}
        >
          <div className={styles.iconPlacement}>
            <ArrowLeftPrimary />
          </div>
        </Button>

        <Button
          onClick={() =>
            globalDispatch({
              type: 'SET_ACTIVE_DEVICE',
              index: activeDeviceIndex + 1 >= deviceList.length - 1 ? deviceList.length - 1 : activeDeviceIndex - 1
            })
          }
          type={'shadowed'}
        >
          <div className={styles.iconPlacement}>
            <ArrowRightPrimary />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default DetailsMenu;
