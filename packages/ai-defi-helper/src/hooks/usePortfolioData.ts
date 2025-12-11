import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

export function usePortfolioData() {
  const { address } = useAccount();
  const [totalValue, setTotalValue] = useState(0);
  const [change24h, setChange24h] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!address) {
      setIsLoading(false);
      return;
    }

    // Simulate fetching portfolio data
    const fetchPortfolioData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - in production, fetch from CoinGecko/CoinMarketCap
      setTotalValue(45678.92);
      setChange24h(5.67);
      setIsLoading(false);
    };

    fetchPortfolioData();

    // Update every minute
    const interval = setInterval(fetchPortfolioData, 60000);
    return () => clearInterval(interval);
  }, [address]);

  return { totalValue, change24h, isLoading };
}

