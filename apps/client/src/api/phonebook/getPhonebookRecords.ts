import type { IGetPhonebookRecordRequest, IGetPhonebookRecordsResponse } from "@repo/types";

import { api } from "../instance";

interface IGetPhonebookRecordsParams extends IGetPhonebookRecordRequest {}

export const getPhonebookRecords = async ({
  limit,
  page,
  query,
  groupBy,
  orderBy
}: IGetPhonebookRecordsParams) => {
  const params: IGetPhonebookRecordsParams = {
    limit,
    page,
    ...(query && { query }),
    ...(groupBy && { groupBy }),
    ...(orderBy && { orderBy })
  };

  return api.get<IResponse<IGetPhonebookRecordsResponse>>("/", {
    params
  });
};
