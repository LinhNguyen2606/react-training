import {
  useEffect,
  useRef,
  useState
} from 'react';

// Components
import { TextField, Icons } from '@components';

// SCSS
import '@components/SearchBar/SearchBar.scss';

// Icons
import { MagnifyingGlass, Xmark } from '@assets/icons';

interface SearchbarProps {
  label?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const Searchbar = ({
  label,
  placeholder,
  onChange
}: SearchbarProps) => {
  const [dismissSearchBar, setDismissSearchBar] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dismissSearchBar && inputRef.current) inputRef.current.focus();
  }, [dismissSearchBar]);

  const handleChange = (value: string) => onChange && onChange(value);

  const handleIconClick = () => {
    setDismissSearchBar(!dismissSearchBar);
    if (dismissSearchBar) handleChange('');
  };

  return (
    <div className="search">
      <label
        className="text--primary"
        style={{ display: `${dismissSearchBar ? 'none' : ''}` }}
      >
        {label}
      </label>
      {dismissSearchBar && (
        <TextField
          autoFocus={true}
          placeholder={placeholder}
          onChange={handleChange}
        />
      )}
      <div onClick={handleIconClick}>
        {dismissSearchBar ? (
          <Icons src={Xmark} />
        ) : (
          <Icons src={MagnifyingGlass} />
        )}
      </div>
    </div>
  );
};

export default Searchbar;
