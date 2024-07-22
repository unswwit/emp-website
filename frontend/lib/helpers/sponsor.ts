/* eslint-disable */
import { Sponsor } from '../../types/Sponsor';

const filterSponsors = (sponsors: Sponsor[]): { [key: string]: Sponsor[] } => {
  const filteredSponsors = sponsors.filter((sponsor) => sponsor.year === 2023);
  const tempSponsors = {
    'Diamond Sponsors': filteredSponsors.filter((sponsor) => sponsor.type === 'diamond'),
    'Gold Sponsors': filteredSponsors.filter((sponsor) => sponsor.type === 'gold'),
    'Silver Sponsors': filteredSponsors.filter((sponsor) => sponsor.type === 'silver'),
    'Bronze Sponsors': filteredSponsors.filter((sponsor) => sponsor.type === 'bronze'),
    Affiliations: filteredSponsors.filter((sponsor) => sponsor.type === 'affiliations'),
    Partnerships: filteredSponsors.filter((sponsor) => sponsor.type === 'partnerships'),
  };
  return tempSponsors;
};

export { filterSponsors };