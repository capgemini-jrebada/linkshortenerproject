import { InferModel } from 'drizzle-orm';
import { integer, pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

export const links = pgTable(
  'links',
  {
    id: integer('id').generatedAlwaysAsIdentity().primaryKey(),
    slug: text('slug').notNull(),
    targetUrl: text('target_url').notNull(),
    userId: text('user_id'),
    clickCount: integer('click_count').notNull().default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    slugIndex: uniqueIndex('links_slug_unique').on(table.slug),
  }),
);

export type Link = InferModel<typeof links>;
export type NewLink = InferModel<typeof links, 'insert'>;
