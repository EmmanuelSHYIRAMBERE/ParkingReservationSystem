export function validateParkingAccessForDate(userDate) {
  const hours = "23:59";
  const accessDate = Date.parse(userDate + "T" + hours);

  const currentTime = Date.now();

  if (isNaN(accessDate) || currentTime > accessDate) {
    return false;
  }
  return true;
}
