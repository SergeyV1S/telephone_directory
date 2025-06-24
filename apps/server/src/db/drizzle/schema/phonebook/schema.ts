import { pgTable, text } from 'drizzle-orm/pg-core';

import { baseSchema } from '../base.schema';

export const phonebookRecord = pgTable('phonebook-record', {
  ...baseSchema,
  id: text('id'),
  firstname: text('firstname'),
  lastname: text('lastname'),
  middlename: text('middlename'),
  gasPhone: text('gasPhone'),
  urbanPhone: text('urbanPhone'),
  email: text('email'),
  address: text('address'),
  post: text('post'),
  organization: text('organization'),
  subdivision: text('subdivision'),
  subdivisionId: text('subdivisionId')
});
