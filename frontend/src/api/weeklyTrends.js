// weeklyTrends.js

const URL = 'http://ec2-54-227-64-22.compute-1.amazonaws.com/api/weekly_trends';

export const fetchWeeklyTrends = async () => {
  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  
  return data;
};
