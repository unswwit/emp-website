const filterSponsors = (sponsors: any) => {
  const filteredSponsors = sponsors.filter(
    (sponsor: any) => sponsor.year === 2023
  );
  const tempSponsors = {
    'Diamond Sponsors': filteredSponsors.filter(
      (sponsor: any) => sponsor.type === 'diamond'
    ),
    'Gold Sponsors': filteredSponsors.filter(
      (sponsor: any) => sponsor.type === 'gold'
    ),
    'Silver Sponsors': filteredSponsors.filter(
      (sponsor: any) => sponsor.type === 'silver'
    ),
    'Bronze Sponsors': filteredSponsors.filter(
      (sponsor: any) => sponsor.type === 'bronze'
    ),
    Affiliations: filteredSponsors.filter(
      (sponsor: any) => sponsor.type === 'affiliations'
    ),
    Partnerships: filteredSponsors.filter(
      (sponsor: any) => sponsor.type === 'partnerships'
    ),
  };
  return tempSponsors;
};

export { filterSponsors };
