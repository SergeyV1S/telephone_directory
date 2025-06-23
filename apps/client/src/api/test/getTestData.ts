import { api } from "../instance";

export interface ITestData {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface IGetTestDataParams {
  limit: number;
  page: number;
  searchValue: string;
}

interface IGetTestDataResponse extends ITestData {}

export const getTestData = async ({ limit, page, searchValue }: IGetTestDataParams) =>
  api.get<IGetTestDataResponse[]>(
    `https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}&_search=${searchValue}`
  );
