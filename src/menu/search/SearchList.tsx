import { useContext } from 'react';
import { createUseStyles } from 'react-jss';
import type { ThemeProps } from '../../WebUnifiTheme';
import { GlobalContext } from '../../globalContext';

const useStyles = createUseStyles((theme: ThemeProps) => ({
  listContainer: {
    display: 'flex',
    width: '320px',
    maxHeight: '50vh',
    position: 'relative',
    top: 0,
    backgroundColor: theme.color.natural,
    justifyContent: 'start',
    alignContent: 'center',
    flexDirection: 'column',
    borderRadius: theme.sizes.borderRadius,
    boxShadow: theme.boxShadow,
    lineHeight: theme.sizes.lineHeight,
    padding: theme.sizes.paddings.small,
    overflowX: 'hidden',
    overflowY: 'scroll',
    boxSizing: 'border-box',
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
    scrollbarColor: `${theme.color.neutral03Light} transparent`,
    '&': {
      colorScheme: 'dark', //forces the whiter colors in the scrollbar in Safari
      scrollbarColor: `${theme.color.neutral03Light} transparent`, // Firefox
      '&::-webkit-scrollbar': {
        width: '8px',
        backgroundColor: 'transparent'
      }
    },
    zIndex: 1000
  },
  listItem: {
    display: 'flex',
    width: '100%',
    height: '100%',
    paddingLeft: theme.sizes.paddings.medium,
    justifyContent: 'space-between',
    '&:hover': {
      backgroundColor: theme.color.neutral02,
      cursor: 'pointer'
    }
  },
  shrinkText: {
    width: '60%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textTransform: 'capitalize'
  },
  abbrev: {
    width: '20%',
    textAlign: 'right',
    paddingRight: theme.sizes.paddings.large,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.color.text3Light
  }
}));

export type Item = {
  id: string;
  name: string;
  abbrev: string;
  originalIndex: number;
};

type SearchListProps = {
  list?: Array<Item>;
  setSearchValue: (value: string) => void;
  setIsShowingList: (value: boolean) => void;
};

const SearchList = (props: SearchListProps) => {
  const styles = useStyles();
  const { list, setSearchValue, setIsShowingList } = props;

  const { globalDispatch } = useContext(GlobalContext);

  const clickItem = (name: string, index: number) => {
    setSearchValue(name);
    setIsShowingList(false);
    globalDispatch({ type: 'SET_ACTIVE_DEVICE', index });
    globalDispatch({ type: 'SET_ACTIVE_VIEW', payload: 'details' });
  };

  return (
    <div className={styles.listContainer}>
      {list?.map((item) => (
        <div key={item.id} className={styles.listItem} onClick={() => clickItem(item.name, item.originalIndex)}>
          <span className={styles.shrinkText}>{item.name}</span>
          <span className={styles.abbrev}>{item.abbrev}</span>
        </div>
      ))}
    </div>
  );
};

export default SearchList;
