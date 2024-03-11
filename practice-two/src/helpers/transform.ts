// Icons
import {
  ListCheck,
  Shield,
  UserGroup
} from '@assets/icons';

// Constant
import { TYPES } from '@constants';

// Interfaces
import {
  EnitityUserRoles,
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

/**
 * Transforms role data into an array of transformed data items.
 * @param {Role} data - The data to transform.
 */
export const transformRoleInfo = (data: Role) => [
  {
    id: 1,
    type: TYPES.TEXT_FIELD,
    label: 'Name',
    key: 'name',
    value: data.name,
  },
  {
    id: 2,
    type: TYPES.COLOR_FIELD,
    label: 'Color',
    key: 'bgColor',
    value: data.bgColor,
  },
];

/**
 * Transforms user rules and user roles into a list view info object.
 *
 * @param userRules - The user rules to transform.
 * @param userRoles - The user roles to transform.
 * @returns A list view info object.
 */
export const transformListViewInfo = (userRules: Rule[], userRoles: Role[]) => {
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

/**
 * Transforms role rules and user roles into a list view role info object.
 *
 * @template T - A type that extends Rule.
 * @template U - A type that extends EnitityUserRoles.
 * @param roleRules - The role rules to transform.
 * @param userRoles - The user roles to transform.
 * @returns A list view role info object.
 */
export const transformListViewRoleInfo = <
  T extends Rule,
  U extends EnitityUserRoles
>(
  roleRules: T[],
  userRoles: U[]
) => {
  return [
    {
      type: TYPES.LIST_VIEW,
      values: [
        {
          icon: ListCheck,
          label: `Rules assigned (${roleRules.length})`,
          values: roleRules.map((roleRule) => ({
            text: roleRule?.name,
            link: '/',
          })),
        },
        {
          icon: UserGroup,
          label: `Members assigned  (${userRoles.length})`,
          values: userRoles.map((userRole) => ({
            text: userRole?.userName,
            link: '/',
          })),
        },
      ],
    },
  ];
};
