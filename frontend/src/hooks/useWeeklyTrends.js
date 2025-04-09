import { useState, useEffect } from "react"
import { fetchWeeklyTrends } from "../api/weeklyTrends"

export const useWeeklyTrends = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const trends = await fetchWeeklyTrends();

                console.log('Fetched trends: ', trends);
                setData(trends);
            } catch (err) {
                console.error('Failed to fetch trends: ', err);
                setError(err);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 2 * 24 * 60 * 60 * 1000);

        return () => clearInterval(interval);
    }, [])

    return { data, error }
};