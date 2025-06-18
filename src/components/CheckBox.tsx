import { createUseStyles } from 'react-jss';
import type { ThemeProps } from '../WebUnifiTheme.tsx';

const useStyles = createUseStyles((theme: ThemeProps) => ({
  ['.container:hover input ~ .checkmark']: {
    backgroundColor: theme.color.neutral02
  },
  container: {
    display: 'block',
    position: 'relative',
    paddingLeft: '35px',
    '& input[type="checkbox"]': {
      position: 'absolute',
      opacity: 0,
      cursor: 'pointer',
      height: 0,
      width: 0
    },
    '&:hover input ~ span': {
      backgroundColor: theme.color.neutral02
    },
    '& input:checked ~ span': {
      backgroundColor: theme.color.ublue06
    },
    '& input:checked ~ span:after': {
      display: 'block'
    },
    '& span:after': {
      left: '7px',
      bottom: '7px',
      width: '5px',
      height: '8px',
      border: `solid ${theme.color.natural}`,
      borderWidth: '0 1px 1px 0',
      transform: 'rotate(45deg)'
    }
  },
  checkmark: {
    position: 'absolute',
    top: '7px',
    left: 0,
    height: '20px',
    width: '20px',
    backgroundColor: theme.color.natural,
    borderRadius: theme.sizes.borderRadius,
    border: `1px solid ${theme.color.gray4}`,
    outline: 'none',

    '&:after': {
      content: '""',
      position: 'absolute',
      display: 'none'
    }
  }
}));

type CheckBoxProps = {
  id: string;
  label: string;
  onChange?: () => void;
  isChecked?: boolean;
};

const CheckBox = (props: CheckBoxProps) => {
  const styles = useStyles();
  const { id, label, isChecked, onChange } = props;

  return (
    <label htmlFor={id} className={styles.container}>
      {label}
      <input type="checkbox" id={id} name={id} checked={isChecked} onChange={onChange} />
      <span className={styles.checkmark} />
    </label>
  );
};

export default CheckBox;
