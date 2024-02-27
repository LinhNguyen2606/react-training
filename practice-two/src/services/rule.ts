import useSWR from 'swr';

// Constant
import { API } from '@constants';

// Helper
import { fetcher } from '@helpers';

// Interfaces
import {
  ApiResponse,
  Item,
  Rule
} from '@interfaces';

// Service
import { handleAPIRequest } from '@services';

export const getRules = (): {
  data: Rule[] | undefined;
} => {
  const { data } = useSWR<Rule[]>(`${API.BASE}/${API.RULE}`, fetcher);
  return {
    data,
  };
};

export const assignRuleToUser = (
  userId: string,
  ruleId: string
): Promise<ApiResponse<Item>> =>
  handleAPIRequest(`${API.BASE}/${API.USER_RULES}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      ruleId: ruleId,
    }),
  });

export const unAssignRuleFromUser = (
  userRuleId: string | null
): Promise<ApiResponse<Item>> =>
  handleAPIRequest(`${API.BASE}/${API.USER_RULES}/${userRuleId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
