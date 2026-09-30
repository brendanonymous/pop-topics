import { useState, useEffect } from "react"
import { fetchWeeklyTrends } from "../api/weeklyTrends"
import { parseTrendVolume } from "../util/utils"

const CACHE_EXPIRY = 1000 * 60 * 60 * 24; // 24 hours

export const useWeeklyTrends = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const CACHE_KEY = 'trends_cache_v2';
    const CACHE_TIMESTAMP_KEY = 'trends_cache_timestamp';
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const trends = await fetchWeeklyTrends();
                if (!Array.isArray(trends) || trends.length === 0 || trends.some((trend) => parseTrendVolume(trend.volume) === null)) {
                    throw new Error('Weekly trends response is missing valid search-volume values');
                }

                // cache new data
                localStorage.setItem(CACHE_KEY, JSON.stringify(trends));
                localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now());

                console.log('Fetched trends: ', trends);
                setData(trends);

            } catch (err) {
                console.error('Failed to fetch trends: ', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        // check cached data timestamp, if passed expiry, fetch, else setData with the cached data
        const cachedTrends = localStorage.getItem(CACHE_KEY);
        const cachedTime = localStorage.getItem(CACHE_TIMESTAMP_KEY);

        let cachedData;
        try {
            cachedData = cachedTrends ? JSON.parse(cachedTrends) : null;
        } catch {
            cachedData = null;
        }

        const cacheIsValid = Array.isArray(cachedData) && cachedData.length > 0 &&
            cachedData.every((trend) => parseTrendVolume(trend.volume) !== null);

        if (cacheIsValid && cachedTime && (Date.now() - Number(cachedTime) < CACHE_EXPIRY)) {
            setData(cachedData);
            setLoading(false);
        } else {
            fetchData();
        }
    }, [])

    return { data, error, loading }
};