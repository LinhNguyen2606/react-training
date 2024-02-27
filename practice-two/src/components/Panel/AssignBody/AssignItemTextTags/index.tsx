// Components
import { Icons } from '@components';
import { AssignmentOptions } from '@components/Panel/AssignItems';

// Icon
import { Shield } from '@assets/icons';

interface AssignItemTextTagsProps {
  id: string;
  name: string;
  description?: string;
  isAssigned: boolean;
  isModifying: boolean;
  assignedTo?: {
    id?: string;
    name?: string;
  }[];
  selectedType: AssignmentOptions;
  handleItemSelect: (
    id: string
  ) => () => void;
}

const AssignItemTextTags = ({
  id,
  name,
  description,
  isAssigned,
  isModifying,
  assignedTo,
  selectedType,
  handleItemSelect,
}: AssignItemTextTagsProps) => {
  return (
    <>
      {selectedType === AssignmentOptions.AllAssignments ? (
        <>
          <div className="panel-assign__item-details">
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
            {isAssigned && (
              <span className="panel-assign__item-direcly-assigned">
                Assigned directly
              </span>
            )}
            {assignedTo?.map((role) => (
              <a
                key={role.id}
                href={`/roles/${role.id}`}
                className="panel-assign__item-role"
              >
                <Icons src={Shield} size="13" />
                {role.name}
              </a>
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
              onChange={handleItemSelect(id)}
              className="panel-assign--input"
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
