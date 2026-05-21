import type { EntryFieldTypes, EntrySkeletonType } from 'contentful';

export type ExecQuotesFields = {
  index: EntryFieldTypes.Integer;
  name: EntryFieldTypes.Symbol;
  position: EntryFieldTypes.Symbol;
  quote: EntryFieldTypes.Text;
  image: EntryFieldTypes.AssetLink;
};

export type ExecQuotesSkeleton = EntrySkeletonType<ExecQuotesFields, 'execQuotes'>;

export type ExecQuote = {
  index: number;
  name: string;
  position: string;
  quote: string;
  imageUrl: string | null;
};
