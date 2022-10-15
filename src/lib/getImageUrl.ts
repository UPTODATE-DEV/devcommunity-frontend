const baseUrl = process.env.NEXT_PUBLIC_FILES_BASE_URL as string;

export const getImageUrl = (url: string | undefined) => {
  return `${baseUrl}${url}` || '/4.jpg';
};
