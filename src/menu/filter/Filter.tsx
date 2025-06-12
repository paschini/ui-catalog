import Button from '../../components/Button.tsx';
import { useRef, useState } from 'react';
import FilterList from './FilterList.tsx';
import { useClickOutside } from '../../components/useClickOutside.ts';

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
