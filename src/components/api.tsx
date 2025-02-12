// components/TestApi.tsx
"use client";
import axios from 'axios';
import { useEffect, useState } from 'react';
// import Spinner from '@/components/spinner';

export default function TestApi() {
    const [data, setData] = useState(null);
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/params/thisparam/is/c/12`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl, {
                    withCredentials: true,
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching API:', error);
            }
        };

        fetchData();
    },[apiUrl]);

    return (
        <div>
            <h1>API Response:</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}