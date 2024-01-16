// Icons
import { Clock, Envelope } from '@assets/icons';

// Helper
import { dateFormat } from '@helpers';

// Interface
import { User } from '@interfaces';

/**
 * Constant array representing user information.
 * Each object contains an icon, label, and value.
 */
export const USER_INFORMATION = (data: User) => [
  {
    icon: Envelope,
    label: 'Email:',
    value: data.email,
  },
  {
    icon: Clock,
    label: 'Last visited:',
    value: dateFormat(data.lastVisited),
  },
];
