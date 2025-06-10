import { ColorProps, WebUnifiColors } from './WebUnifiColors';

export type WebUnifiSizes = {
  borderRadius: string;
  lineHeight: string;
  icon: {
    medium: {
      width: string;
      height: string;
    };
    small: {
      width: string;
      height: string;
    };
  };
  paddings: {
    small: string;
    medium: string;
    large: string;
  };
};

export type ThemeProps = {
  color: ColorProps;
  fontFamily: string;
  fontSize: string;
  sizes: WebUnifiSizes;
  boxShadow: string;
};

export const theme: ThemeProps = {
  color: WebUnifiColors,
  fontFamily: 'Lato, Roboto, Helvetica, sans-serif',
  fontSize: '14px',
  sizes: {
    borderRadius: '4px',
    lineHeight: '36px',
    icon: {
      medium: {
        width: '50px',
        height: '50px'
      },
      small: {
        width: '20px',
        height: '20px'
      }
    },
    paddings: {
      small: '10px',
      medium: '20px',
      large: '30px'
    }
  },
  boxShadow: `0 20px 20px 20px ${WebUnifiColors.neutral02}`
};
