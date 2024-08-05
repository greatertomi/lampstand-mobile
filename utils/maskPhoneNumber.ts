export const maskPhoneNumber = (phoneNumber: string) => {
  const lastThreeDigits = phoneNumber.slice(-3);
  const maskedPart = phoneNumber.slice(0, -3).replaceAll(/./g, '*');
  return maskedPart + lastThreeDigits;
};
