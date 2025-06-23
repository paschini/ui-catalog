import type { ReactNode } from 'react';
import { createUseStyles } from 'react-jss';
import type { ThemeProps } from '../WebUnifiTheme';
import { WebUnifiColors } from '../WebUnifiColors';

const useStyles = createUseStyles((theme: ThemeProps) => ({
  button: {
    width: 'max-content',
    padding: '5px 5px 5px 5px',
    borderRadius: theme.sizes.borderRadius,
    boxSizing: 'border-box',
    border: '1px solid transparent',
    backgroundColor: 'transparent',
    outline: 'none',
    color: theme.color.black45,
    fontSize: theme.fontSize,
    '&:hover': {
      backgroundColor: theme.color.neutral02,
      border: `1px solid ${theme.color.neutral02}`
    },
    '&:focus': {
      backgroundColor: 'transparent',
      border: `1px solid ${theme.color.ublue06}`
    },
    '&:active': {
      backgroundColor: theme.color.neutral01,
      border: `1px solid ${theme.color.neutral01}`,
      color: theme.color.ublue06
    }
  },
  active: {
    backgroundColor: theme.color.neutral01,
    border: `1px solid ${theme.color.neutral01}`,
    color: theme.color.ublue06
  },
  danger: {
    width: 'max-content',
    padding: '5px 5px 5px 5px',
    borderRadius: theme.sizes.borderRadius,
    boxSizing: 'border-box',
    border: '1px solid transparent',
    backgroundColor: 'transparent',
    outline: 'none',
    fontSize: theme.fontSize,
    color: theme.color.red,
    '&:disabled': {
      color: theme.color.red3
    }
  },
  shadowed: {
    width: 'max-content',
    padding: '5px 5px 5px 5px',
    borderRadius: theme.sizes.borderRadius,
    boxSizing: 'border-box',
    border: '1px solid transparent',
    backgroundColor: theme.color.natural,
    color: theme.color.black45,
    outline: 'none',
    fontSize: theme.fontSize,
    boxShadow: `0 0 25px 10px ${WebUnifiColors.neutral02}`,
    '&:hover': {
      backgroundColor: theme.color.neutral02,
      border: `1px solid ${theme.color.neutral02}`
    },
    '&:focus': {
      backgroundColor: 'transparent',
      border: `1px solid ${theme.color.ublue06}`
    },
    '&:active': {
      backgroundColor: theme.color.neutral01,
      border: `1px solid ${theme.color.neutral01}`,
      color: theme.color.ublue06
    }
  }
}));

type ButtonProps = {
  type?: 'danger' | 'shadowed' | 'button';
  isActive?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick: () => void;
};

const Button = (props: ButtonProps) => {
  const styles = useStyles();
  const { type, isActive, disabled, children, onClick } = props;

  return (
    <button
      onClick={onClick}
      className={
        (type?.length || 0) > 0
          ? styles[type || 'button']
          : isActive
            ? `${styles.button} ${styles.active}`
            : styles.button
      }
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
