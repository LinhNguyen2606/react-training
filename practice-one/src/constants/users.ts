import { Clock, Envelope } from '../assets/icons';
import { dateConversion } from '../helpers';

/**
 * Constant array representing user information.
 * Each object contains an icon, label, and value.
 */
export const USER_INFORMATION = [
  {
    icon: Envelope,
    label: 'Email:',
    value: 'email@example.com',
  },
  {
    icon: Clock,
    label: 'Last visited:',
    value: dateConversion(),
  },
];
