import { useContext, useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import SearchList from './SearchList';
import type { Item } from './SearchList';
import Input from '../../components/Input';
import { useClickOutside } from '../../components/useClickOutside';
import { GlobalContext } from '../../globalContext';

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState('');
  const [itemsList, setItemsList] = useState<Item[]>();
  const [isShowingList, setIsShowingList] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const {
    globalState: { deviceList = [], filteredDeviceList = [] }
  } = useContext(GlobalContext);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
    setIsShowingList(event.currentTarget.value.length > 0);
  };

  useClickOutside(ref, () => setIsShowingList(false));

  useEffect(() => {
    const usableList = filteredDeviceList.length > 0 ? filteredDeviceList : deviceList;

    const list = usableList
      .filter(
        (device) =>
          device.product.name.toLowerCase().includes(searchValue) ||
          device.product.abbrev.toLowerCase().includes(searchValue)
      )
      .sort((a, b) => a.product.name.localeCompare(b.product.name))
      .map((device) => {
        return {
          id: device.id,
          name: device.product.name,
          abbrev: device.product.abbrev,
          originalIndex: deviceList.indexOf(device)
        };
      });

    setItemsList(list);
  }, [deviceList, searchValue, filteredDeviceList]);

  return (
    <div ref={ref}>
      <Input icon={'Search'} value={searchValue} onChange={handleSearch} />
      {isShowingList && (
        <SearchList list={itemsList} setSearchValue={setSearchValue} setIsShowingList={setIsShowingList} />
      )}
    </div>
  );
};

export default SearchInput;
