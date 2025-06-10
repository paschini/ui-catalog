import { useState } from 'react';
import Button from '../../components/Button.tsx';
import CheckBox from '../../components/CheckBox.tsx';
import { createUseStyles } from 'react-jss';
import type { ThemeProps } from '../../WebUnifiTheme.tsx';

const useStyles = createUseStyles((theme: ThemeProps) => ({
  listContainer: {
    position: 'absolute',
    top: '100px',
    right: '40px',
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

  const list = [
    { id: '1', name: 'UniFi' },
    { id: '2', name: 'UniFi LTE' },
    { id: '3', name: 'UniFi Protect' },
    { id: '4', name: 'UniFi Access' },
    { id: '5', name: 'AirMax' },
    { id: '6', name: 'EdgeMax' }
  ];

  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  return (
    <div className={styles.listContainer}>
      <h4 className={styles.title}>Product Line</h4>
      {list.map((item) => (
        <div key={item.id}>
          <CheckBox
            id={item.id}
            label={item.name}
            isChecked={checkedItems.includes(item.id)}
            onChange={() => {
              if (checkedItems.includes(item.id)) {
                setCheckedItems(checkedItems.filter((id) => id !== item.id));
              } else {
                setCheckedItems([...checkedItems, item.id]);
              }
            }}
          />
        </div>
      ))}
      <Button
        onClick={() => {
          setCheckedItems([]);
        }}
        type={'danger'}
        disabled={checkedItems.length < 1}
      >
        Reset
      </Button>
    </div>
  );
};

export default FilterList;
