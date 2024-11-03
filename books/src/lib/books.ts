import { supabase } from './supabase';
import { AmazonBook } from '../types';

export async function fetchBooks(): Promise<AmazonBook[]> {
  const { data, error } = await supabase
    .from('book_customizations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data.map(book => ({
    ASIN: book.asin,
    DetailPageURL: book.affiliate_link || '',
    ItemInfo: {
      Title: {
        DisplayValue: book.custom_title || 'Untitled Book',
      },
      Description: book.custom_description || ''
    },
    Images: {
      Primary: {
        Large: {
          URL: book.custom_image_url || ''
        }
      }
    }
  }));
}