import { iconStyles } from './IconCommons';
import type { IconProps } from './IconCommons';

const GridView = (props: IconProps) => {
  const styles = iconStyles();
  const { className, isActive, onClick } = props;

  return (
    <svg
      onClick={onClick}
      className={
        className
          ? `${styles.icon} ${className} ${isActive && styles.active}`
          : `${styles.icon} ${isActive && styles.active}`
      }
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 8.5V4H4V8.5H8.5ZM4 3H8.5C9.052 3 9.5 3.448 9.5 4V8.5C9.5 9.052 9.052 9.5 8.5 9.5H4C3.448 9.5 3 9.052 3 8.5V4C3 3.448 3.448 3 4 3ZM8.5 16V11.5H4V16H8.5ZM4 10.5H8.5C9.052 10.5 9.5 10.948 9.5 11.5V16C9.5 16.552 9.052 17 8.5 17H4C3.448 17 3 16.552 3 16V11.5C3 10.948 3.448 10.5 4 10.5ZM16 4V8.5H11.5V4H16ZM16 3H11.5C10.948 3 10.5 3.448 10.5 4V8.5C10.5 9.052 10.948 9.5 11.5 9.5H16C16.552 9.5 17 9.052 17 8.5V4C17 3.448 16.552 3 16 3ZM16 16V11.5H11.5V16H16ZM11.5 10.5H16C16.552 10.5 17 10.948 17 11.5V16C17 16.552 16.552 17 16 17H11.5C10.948 17 10.5 16.552 10.5 16V11.5C10.5 10.948 10.948 10.5 11.5 10.5Z"
      />
    </svg>
  );
};

export default GridView;
