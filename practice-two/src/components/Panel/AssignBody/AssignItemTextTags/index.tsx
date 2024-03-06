import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShield } from '@fortawesome/free-solid-svg-icons';

// Component
import { AssignmentOptions } from '@components/Panel/AssignItems';

// Service
import { getRoles } from '@services';

// Constant
import { PATH } from '@constants';

// Context
import { Context } from '@stores';

// Interface
import { Item } from '@interfaces';

interface AssignItemTextTagsProps extends Item {
  isModifying: boolean;
  isAssigning: boolean;
  isRoleAssigned: boolean;
  selectedType: AssignmentOptions;
  handleItemSelect: (id: string) => () => void;
}

const AssignItemTextTags = ({
  id,
  name,
  description,
  isAssigning,
  isRoleAssigned,
  isAssigned,
  isModifying,
  assignedTo,
  selectedType,
  handleItemSelect,
}: AssignItemTextTagsProps) => {
  // Context
  const { setSelectedRow } = useContext(Context);

  const navigate = useNavigate();

  // Get the data from API
  const { data: roles } = getRoles();

  /**
   * Handles the click event to navigate to the correspod role
   *
   * @param roleId - The ID of the role.
   */
  const handleNavigateToRoleClick = (roleId: string) => () => {
    const role = roles?.find((role) => role.id === roleId);
    const index = roles?.findIndex((role) => role.id === roleId) ?? -1;

    setSelectedRow({ index, data: role });
    navigate(PATH.ROLES_PATH);
  };

  return (
    <>
      {selectedType === AssignmentOptions.AllAssignments ? (
        <>
          <div className="panel-assign__item-details" key={id}>
            <span
              className="panel-assign__item-name"
              style={{ fontWeight: '500' }}
            >
              {name}:
            </span>
            <p
              className="panel-assign__item-desc"
              style={{
                fontSize: '14px',
                marginLeft: '4px',
              }}
            >
              {description}
            </p>
          </div>

          <div className="panel-assign__item-details">
            {isAssigned && !isRoleAssigned && (
              <span className="panel-assign__item-direcly-assigned">
                Assigned directly
              </span>
            )}
            {assignedTo?.map((role) => (
              <span
                key={role.id}
                className="panel-assign__item-role"
                onClick={handleNavigateToRoleClick(role.id!)}
              >
                <div style={{ color: role.bgColor }}>
                  <FontAwesomeIcon icon={faShield} />
                </div>
                {role.name}
              </span>
            ))}
          </div>
        </>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {isModifying && (
            <input
              type="checkbox"
              checked={isAssigned}
              onChange={handleItemSelect(id!)}
              className="panel-assign--input"
              disabled={isAssigning}
            />
          )}

          <div>
            {isModifying || isAssigned ? (
              <>
                <span
                  className="panel-assign__item-name"
                  style={{ fontWeight: '400' }}
                >
                  {name}
                </span>
                <p
                  className="panel-assign__item-desc"
                  style={{
                    lineHeight: 'calc(15/13)',
                    color: '#8693a5',
                    fontSize: '13px',
                  }}
                >
                  {description}
                </p>
              </>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default AssignItemTextTags;
