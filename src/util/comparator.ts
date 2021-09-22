const descendingComparator = (a: any, b: any, orderBy: string) => {
  if (a[orderBy] < b[orderBy]) {
    return -1;
  }
  if (a[orderBy] > b[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order: 'asc' | 'desc', orderBy: string) => {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
};

export default getComparator;
