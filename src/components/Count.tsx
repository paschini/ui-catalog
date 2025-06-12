import { createUseStyles } from 'react-jss';
import type { ThemeProps } from '../WebUnifiTheme.tsx';

const useStyles = createUseStyles((theme: ThemeProps) => ({
  text: {
    padding: '10px',
    minWidth: '5rem',
    color: theme.color.gray4
  }
}));

type CountProps = {
  total: number;
};

const Count = (props: CountProps) => {
  const styles = useStyles();
  const { total } = props;

  return (
    <div className={styles.text}>{total === 1 ? <span>{`${total} item`}</span> : <span>{`${total} items`}</span>}</div>
  );
};

export default Count;
