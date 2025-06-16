import { IconProps } from './IconCommons.tsx';
import { theme } from '../../WebUnifiTheme.tsx';

interface ImgProps extends IconProps {
  width?: string;
  height?: string;
}

const Img = (props: ImgProps) => {
  const {
    backgroundFill = theme.color.natural,
    fill = theme.color.neutral02,
    className,
    width = '145',
    height = '119'
  } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 145 119"
      fill={'none'}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M0 119V59.5V0H145V119H0Z" fill={'none'} />
      <path
        d="M15.6 17C16.4 15.7 18.1 14 19.3 13.3C21 12.3 33.6 12 73.2 12C117.3 12 125.4 12.2 128 13.5C129.7 14.3 131.4 15.9 132 17C132.6 18.2 133 34.7 133 101L127.2 107H20L14 101V60.3C14 25.3 14.2 19.1 15.6 17Z"
        fill={fill}
      />
      <path
        d="M21.7999 60.2C21.6999 38.8 21.9999 21 22.4999 20.7C22.9999 20.3 46.0999 20.1 124.5 20.5L125 99H21.9999L21.7999 60.2Z"
        fill={backgroundFill}
      />
      <path
        d="M31.5 34C32.3 32.4 34.2 30.3 35.8 29.5C37.3 28.7 40.2 28.1 42.3 28C44.8 28 46.9 28.8 49 30.5C50.7 31.9 52.5 34.7 53.1 36.7C54 39.8 53.9 41.2 52.6 44.2C51.7 46.3 49.8 48.8 48.3 49.7C46.8 50.7 43.7 51.5 41.2 51.5C37.4 51.5 36.4 51 33.4 47.8C30.9 45 30 43.1 30 40.5C30 38.6 30.7 35.6 31.5 34Z"
        fill={fill}
      />
      <path
        d="M59.7 69C60.2 69 67.5 62 76 53.5L91.5 38L117 63.5V91H30V79.5L49.9 59.5L54.5 64.2C57 66.9 59.3 69 59.7 69Z"
        fill={fill}
      />
    </svg>
  );
};

export default Img;
