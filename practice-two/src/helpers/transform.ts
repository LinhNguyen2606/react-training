// Interface
import { User } from '@interfaces';

/**
 * Transforms user data into an array of transformed data items.
 * @param {User} data - The user data to transform.
 */
export const transformDataItems = (data: User) => [
  {
    id: 1,
    type: 'TEXT_FIELD',
    label: 'Full Name',
    key: 'userName',
    value: data.userName,
  },
  {
    id: 2,
    type: 'TEXT_FIELD',
    label: 'Email',
    key: 'email',
    value: data.email,
  },
  {
    id: 3,
    type: 'AVATAR_FIELD',
    label: 'Avatar',
    key: 'avatar',
    value: data.avatar,
    keyImageDefault: 'userName',
  },
  {
    id: 4,
    type: 'STATUS_FIELD',
    label: 'Status',
    key: 'isActive',
    value: data.isActive,
  },
  {
    id: 5,
    type: 'DATE_VIEW',
    label: 'Registered',
    key: 'registered',
    value: data.registered,
  },
  {
    id: 6,
    type: 'DATE_VIEW',
    label: 'Last visited',
    key: 'lastVisited',
    value: data.lastVisited,
  },
  {
    id: 7,
    type: 'DETAILS_FIELD',
    label: 'Details',
    key: 'details',
    value: data.details,
  },
];
