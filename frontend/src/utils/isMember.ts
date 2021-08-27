const isMember = (account: string) => {
  const buyers = localStorage.getItem('Buyer') && JSON.parse(localStorage.getItem('Buyer') || '');
  const sellers =
    localStorage.getItem('Seller') && JSON.parse(localStorage.getItem('Seller') || '');
  const shippers =
    localStorage.getItem('Shipper') && JSON.parse(localStorage.getItem('Shipper') || '');
  if (buyers && buyers.some((buyer: string) => buyer === account)) return 'Buyer';
  if (sellers && sellers.some((seller: string) => seller === account)) return 'Seller';
  if (shippers && shippers.some((shipper: string) => shipper === account)) return 'Shipper';
  return '';
};

export default isMember;
