import {
  useContext,
  useMemo,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import {
  SearchBar,
  Sidebar,
  Table
} from '@components';

// Helpers
import {
  getRolesOfRule,
  getUsersOfRule,
  highlightKeyword,
  transformRoleInfo,
  transformUserInfo
} from '@helpers';

// Interfaces
import { EnitityColumn, Rule } from '@interfaces';

// Service
import {
  getRoleRules,
  getRoles,
  getRules,
  getUserRules,
  getUsers,
} from '@services';

// Context
import { Context } from '@stores';

// Constants
import { PATH, TYPES } from '@constants';

// Icons
import { Shield, UserGroup } from '@assets/icons';

/**
 * Defines the columns configuration for the rule table.
 * @param {string} searchKeyword The keyword rule for highlighting in the table.
 * @returns {Array<EnitityColumn<Rule>>} The array of column configurations.
 */
const generateRuleTableColumns = (
  searchKeyword: string
): EnitityColumn<Rule>[] => {
  return [
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

const RulePage = () => {
  // Context and State
  const [keyword, setKeyword] = useState('');
  const [showCard, setShowCard] = useState(true);
  const { state, dispatch } = useContext(Context);
  const { selectedRow } = state;

  const navigate = useNavigate();
  const selectedRowData = selectedRow.data;
  const isShowDetails = showCard && selectedRowData !== null;
  const columns = generateRuleTableColumns(keyword);

  // Get the data from API
  const { data: users } = getUsers();
  const { data: rules, isLoading } = getRules();
  const { data: roles } = getRoles();
  const { data: userRules } = getUserRules();
  const { data: roleRulesData } = getRoleRules();

  // Handles the data
  const rolesOfRule = useMemo(
    () => getRolesOfRule(roleRulesData || [], roles || [], selectedRowData?.id),
    [roleRulesData, roles, selectedRowData]
  );

  const usersOfRule = useMemo(
    () => getUsersOfRule(userRules || [], users || [], selectedRowData?.id),
    [userRules, users, selectedRowData]
  );

  /**
   * Handles the search operation in the application.
   * Updates the state of `keyword` with the provided search keyword.
   *
   * @param {string} keyword - The search keyword.
   */
  const handleSearch = (keyword: string) => setKeyword(keyword);

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

  /**
   * Handle events to show the panel and hide the panel
   */
  const handleToggleCard = () => setShowCard((prevShowCard) => !prevShowCard);

  /**
   * Handles the event when a row in the table is clicked.
   * Updates the state of `selectedRow` with the index and data of the clicked row.
   *
   * @param {number} index - The index of the clicked row.
   * @param {Rule} rule - The data of the user corresponding to the clicked row.
   */
  const handleRowClick = (index: number, rule: Rule) => {
    if (selectedRow && selectedRow.index === index) {
      dispatch({
        type: TYPES.SELECTED_ROW,
        payload: { index: -1, data: null },
      });
      return;
    }

    dispatch({
      type: TYPES.SELECTED_ROW,
      payload: { index, data: rule },
    });
  };

  /**
   * Handles the click event to navigate to the correspod role
   *
   * @param roleId - The ID of the role.p
   */
  const handleNavigateToRoleClick = (roleId: string) => {
    const role = roles?.find((role) => role.id === roleId);
    const index = roles?.findIndex((role) => role.id === roleId) ?? -1;

    dispatch({
      type: TYPES.SELECTED_ROW,
      payload: { index, data: role },
    });

    dispatch({
      type: TYPES.DATA_ITEMS,
      payload: [
        ...transformRoleInfo(role!),
      ],
    });

    navigate(PATH.ROLES_PATH);
  };

  /**
   * Handles the click event to navigate to the correspod user
   *
   * @param userId - The ID of the user.
   */
  const handleNavigateToUserClick = (userId: string) => {
    const user = users?.find((user) => user.id === userId);
    const index = users?.findIndex((user) => user.id === userId) ?? -1;

    dispatch({
      type: TYPES.SELECTED_ROW,
      payload: { index, data: user },
    });

    dispatch({ type: TYPES.DATA_ITEMS, payload: [...transformUserInfo(user!)] });

    navigate(PATH.HOME_PATH);
  };

  const ruleDetailsInfo = [
    {
      type: TYPES.TEXT_VIEW,
      label: selectedRowData?.name,
      value: selectedRowData?.description,
    },
    {
      type: TYPES.LIST_VIEW,
      values: [
        {
          icon: Shield,
          label: `Roles (${rolesOfRule.length})`,
          values: rolesOfRule.map((roleRule) => ({
            id: roleRule?.id,
            text: roleRule?.name,
            onClick: () => handleNavigateToRoleClick(roleRule?.id!),
          })),
        },
        {
          icon: UserGroup,
          label: `Users (${usersOfRule.length})`,
          values: usersOfRule.map((userRule) => ({
            id: userRule?.id,
            text: userRule?.userName,
            onClick: () => handleNavigateToUserClick(userRule?.id!),
          })),
        },
      ],
    },
  ];

  return (
    <>
      <div className="content__wrapper">
        <SearchBar
          label="Rules"
          placeholder="Search"
          onChange={handleSearch}
        />
        <Table
          rowData={filteredRules}
          columns={columns}
          onRowClick={handleRowClick}
          selectedRow={selectedRow}
          isLoading={isLoading}
        />
      </div>
      {isShowDetails && (
        <Sidebar
          key={selectedRowData?.id}
          title="Rule information"
          isShowIcon={false}
          onShowPanel={handleToggleCard}
          data={ruleDetailsInfo}
        />
      )}
    </>
  );
};

export default RulePage;
