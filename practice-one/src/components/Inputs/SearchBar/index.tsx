import {
  useEffect,
  useRef,
  useState
} from 'react';

// Icons
import {
  MagnifyingGlass,
  Xmark
} from '@assets/icons';

// Components
import { Icon } from '@components/DataDisplay';
import { TextField } from '@components/Inputs';

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
}: SearchBarProps & { onChange: (value: string) => void }) => {
  const [isDismissSearchBar, setIsDismissSearchBar] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isDismissSearchBar && inputRef.current) inputRef.current.focus();
  }, [isDismissSearchBar]);

  const handleChange = (value: string) => onChange && onChange(value);

  const handleIconClick = () => {
    setIsDismissSearchBar(!isDismissSearchBar);
    if (isDismissSearchBar) handleChange('');
  };

  return (
    <div className="search">
      <label className={`text--primary ${isDismissSearchBar && 'hidden'}`}>{label}</label>
      {isDismissSearchBar &&
        <TextField
          autoFocus={true}
          placeholder={placeholder}
          onChange={handleChange}
        />
      }
      <div
        className={isDismissSearchBar ? 'search__close--icon' : 'search__magnifier--icon'}
        onClick={handleIconClick}
      >
        {isDismissSearchBar ? <Icon src={Xmark} /> : <Icon src={MagnifyingGlass} />}
      </div>
    </div>
  );
};

export default SearchBar;
