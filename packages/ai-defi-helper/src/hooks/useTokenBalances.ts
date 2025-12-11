import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface Token {
  name: string;
  symbol: string;
  balance: number;
  price: number;
  value: number;
  change24h: number;
}

export function useTokenBalances() {
  const { address } = useAccount();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!address) {
      setIsLoading(false);
      return;
    }

    const fetchTokenBalances = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Mock token data - in production, fetch from blockchain + CoinGecko
      const mockTokens: Token[] = [
        { name: 'Ethereum', symbol: 'ETH', balance: 2.5, price: 3456.78, value: 8641.95, change24h: 3.45 },
        { name: 'Bitcoin', symbol: 'BTC', balance: 0.5, price: 65432.10, value: 32716.05, change24h: 2.15 },
        { name: 'Uniswap', symbol: 'UNI', balance: 150, price: 12.34, value: 1851.00, change24h: -1.23 },
        { name: 'Chainlink', symbol: 'LINK', balance: 200, price: 18.56, value: 3712.00, change24h: 5.67 },
        { name: 'Aave', symbol: 'AAVE', balance: 10, price: 234.56, value: 2345.60, change24h: -2.34 },
        { name: 'Polygon', symbol: 'MATIC', balance: 5000, price: 0.89, value: 4450.00, change24h: 4.12 },
        { name: 'Arbitrum', symbol: 'ARB', balance: 1000, price: 1.23, value: 1230.00, change24h: 6.78 },
        { name: 'Optimism', symbol: 'OP', balance: 500, price: 2.45, value: 1225.00, change24h: -0.89 },
        { name: 'Curve DAO', symbol: 'CRV', balance: 800, price: 0.67, value: 536.00, change24h: 1.45 },
        { name: 'Maker', symbol: 'MKR', balance: 2, price: 1567.89, value: 3135.78, change24h: 3.21 },
        { name: 'Compound', symbol: 'COMP', balance: 15, price: 78.90, value: 1183.50, change24h: -1.56 },
        { name: 'Synthetix', symbol: 'SNX', balance: 300, price: 3.45, value: 1035.00, change24h: 2.89 },
      ];
      
      setTokens(mockTokens);
      setIsLoading(false);
    };

    fetchTokenBalances();

    // Update every minute
    const interval = setInterval(fetchTokenBalances, 60000);
    return () => clearInterval(interval);
  }, [address]);

  return { tokens, isLoading };
}

