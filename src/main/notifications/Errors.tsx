import { createUseStyles } from 'react-jss';
import { ThemeProps } from '../../WebUnifiTheme.tsx';

const useStyles = createUseStyles((theme: ThemeProps) => ({
  errors: {
    width: 'max-content',
    alignSelf: 'center',
    justifyContent: 'right',
    margin: '20px 40px',
    color: theme.color.red
  }
}));

type Error = {
  code?: number;
  message: string;
};

type ErrorsProps = {
  errors: Error[];
};

const Errors = (props: ErrorsProps) => {
  const styles = useStyles();
  const { errors } = props;

  return (
    <div className={styles.errors}>
      {errors.map((error: Error) => error && <p>{`Error: -${error.code}- ${error.message}`}</p>)}
    </div>
  );
};

export default Errors;
