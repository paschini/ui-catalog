import SearchList from './SearchList.tsx';
import Input from '../../components/Input.tsx';
import { ChangeEvent, useRef, useState } from 'react';
import { useClickOutside } from '../../components/useClickOutside.ts';

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

  useClickOutside(ref, () => setIsShowingList(false));

  return (
    <div ref={ref}>
      <Input icon={'Search'} value={searchValue} onChange={handleSearch} />
      {isShowingList && <SearchList list={items} />}
    </div>
  );
};

export default SearchInput;
