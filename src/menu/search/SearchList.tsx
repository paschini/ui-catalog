import { createUseStyles } from 'react-jss';
import type { ThemeProps } from '../../WebUnifiTheme.tsx';

const useStyles = createUseStyles((theme: ThemeProps) => ({
  listContainer: {
    display: 'flex',
    width: '93%',
    position: 'relative',
    top: '-20px',
    backgroundColor: theme.color.natural,
    justifyContent: 'start',
    alignContent: 'center',
    flexDirection: 'column',
    borderRadius: theme.sizes.borderRadius,
    boxShadow: theme.boxShadow,
    lineHeight: theme.sizes.lineHeight,
    padding: theme.sizes.paddings.small,
    zIndex: 1000
  },
  listItem: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between'
  }
}));

type Item = {
  id: string;
  name: string;
  category: string;
};

type SearchListProps = {
  list: Array<Item>;
};

const SearchList = (props: SearchListProps) => {
  const styles = useStyles();
  const { list } = props;

  return (
    <div className={styles.listContainer}>
      {list.map((item) => (
        <div key={item.id} className={styles.listItem}>
          <span>{item.name}</span>
          <span>{item.category}</span>
        </div>
      ))}
    </div>
  );
};

export default SearchList;
