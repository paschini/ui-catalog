import Button from '../../components/Button.tsx';
import { useEffect, useRef, useState } from 'react';
import FilterList from './FilterList.tsx';

const Filter = () => {
  const [isShowingList, setIsShowingList] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    console.log(e.target);
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsShowingList(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, []);

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
