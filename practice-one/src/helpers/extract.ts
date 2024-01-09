// Interface
import { APIResponse } from "@interfaces";

export const extractData = <T>(res: APIResponse<T>): T | null => res && res.data;