// Interface
import { User } from "@interfaces";

export const DATA_ITEMS = (data: User) => [
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
    keyImageDefault: 'userName'
  },
  {
    id: 4,
    type: 'STATUS_FIELD',
    label: 'Status',
    key: 'status',
    value: data.isActive
  },
  {
    id: 5,
    type: 'DATE_FIELD',
    label: 'Registered',
    key: 'registered',
    value: data.registered
  },
  {
    id: 6,
    type: 'DATE_FIELD',
    label: 'Last visited',
    key: 'lastVisited',
    value: data.lastVisited
  },
  {
    id: 7,
    type: 'DETAILS_FIELD',
    label: 'Details',
    key: 'details',
    value: data.details
  },
];
