import { supabase } from '../../lib/supabase';
import { TransactionType, TransactionStatus } from '../../types/database.types';

export const transactionsService = {
  async getTransactions(userId: string, limit = 50) {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        product:products(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async createTransaction(
    userId: string,
    type: TransactionType,
    amount: number,
    productId?: string
  ) {
    const hash = `0x${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;

    const { data, error } = await supabase
      .from('transactions')
      .insert([
        {
          user_id: userId,
          product_id: productId,
          type,
          amount,
          status: 'pending' as TransactionStatus,
          hash
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateTransactionStatus(
    transactionId: string,
    status: TransactionStatus
  ) {
    const { data, error } = await supabase
      .from('transactions')
      .update({
        status,
        processed_at: status === 'completed' ? new Date().toISOString() : null
      })
      .eq('id', transactionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
