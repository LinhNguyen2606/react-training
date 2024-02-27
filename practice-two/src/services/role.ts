import useSWR from 'swr';

// Constant
import { API } from '@constants';

// Helper
import { fetcher } from '@helpers';

// Interface
import { Role, RoleRule } from '@interfaces';

export const getRoles = (): {
  data: Role[] | undefined;
} => {
  const { data } = useSWR<Role[]>(`${API.BASE}/${API.ROLE}`, fetcher);
  return {
    data,
  };
};

export const getRoleRules = (): {
  data: RoleRule[] | undefined;
} => {
  const { data } = useSWR<RoleRule[]>(`${API.BASE}/${API.ROLE_RULES}`, fetcher);
  return {
    data,
  };
};
