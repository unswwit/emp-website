import type { EntryFieldTypes, EntrySkeletonType } from 'contentful';

export type ITypeSponsorsFields = {
  fields: {
    index: EntryFieldTypes.Number;
    name: EntryFieldTypes.Symbol;
    website: EntryFieldTypes.Symbol;
    lightModeLogo: EntryFieldTypes.AssetLink;
    darkModeLogo: EntryFieldTypes.AssetLink;
    type: EntryFieldTypes.Symbol<
      'affiliations' | 'bronze' | 'diamond' | 'gold' | 'partnerships' | 'silver'
    >;
    description: EntryFieldTypes.RichText;
    year: EntryFieldTypes.Integer;
  };
};

export type TypeSponsorsFields = {
  index: EntryFieldTypes.Number;
  name: EntryFieldTypes.Symbol;
  website: EntryFieldTypes.Symbol;
  lightModeLogo: EntryFieldTypes.AssetLink;
  darkModeLogo: EntryFieldTypes.AssetLink;
  type: EntryFieldTypes.Symbol<
    'affiliations' | 'bronze' | 'diamond' | 'gold' | 'partnerships' | 'silver'
  >;
  description: EntryFieldTypes.RichText;
  year: EntryFieldTypes.Integer;
};

export type TypeSponsorsSkeleton = EntrySkeletonType<
  TypeSponsorsFields,
  'sponsors'
>;
