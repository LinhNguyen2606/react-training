import { useState } from 'react';

// Component
import TextField from '../TextField';

// SCSS
import './Searchbar.scss';

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox={isDismissSearchBar ? '0 0 384 512' : '0 0 512 512'}
        >
          <path
            d={
              isDismissSearchBar
                ? 'M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z'
                : 'M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z'
            }
          />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
