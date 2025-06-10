import SearchList from './SearchList.tsx';
import Input from '../../components/Input.tsx';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isShowingList, setIsShowingList] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const items = [
    { id: '1', name: 'Device 1', category: 'DEV' },
    { id: '2', name: 'Device 2', category: 'DEV' }
  ];

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
    setIsShowingList(event.currentTarget.value.length > 0);
  };

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
      <Input icon={'Search'} value={searchValue} onChange={handleSearch} />
      {isShowingList && <SearchList list={items} />}
    </div>
  );
};

export default SearchInput;
