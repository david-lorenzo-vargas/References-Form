export const checkEmploymentLength = (startDate: Date, endDate?: Date) => {
  if (startDate && endDate) {
    const differenceInMillis = Math.abs(startDate.getTime() - endDate.getTime());
  
    const differenceInYears = differenceInMillis / (1000 * 60 * 60 * 24 * 365);
  
    return differenceInYears >= 3;
  }
};
