export const getCampaignStatus = (
  startDate: number,
  endDate: number,
): string => {
  const now = Date.now();
  if (now < startDate) {
    return 'INACTIVE';
  }
  if (now > endDate) {
    return 'INACTIVE';
  }
  return 'ACTIVE';
};
