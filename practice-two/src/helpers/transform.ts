// Icons
import {
  ListCheck,
  Shield
} from '@assets/icons';

// Constant
import { TYPES } from '@constants';

// Interfaces
import {
  Role,
  Rule,
  User
} from '@interfaces';

/**
 * Transforms user data into an array of transformed data items.
 * @param {User} data - The data to transform.
 */
export const transformUserInfo = (data: User) => [
  {
    id: 1,
    type: TYPES.TEXT_FIELD,
    label: 'Full Name',
    key: 'userName',
    value: data.userName,
  },
  {
    id: 2,
    type: TYPES.TEXT_FIELD,
    label: 'Email',
    key: 'email',
    value: data.email,
  },
  {
    id: 3,
    type: TYPES.AVATAR_FIELD,
    label: 'Avatar',
    key: 'avatar',
    value: data.avatar,
    keyImageDefault: 'userName',
  },
  {
    id: 4,
    type: TYPES.STATUS_FIELD,
    label: 'Status',
    key: 'isActive',
    value: data.isActive,
  },
  {
    id: 5,
    type: TYPES.DATE_VIEW,
    label: 'Registered',
    key: 'registered',
    value: data.registered,
  },
  {
    id: 6,
    type: TYPES.DATE_VIEW,
    label: 'Last visited',
    key: 'lastVisited',
    value: data.lastVisited,
  },
  {
    id: 7,
    type: TYPES.DETAILS_FIELD,
    label: 'Details',
    key: 'details',
    value: data.details,
  },
];

export const transformListViewInfo = (
  userRules: Rule[],
  userRoles: Role[],
) => {
  return [
    {
      type: TYPES.LIST_VIEW,
      values: [
        {
          icon: Shield,
          label: `Roles (${userRoles.length})`,
          values: userRoles.map((role) => ({
            text: role?.name,
            link: '/',
          })),
        },
        {
          icon: ListCheck,
          label: `Rules (${userRules.length})`,
          values: userRules.map((rule) => ({
            text: rule?.description,
            link: '/',
          })),
        },
      ],
    },
  ];
};
