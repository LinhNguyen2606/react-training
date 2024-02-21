import useSWR from 'swr';

// Constant
import { API } from '@constants';

// Helper
import { fetcher } from '@helpers';

// Interface
import { Rule } from '@interfaces';

export const getRules = (): {
  data: Rule[] | undefined;
} => {
  const { data } = useSWR<Rule[]>(`${API.BASE}/${API.RULE}`, fetcher);
  return {
    data,
  };
};
