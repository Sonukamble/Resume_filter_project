import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useQueryParams = (): Record<string, string> => {
    const { search } = useLocation();

    return useMemo(() => {
        const params = new URLSearchParams(search);
        const result: Record<string, string> = {};
        params.forEach((value, key) => {
            result[key] = value;
        });
        return result;
    }, [search]);
};

const Sales = () => {
    const query = useQueryParams();

    useEffect(() => {
        // Placeholder: here you could POST query to your backend for verification/storage
        // fetch('/api/admitad/callback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(query) })
    }, [query]);

    return (
        <div style={{ padding: '24px' }}>
            <h1>Sales Tracking</h1>
            <p>This page captures Admitad callback parameters from their site.</p>
            <div style={{ marginTop: '16px' }}>
                <h3>Received Parameters</h3>
                <pre style={{ background: '#f6f8fa', padding: '12px', borderRadius: 8, overflowX: 'auto' }}>
                    {JSON.stringify(query, null, 2)}
                </pre>
            </div>
        </div>
    );
};

export default Sales;


