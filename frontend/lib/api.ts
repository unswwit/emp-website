import { createClient } from 'contentful';
import type { EntrySkeletonType } from 'contentful';

export const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_API_SPACE as string,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_API_TOKEN as string,
});

export default class ContentService {
  static get instance() {
    return new ContentService();
  }

  client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_API_SPACE as string,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_API_TOKEN as string,
  });

  async getEntriesByType<T extends EntrySkeletonType>(type: string) {
    return (
      await this.client.getEntries<T>({
        content_type: type,
      })
    ).items;
  }
}
