import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ProductFormData {
  'product-name': string;
  description: string;
  price: number;
  quantity: number;
  image_url?: string;
}

export const useProductManagement = () => {
  const [loading, setLoading] = useState(false);

  const addProduct = async (productData: ProductFormData) => {
    try {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('You must be logged in to add products');
        return false;
      }

      const { error } = await supabase
        .from('Farm Products Table')
        .insert({
          ...productData,
          user_id: user.id
        });

      if (error) {
        console.error('Error adding product:', error);
        toast.error('Failed to add product');
        return false;
      }

      toast.success('Product added successfully!');
      return true;
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string, productData: Partial<ProductFormData>) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('Farm Products Table')
        .update(productData)
        .eq('id', id);

      if (error) {
        console.error('Error updating product:', error);
        toast.error('Failed to update product');
        return false;
      }

      toast.success('Product updated successfully!');
      return true;
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('Farm Products Table')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
        return false;
      }

      toast.success('Product deleted successfully!');
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    addProduct,
    updateProduct,
    deleteProduct,
    loading
  };
};