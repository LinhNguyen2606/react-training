import useSWR from 'swr';

// Constant
import { API } from '@constants';

// Helper
import { fetcher } from '@helpers';

// Interface
import { Role } from '@interfaces';

export const getRoles = (): {
  data: Role[] | undefined;
} => {
  const { data } = useSWR<Role[]>(`${API.BASE}/${API.ROLE}`, fetcher);
  return {
    data,
  };
};
