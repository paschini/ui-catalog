import { useContext, useEffect } from 'react';
import Button from '../../components/Button.tsx';
import CheckBox from '../../components/CheckBox.tsx';
import { createUseStyles } from 'react-jss';
import type { ThemeProps } from '../../WebUnifiTheme.tsx';
import { GlobalContext } from '../../globalContext.tsx';

const useStyles = createUseStyles((theme: ThemeProps) => ({
  listContainer: {
    position: 'absolute',
    top: '105px',
    right: '28px',
    display: 'block',
    width: 'max-content',
    backgroundColor: theme.color.natural,
    borderRadius: theme.sizes.borderRadius,
    boxShadow: theme.boxShadow,
    lineHeight: theme.sizes.lineHeight,
    padding: theme.sizes.paddings.medium
  },
  title: {
    margin: 0,
    lineHeight: theme.sizes.lineHeight
  }
}));

const FilterList = () => {
  const styles = useStyles();

  const {
    globalState: { deviceList, filteredDeviceList, checkedFilterItems },
    globalDispatch
  } = useContext(GlobalContext);

  const list = [
    { id: 'unifi', name: 'UniFi' },
    { id: 'unifi lte', name: 'UniFi LTE' },
    { id: 'unifi protect', name: 'UniFi Protect' },
    { id: 'unifi access', name: 'UniFi Access' },
    { id: 'airmax', name: 'AirMax' },
    { id: 'edgemax', name: 'EdgeMax' }
  ];

  const changeCheckBoxes = (id: string) => {
    if (checkedFilterItems.includes(id)) {
      globalDispatch({ type: 'SET_CHECKED_FILTER_ITEMS', payload: checkedFilterItems.filter((item) => item !== id) });
    } else {
      globalDispatch({ type: 'SET_CHECKED_FILTER_ITEMS', payload: [...checkedFilterItems, id] });
    }
  };

  useEffect(() => {
    if (checkedFilterItems.length > 0) {
      const filteredList = deviceList
        .filter((device) => {
          return checkedFilterItems.includes(device.line.name.toLowerCase());
        })
        .sort((a, b) => a.line.name.localeCompare(b.line.name));

      globalDispatch({ type: 'SET_FILTERED_DEVICE_LIST', payload: filteredList });
    }
  }, [checkedFilterItems, deviceList, globalDispatch]);

  return (
    <div className={styles.listContainer}>
      <h4 className={styles.title}>Product Line</h4>
      {list.map((item) => (
        <div key={item.id}>
          <CheckBox
            id={item.id}
            label={item.name}
            isChecked={checkedFilterItems.includes(item.id)}
            onChange={() => changeCheckBoxes(item.id)}
          />
        </div>
      ))}
      <Button
        onClick={() => {
          globalDispatch({ type: 'SET_CHECKED_FILTER_ITEMS', payload: [] });
          globalDispatch({ type: 'SET_FILTERED_DEVICE_LIST', payload: [] });
        }}
        type={'danger'}
        disabled={filteredDeviceList.length === 0}
      >
        Reset
      </Button>
    </div>
  );
};

export default FilterList;
