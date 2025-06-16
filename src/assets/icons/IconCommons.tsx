import { createUseStyles } from 'react-jss';
import type { ThemeProps } from '../../WebUnifiTheme.tsx';

export type IconProps = {
  name?: string;
  fill?: string;
  backgroundFill?: string;
  stroke?: string;
  className?: string;
  isActive?: boolean;
  onClick?: () => void;
};

export const iconStyles = createUseStyles((theme: ThemeProps) => ({
  icon: {
    width: '33px',
    height: '33px',
    padding: '5px 5px 5px 5px',
    borderRadius: theme.sizes.borderRadius,
    boxSizing: 'border-box',
    border: '1px solid transparent',
    backgroundColor: 'transparent',
    outline: 'none',
    fill: theme.color.neutral08,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.color.neutral02,
      border: `1px solid ${theme.color.neutral02}`
    },
    '&:focus': {
      backgroundColor: theme.color.neutral02,
      border: `1px solid ${theme.color.ublue06}`
    },
    '&:active': {
      backgroundColor: theme.color.neutral01,
      border: `1px solid ${theme.color.neutral01}`,
      fill: theme.color.ublue06
    }
  },
  active: {
    backgroundColor: theme.color.neutral01,
    border: `1px solid ${theme.color.neutral01}`,
    fill: theme.color.ublue06
  }
}));
