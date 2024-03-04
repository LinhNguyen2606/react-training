import {
  useContext,
  useMemo,
  useState
} from 'react';

// Components
import { SearchBar, Table } from '@components';
import { DrawerPosition } from '@components/Drawer';

// Helper
import { highlightKeyword } from '@helpers';

// Interfaces
import { EnitityColumn, Rule } from '@interfaces';

// Service
import { getRules } from '@services';

// Context
import { Context } from '@stores';

/**
 * Defines the columns configuration for the rule table.
 * @param {string} searchKeyword The keyword rule for highlighting in the table.
 * @returns {Array<EnitityColumn<Rule>>} The array of column configurations.
 */
const generateRuleableColumns = (
  searchKeyword: string
): EnitityColumn<Rule>[] => {
  return [
    {
      key: '',
      title: '',
    },
    {
      key: 'name',
      title: 'Name',
      render: (_, item) => (
        <span
          dangerouslySetInnerHTML={{
            __html: highlightKeyword(item.name, searchKeyword),
          }}
        />
      ),
    },
    {
      key: '',
      title: '',
    },
    {
      key: 'description',
      title: 'Description',
      render: (_, item) => (
        <span
          dangerouslySetInnerHTML={{
            __html: highlightKeyword(item.description, searchKeyword),
          }}
        />
      ),
    },
  ];
};

const RulePage = ({ position }: { position: DrawerPosition }) => {
  // Context and State
  const [keyword, setKeyword] = useState('');
  const { selectedRow } = useContext(Context);

  const columns = generateRuleableColumns(keyword);

  // Get the data from API
  const { data: rules, isValidating } = getRules();

  /**
   * Handles the search operation in the application.
   * Updates the state of `keyword` with the provided search keyword.
   *
   * @param {string} keyword - The search keyword.
   */
  const handleSearch = () => setKeyword(keyword);

  const handleRowClick = () => {};

  /**
   * Filters the rules based on the search keyword.
   * @param rules - The array of rules to filter.
   * @param keyword - The search keyword.
   * @returns The filtered array of rules.
   */
  const filteredRules = useMemo(() => {
    return (rules || []).filter((rule: Rule) =>
      rule.name?.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [rules, keyword]);

  // Interface and display detailed information
  const placements = {
    left: '10px 10px 10px 222px',
    right: '10px 222px 10px 10px',
    top: '222px 10px 10px 10px',
    bottom: '10px 10px 222px',
  };

  const contentWrapperStyle = {
    padding: placements[position],
    width: '100%',
  };
  return (
    <div style={contentWrapperStyle}>
      <SearchBar label="Rules" placeholder="Search" onChange={handleSearch} />
      <Table
        rowData={filteredRules}
        columns={columns}
        onRowClick={handleRowClick}
        selectedRow={selectedRow}
        isLoading={isValidating}
      />
    </div>
  );
};

export default RulePage;
