import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface Transaction {
  hash: string;
  type: 'buy' | 'sell';
  token: string;
  amount: number;
  value: number;
  date: string;
}

export function useTransactionHistory() {
  const { address } = useAccount();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!address) {
      setIsLoading(false);
      return;
    }

    const fetchTransactions = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock transaction data - in production, fetch from blockchain
      const mockTransactions: Transaction[] = [
        {
          hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
          type: 'buy',
          token: 'ETH',
          amount: 0.5,
          value: 1728.39,
          date: '2 hours ago',
        },
        {
          hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
          type: 'sell',
          token: 'UNI',
          amount: 50,
          value: 617.00,
          date: '5 hours ago',
        },
        {
          hash: '0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456',
          type: 'buy',
          token: 'LINK',
          amount: 100,
          value: 1856.00,
          date: '1 day ago',
        },
        {
          hash: '0xdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abc',
          type: 'buy',
          token: 'MATIC',
          amount: 2000,
          value: 1780.00,
          date: '2 days ago',
        },
        {
          hash: '0x567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234',
          type: 'sell',
          token: 'AAVE',
          amount: 5,
          value: 1172.80,
          date: '3 days ago',
        },
      ];
      
      setTransactions(mockTransactions);
      setIsLoading(false);
    };

    fetchTransactions();
  }, [address]);

  return { transactions, isLoading };
}

