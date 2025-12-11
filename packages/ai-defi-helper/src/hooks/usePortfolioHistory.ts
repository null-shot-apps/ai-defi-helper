import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface HistoryData {
  date: string;
  value: number;
}

type TimeRange = '24h' | '7d' | '30d' | '1y';

export function usePortfolioHistory(timeRange: TimeRange) {
  const { address } = useAccount();
  const [data, setData] = useState<HistoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!address) {
      setIsLoading(false);
      return;
    }

    const fetchHistoryData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate mock historical data based on time range
      const generateData = () => {
        const now = Date.now();
        const dataPoints: HistoryData[] = [];
        let intervals: number;
        let intervalMs: number;
        let dateFormat: Intl.DateTimeFormatOptions;

        switch (timeRange) {
          case '24h':
            intervals = 24;
            intervalMs = 60 * 60 * 1000; // 1 hour
            dateFormat = { hour: 'numeric' };
            break;
          case '7d':
            intervals = 7;
            intervalMs = 24 * 60 * 60 * 1000; // 1 day
            dateFormat = { month: 'short', day: 'numeric' };
            break;
          case '30d':
            intervals = 30;
            intervalMs = 24 * 60 * 60 * 1000; // 1 day
            dateFormat = { month: 'short', day: 'numeric' };
            break;
          case '1y':
            intervals = 12;
            intervalMs = 30 * 24 * 60 * 60 * 1000; // ~1 month
            dateFormat = { month: 'short' };
            break;
        }

        const baseValue = 45000;
        for (let i = intervals; i >= 0; i--) {
          const timestamp = now - (i * intervalMs);
          const randomVariation = (Math.random() - 0.5) * 5000;
          const trendValue = (intervals - i) * 100; // Slight upward trend
          
          dataPoints.push({
            date: new Date(timestamp).toLocaleDateString('en-US', dateFormat),
            value: baseValue + randomVariation + trendValue,
          });
        }

        return dataPoints;
      };
      
      setData(generateData());
      setIsLoading(false);
    };

    fetchHistoryData();
  }, [address, timeRange]);

  return { data, isLoading };
}

