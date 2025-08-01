import { useContext } from 'react';
import { createUseStyles } from 'react-jss';
import type { ThemeProps } from '../../WebUnifiTheme';
import { GlobalContext } from '../../globalContext';

const useStyles = createUseStyles((theme: ThemeProps) => ({
  errors: {
    width: 'max-content',
    alignSelf: 'center',
    justifyContent: 'right',
    margin: '20px 40px',
    color: theme.color.red
  }
}));

export type Error = {
  code?: number;
  message: string;
};

const Errors = () => {
  const styles = useStyles();
  const {
    globalState: { errors }
  } = useContext(GlobalContext);

  return (
    <div className={styles.errors}>
      {errors.map(
        (error: Error, index: number) =>
          error && <p key={`error-${index}`}>{`Error: -${error.code}- ${error.message}`}</p>
      )}
    </div>
  );
};

export default Errors;
