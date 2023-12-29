import { useState } from 'react';

// Icons
import { MagnifyingGlass, Xmark } from '@assets/icons';

// Components
import { Icon } from '@components/DataDisplay';
import TextField from '@components/Inputs/TextField';

// SCSS
import '@components/Inputs/SearchBar/Searchbar.scss';

type SearchBarProps = {
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
};

const SearchBar = ({
  label,
  placeholder,
  onChange
}: SearchBarProps) => {
  const [isDismissSearchBar, setIsDismissSearchBar] = useState(false);

  return (
    <div className="search">
      <label className={`primary__text ${isDismissSearchBar && 'hidden'}`}>{label}</label>
      {isDismissSearchBar && <TextField placeholder={placeholder} onChange={onChange} />}
      <div
        className={isDismissSearchBar ? 'search__close--icon' : 'search__magnifier--icon'}
        onClick={() => setIsDismissSearchBar(!isDismissSearchBar)}
      >
        {isDismissSearchBar ? <Icon src={ Xmark} /> : <Icon src={ MagnifyingGlass}/>}
      </div>
    </div>
  );
};

export default SearchBar;
