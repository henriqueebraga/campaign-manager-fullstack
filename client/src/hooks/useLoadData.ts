import { useEffect, useState } from 'react';
// import tree from '../tree.json';
import { Campaign } from '../types/types';

const useLoadData = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Campaign | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // const fetchData = setTimeout(() => {
        //     try {
        //         const responseData = tree;

        //         setData(responseData);
        //         setLoading(false);
        //     } catch (error) {
        //         setError('An error occurred while fetching data.');
        //         setLoading(false);
        //     }
        // }, 600);

        // return () => clearTimeout(fetchData);

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/data');
                if (!response.ok) {
                    throw new Error('An error occurred while fetching data.');
                }
                const responseData = await response.json();
                setData(responseData);
                setLoading(false);
            } catch (error) {
                setError('An error occurred while fetching data.');
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { loading, data, error };
};

export default useLoadData;
