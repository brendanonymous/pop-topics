import { useState, useEffect } from "react"
import { fetchWeeklyTrends } from "../api/weeklyTrends"

export const useWeeklyTrends = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const CACHE_KEY = 'trends_cache';
    const CACHE_TIMESTAMP_KEY = 'trends_cache_timestamp';
    const CACHE_EXPIRY = 1000 * 60 * 60 * 24; // 24 hours

    useEffect(() => {
        const fetchData = async () => {
            try {
                const trends = await fetchWeeklyTrends();

                // cache new data
                localStorage.setItem(CACHE_KEY, JSON.stringify(trends));
                localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now());

                console.log('Fetched trends: ', trends);
                setData(trends);

            } catch (err) {
                console.error('Failed to fetch trends: ', err);
                setError(err);
            }
        };

        // check cached data timestamp, if duration passed, fetch, else setData with the cached data
        const cached = localStorage.getItem(CACHE_KEY);
        const cachedTime = localStorage.getItem(CACHE_TIMESTAMP_KEY);

        if (cached && cachedTime && (Date.now() - cachedTime < CACHE_EXPIRY)) {
            setData(JSON.parse(cached));
        } else {
            fetchData();
        }
    }, [])

    return { data, error }
};