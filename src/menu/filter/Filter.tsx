import { useRef, useState } from 'react';
import Button from '../../components/Button';
import FilterList from './FilterList';
import { useClickOutside } from '../../components/useClickOutside';

const Filter = () => {
  const [isShowingList, setIsShowingList] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsShowingList(false));

  return (
    <div ref={ref}>
      {isShowingList && <FilterList />}
      <Button onClick={() => setIsShowingList(!isShowingList)} isActive={isShowingList}>
        Filter
      </Button>
    </div>
  );
};

export default Filter;
