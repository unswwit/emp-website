import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from 'contentful';

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

export type TypeSponsors<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode
> = Entry<TypeSponsorsSkeleton, Modifiers, Locales>;
