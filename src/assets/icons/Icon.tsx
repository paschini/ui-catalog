import type { IconProps } from './IconCommons.tsx';
import UDefault from './UDefault.tsx';
import GridView from './GridView.tsx';
import ListView from './ListView.tsx';
import Search from './Search.tsx';

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
