import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { BookCustomization } from '../types';

export function useBookCustomization(asin: string) {
  const [customization, setCustomization] = useState<BookCustomization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomization();
  }, [asin]);

  async function fetchCustomization() {
    try {
      const { data, error } = await supabase
        .from('book_customizations')
        .select('*')
        .eq('asin', asin)
        .single();

      if (error) throw error;
      setCustomization(data);
    } catch (error) {
      console.error('Error fetching book customization:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateCustomization(updates: Partial<BookCustomization>) {
    try {
      const { data, error } = await supabase
        .from('book_customizations')
        .upsert({
          asin,
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      setCustomization(data);
      return data;
    } catch (error) {
      console.error('Error updating book customization:', error);
      throw error;
    }
  }

  return {
    customization,
    loading,
    updateCustomization,
  };
}