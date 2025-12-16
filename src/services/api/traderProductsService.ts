import { supabase } from '../../lib/supabase';

export interface TraderProduct {
  id: string;
  name: string;
  slug: string;
  type: 'course' | 'tool' | 'service';
  short_description?: string;
  detailed_description?: string;
  price?: number;
  currency?: string;
  features?: any;
  is_active: boolean;
  created_at: string;
}

export const traderProductsService = {
  async getAllProducts() {
    const { data, error } = await supabase
      .from('trader_products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data as TraderProduct[];
  },

  async getProductBySlug(slug: string) {
    const { data, error } = await supabase
      .from('trader_products')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data as TraderProduct | null;
  },

  async getProductsByType(type: 'course' | 'tool' | 'service') {
    const { data, error } = await supabase
      .from('trader_products')
      .select('*')
      .eq('type', type)
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data as TraderProduct[];
  },
};
