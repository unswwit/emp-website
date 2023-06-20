import type { EntryFieldTypes } from 'contentful';

type ITypeSponsorsFields = {
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

const filterSponsors = (sponsors: ITypeSponsorsFields[]) => {
  const filteredSponsors = sponsors.filter(
    (sponsor: ITypeSponsorsFields) => sponsor.fields.year.valueOf() === 2023
  );
  const tempSponsors = {
    'Diamond Sponsors': filteredSponsors.filter(
      (sponsor: ITypeSponsorsFields) =>
        sponsor.fields.type.valueOf() === 'diamond'
    ),
    'Gold Sponsors': filteredSponsors.filter(
      (sponsor: ITypeSponsorsFields) => sponsor.fields.type.valueOf() === 'gold'
    ),
    'Silver Sponsors': filteredSponsors.filter(
      (sponsor: ITypeSponsorsFields) =>
        sponsor.fields.type.valueOf() === 'silver'
    ),
    'Bronze Sponsors': filteredSponsors.filter(
      (sponsor: ITypeSponsorsFields) =>
        sponsor.fields.type.valueOf() === 'bronze'
    ),
    Affiliations: filteredSponsors.filter(
      (sponsor: ITypeSponsorsFields) =>
        sponsor.fields.type.valueOf() === 'affiliations'
    ),
    Partnerships: filteredSponsors.filter(
      (sponsor: ITypeSponsorsFields) =>
        sponsor.fields.type.valueOf() === 'partnerships'
    ),
  };
  return tempSponsors;
};

export { filterSponsors };
