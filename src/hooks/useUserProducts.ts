import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Product } from './useProducts';

export const useUserProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setProducts([]);
        return;
      }

      const { data, error } = await supabase
        .from('Farm Products Table')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setProducts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      console.error('Error fetching user products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchUserProducts,
  };
};