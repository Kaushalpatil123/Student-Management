export const DateFormat = (isoDate) => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-GB', options);
};