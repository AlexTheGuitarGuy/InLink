export const required = (message: string) => {
  if (message) return undefined;
  return 'field is required';
};

export const maxLen = (len: number) => (message: string) => {
  if (message && message.length > len) return `maximum length is ${len}`;
  return undefined;
};
