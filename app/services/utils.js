export const validateEmail = (email) => {
  const emailPattern = /^[^\s@\.](?!.*\.\.)[^\s@]*[^\s@\.]@[^\s@]+\.[^\s@\.]+$/;
  return emailPattern.test(email);
};
