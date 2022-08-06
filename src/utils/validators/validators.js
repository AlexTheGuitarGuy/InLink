export const required = (message) => {
  if (message) return undefined;
  return 'field is required';
};

export const maxLen = (len) => (message) => {
  if (message && message.length > len) return `maximum length is ${len}`;
  return undefined;
};
