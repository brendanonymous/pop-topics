// weeklyTrends.js

const URL = import.meta.env.VITE_API_URL;

export const fetchWeeklyTrends = async () => {
  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  
  return data;
};
