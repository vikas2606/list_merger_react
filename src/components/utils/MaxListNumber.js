export const MaxListNumber = (apiResponse) => {
  if (!apiResponse || !apiResponse || apiResponse.length === 0) {
    return null; // Handle invalid or empty API response
  }

  const listNumbers = apiResponse.map((item) => item.list_number);
  return Math.max(...listNumbers);
};