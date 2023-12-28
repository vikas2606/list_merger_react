const apiUrl = 'https://apis.ccbp.in/list-creation/lists';

const fetchData = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // You can handle the error further in your application
  }
};

export default fetchData;