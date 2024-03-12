export const datesAreValid = (start: Date, end?: Date) => {
  if (start && end) {
    return start.getTime() < end.getTime();
  }
}