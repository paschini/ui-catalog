import type { ChangeEvent, ReactNode } from 'react';
import { createUseStyles } from 'react-jss';
import type { ThemeProps } from '../WebUnifiTheme.tsx';
import Icon from '../assets/icons/Icon.tsx';

const useStyles = createUseStyles((theme: ThemeProps) => ({
  input: {
    width: '320px',
    height: '36px',
    lineHeight: '32px',
    paddingLeft: '30px',
    fontSize: theme.fontSize,
    boxSizing: 'border-box',
    borderRadius: theme.sizes.borderRadius,
    border: `1px solid ${theme.color.neutral02}`,
    outline: 'none',
    color: theme.color.text1,
    backgroundColor: theme.color.neutral02,
    '::placeholder': {
      color: theme.color.black45
    },
    '&:hover': {
      backgroundColor: theme.color.neutral03Light,
      border: `1px solid ${theme.color.neutral03Light}`
    },
    '&:focus': {
      backgroundColor: theme.color.neutral02,
      border: `1px solid ${theme.color.ublue06}`
    },
    '&:active': {
      backgroundColor: theme.color.neutral02,
      border: `1px solid ${theme.color.ublue06}`
    }
  },
  icon: {
    position: 'relative',
    right: 'calc(100% - 25px)',
    top: '6px'
  }
}));

type InputProps = {
  icon?: string;
  value?: string;
  onChange?: (_: ChangeEvent<HTMLInputElement>) => void;
  children?: ReactNode;
};

const Input = (props: InputProps) => {
  const styles = useStyles();
  const { icon, value, onChange } = props;

  return (
    <>
      <input type="text" placeholder={'Search'} value={value} className={styles.input} onChange={onChange} />
      <Icon name={icon} className={styles.icon} />
    </>
  );
};

export default Input;
