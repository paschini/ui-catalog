import type { IconProps } from './IconCommons.tsx';
import UDefault from './UDefault';
import GridView from './GridView';
import ListView from './ListView';
import Search from './Search';

const Icon = (props: IconProps) => {
  switch (props.name) {
    case 'GridView':
      return <GridView {...props} />;
    case 'ListView':
      return <ListView {...props} />;
    case 'Search':
      return <Search {...props} />;
    case 'UDefault':
      return <UDefault {...props} />;
    default:
      return null;
  }
};

export default Icon;
