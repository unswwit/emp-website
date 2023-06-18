import { createClient } from 'contentful';

if (!process.env.NEXT_PUBLIC_CONTENTFUL_API_SPACE || !process.env.NEXT_PUBLIC_CONTENTFUL_API_TOKEN) {
  throw new Error('Contentful API space is not defined');
}

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_API_SPACE,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_API_TOKEN,
});

export async function loadSponsors() {
  const res = await client
    .getEntries({
      content_type: 'sponsors',
      select: 'fields',
      order: 'fields.name',
    })
    .catch((error) => {
      console.error(error);
    });
  return res.items;
}
