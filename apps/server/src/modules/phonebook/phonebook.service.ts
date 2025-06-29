import type {
  IFirstFormat,
  IGetPhonebookRecords,
  IGetPhonebookRecordsResponse,
  TGroupBy,
  TOrderBy
} from '@repo/types/dist/phonebook';

import { asc, count, desc, eq, sql } from 'drizzle-orm';

import { db } from '@/db/drizzle/connect';
import { phonebookRecord } from '@/db/drizzle/schema/phonebook/schema';
import { logger } from '@/lib/loger';
import { CustomError } from '@/utils/custom_error';
import { HttpStatus } from '@/utils/enums/http-status';

import type { TUploadFormat } from './types/format.types';

export const uploadRecords = async (data: TUploadFormat[]): Promise<boolean> => {
  try {
    logger.info('Uploading records...');
    if (!data || data.length === 0) throw new CustomError(HttpStatus.BAD_REQUEST, 'Empty data');

    const normalizeRecord = (item: TUploadFormat): IFirstFormat => {
      // IFirstFormat
      if ('ID' in item) {
        return item;
      }

      // ISecondFormat
      if ('employeeId' in item && 'name' in item) {
        const [lastname, firstname, middlename = ''] = item.name.split(' ');
        return {
          ID: item.employeeId,
          firstname,
          lastname,
          middlename,
          gasPhone: item.gasPhone || '',
          urbanPhone: item.urbanPhone || '',
          email: item.email,
          address: '',
          post: item.post,
          organization: item.organization,
          subdivision: item.subdivision,
          subdivisionId: item.subdivisionId
        };
      }

      // IThirdFormat
      if ('id' in item && 'phonenumbers' in item) {
        const gasPhone = item.phonenumbers.find((p) => p.type === 'gasPhone')?.phone || '';
        const urbanPhone = item.phonenumbers.find((p) => p.type === 'urbanPhone')?.phone || '';
        return {
          ID: String(item.id),
          firstname: item.firstname,
          lastname: item.lastname,
          middlename: item.middlename,
          gasPhone,
          urbanPhone,
          email: item.email,
          address: item.address,
          post: item.post,
          organization: item.organization,
          subdivision: item.subdivision,
          subdivisionId: String(item.id_dept)
        };
      }

      throw new CustomError(HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    };

    const normalized = data.map(normalizeRecord);

    const organization = normalized[0]?.organization;
    if (!organization) throw new Error('Missing organization');

    await db.delete(phonebookRecord).where(eq(phonebookRecord.organization, organization));

    const insertData = normalized.map((item) => ({
      id: item.ID,
      firstname: item.firstname,
      lastname: item.lastname,
      middlename: item.middlename,
      gasPhone: item.gasPhone,
      urbanPhone: item.urbanPhone,
      email: item.email,
      address: item.address,
      post: item.post,
      organization: item.organization,
      subdivision: item.subdivision,
      subdivisionId: item.subdivisionId
    }));

    await db.insert(phonebookRecord).values(insertData);
    logger.info('Records uploaded succesfuly!');
    return true;
  } catch (error) {
    throw error;
  }
};

export const getRecords = async (
  limit: number,
  page: number,
  groupBy: TGroupBy = 'lastname',
  orderBy: TOrderBy = 'ASC',
  query?: string
): Promise<IGetPhonebookRecordsResponse> => {
  try {
    const fuzzyCondition = query
      ? sql`
        similarity(${phonebookRecord.firstname}, ${query}) > 0.1 OR
        similarity(${phonebookRecord.lastname}, ${query}) > 0.1 OR
        similarity(${phonebookRecord.middlename}, ${query}) > 0.1
      `
      : undefined;

    // TODO: Починить GroupBy
    const result = await db
      .select({
        id: phonebookRecord.id,
        firstname: phonebookRecord.firstname,
        lastname: phonebookRecord.lastname,
        middlename: phonebookRecord.middlename,
        email: phonebookRecord.email,
        urbanPhone: phonebookRecord.urbanPhone,
        gasPhone: phonebookRecord.gasPhone,
        address: phonebookRecord.address,
        post: phonebookRecord.post,
        organization: phonebookRecord.organization,
        subdivision: phonebookRecord.subdivision
      })
      .from(phonebookRecord)
      .where(fuzzyCondition ?? undefined)
      .limit(limit)
      .offset((page - 1) * limit)
      .orderBy(orderBy === 'ASC' ? asc(phonebookRecord[groupBy]) : desc(phonebookRecord[groupBy]));

    const [totalRecords] = await db
      .select({ count: count() })
      .from(phonebookRecord)
      .where(fuzzyCondition ?? undefined);

    return {
      records: result as IGetPhonebookRecords[],
      totalRecords: totalRecords.count
    };
  } catch (error) {
    throw error;
  }
};
