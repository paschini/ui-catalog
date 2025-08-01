import type { IconProps } from './IconCommons';
import { type ThemeProps } from '../../WebUnifiTheme';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: ThemeProps) => ({
  icon: {
    width: '50px',
    height: '50px',
    flexShrink: 0,
    boxSizing: 'border-box',
    border: '1px solid transparent',
    backgroundColor: 'transparent',
    outline: 'none',
    fill: theme.color.text2,
    '&:hover': {
      border: `1px solid ${theme.color.natural}`,
      fill: theme.color.ublue06,
      backgroundColor: theme.color.natural
    },
    '&:focus': {
      backgroundColor: theme.color.neutral02,
      fill: theme.color.text2,
      border: `1px solid ${theme.color.ublue06}`
    },
    '&:active': {
      backgroundColor: theme.color.neutral02,
      fill: theme.color.text2,
      border: `1px solid ${theme.color.ublue06}`
    }
  }
}));

const UDefault = (props: IconProps) => {
  const styles = useStyles();
  const { backgroundFill = 'transparent', className } = props;

  return (
    <svg
      className={className ? `${styles.icon} ${className}` : styles.icon}
      width={20}
      height={20}
      viewBox={'0 0 50 50'}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={50} height={50} fill={`${backgroundFill}`} />
      <path d="M34.3747 15H33.1249V16.2498H34.3747V15Z" />
      <path d="M30.0015 23.7532V21.2491L30.0022 21.2498H32.5011V23.7494H35V24.5417C35 25.4575 34.9221 26.5426 34.7431 27.3948C34.6428 27.871 34.4908 28.3443 34.3126 28.7989C34.1298 29.2639 33.9194 29.7094 33.6903 30.1086C33.3915 30.6298 33.0455 31.13 32.6442 31.6003L32.6229 31.6251L32.588 31.666C32.4916 31.7791 32.3962 31.891 32.2915 32.0001C32.1694 32.1304 32.0428 32.254 31.914 32.3776C30.3145 33.9179 28.2305 34.8802 26.0514 35.1011C25.7893 35.128 25.2628 35.1558 25 35.1558C24.7364 35.155 24.2107 35.128 23.9486 35.1011C21.7695 34.8802 19.6855 33.9172 18.086 32.3776C17.9572 32.254 17.8306 32.1304 17.7085 32.0001C17.5986 31.8862 17.4994 31.7694 17.3992 31.6513L17.3988 31.6509L17.3558 31.6003C16.9545 31.13 16.6085 30.6298 16.3097 30.1086C16.0806 29.7087 15.8701 29.2639 15.6874 28.7989C15.5092 28.3443 15.3572 27.871 15.2568 27.3948C15.0779 26.5419 15 25.4575 15 24.5417V15.1565H19.9985V23.7532C19.9985 23.7532 19.9985 24.4122 20.0067 24.6278L20.0086 24.6781V24.6784C20.0191 24.9574 20.0294 25.2306 20.0584 25.5025C20.1408 26.2745 20.3115 27.0069 20.6635 27.6262C20.7653 27.8051 20.8687 27.9789 20.9922 28.1436C21.744 29.1463 22.8883 29.8989 24.3156 30.1086C24.4855 30.1333 24.8285 30.155 25 30.155C25.1715 30.155 25.5144 30.1333 25.6844 30.1086C27.1117 29.8989 28.256 29.1463 29.0078 28.1436C29.1321 27.9789 29.2347 27.8051 29.3365 27.6262C29.6885 27.0069 29.8592 26.2745 29.9416 25.5025C29.9706 25.2301 29.9809 24.9563 29.9914 24.6769L29.9933 24.6278C30.0015 24.4122 30.0015 23.7532 30.0015 23.7532Z" />
      <path d="M30.6253 16.8751H32.5004L32.5004 18.7494H35V21.2491H32.5004L32.5004 18.7502H30.6253V16.8751Z" />
    </svg>
  );
};

export default UDefault;
