'use client';

import { useState, useEffect } from 'react';

interface ElectricityPrice {
    DKK_per_kWh: number;
    EUR_per_kWh: number;
    EXR: number;
    time_start: string;
    time_end: string;
}

export default function ElectricityPrices() {
    const [prices, setPrices] = useState<ElectricityPrice[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPrices();
    }, []);

    async function fetchPrices() {
        try {
            const response = await fetch('http://localhost:5000/electricity-prices', {
                cache: 'no-store'
            });
            const data = await response.json();
            setPrices(data);
        } catch (error) {
            console.error('Error fetching electricity prices:', error);
        } finally {
            setLoading(false);
        }
    }

    function formatTime(timeString: string) {
        const date = new Date(timeString);
        return date.toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' });
    }

    function formatPrice(price: number) {
        return price.toFixed(2);
    }

    function getPriceColor(price: number) {
        if (price < 1) return 'text-green-600';
        if (price < 2) return 'text-yellow-600';
        return 'text-red-600';
    }

    if (loading) {
        return (
            <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Electricity Prices</h1>
                <p className="text-gray-600 mb-8">Today's electricity prices in Denmark (DK1)</p>
                <div className="text-center py-12">Loading...</div>
            </div>
        );
    }

    const currentHour = new Date().getHours();
    const currentPrice = prices.find(p => {
        const hour = new Date(p.time_start).getHours();
        return hour === currentHour;
    });

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Electricity Prices</h1>
            <p className="text-gray-600 mb-8">Today's electricity prices in Denmark (DK1)</p>

            {currentPrice && (
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2">Current Price</h2>
                    <p className={`text-4xl font-bold ${getPriceColor(currentPrice.DKK_per_kWh)}`}>
                        {formatPrice(currentPrice.DKK_per_kWh)} DKK/kWh
                    </p>
                    <p className="text-gray-500 mt-2">
                        {formatTime(currentPrice.time_start)} - {formatTime(currentPrice.time_end)}
                    </p>
                </div>
            )}

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price (DKK/kWh)
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price (EUR/kWh)
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {prices.map((price, index) => {
                            const isCurrentHour = new Date(price.time_start).getHours() === currentHour;
                            return (
                                <tr key={index} className={isCurrentHour ? 'bg-blue-50' : ''}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatTime(price.time_start)} - {formatTime(price.time_end)}
                                    </td>
                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${getPriceColor(price.DKK_per_kWh)}`}>
                                        {formatPrice(price.DKK_per_kWh)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatPrice(price.EUR_per_kWh)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
