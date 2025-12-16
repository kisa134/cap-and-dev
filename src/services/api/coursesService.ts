import { supabase } from '../../lib/supabase';

export const coursesService = {
  async getCourses() {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('active', true)
      .order('order_index');

    if (error) throw error;
    return data;
  },

  async getCourseWithLessons(courseId: string) {
    const { data, error } = await supabase
      .from('courses')
      .select(`
        *,
        lessons(*)
      `)
      .eq('id', courseId)
      .single();

    if (error) throw error;
    return data;
  },

  async getUserProgress(userId: string) {
    const { data, error } = await supabase
      .from('user_progress')
      .select(`
        *,
        lesson:lessons(*)
      `)
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  },

  async updateLessonProgress(
    userId: string,
    lessonId: string,
    completed: boolean
  ) {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        completed,
        completed_at: completed ? new Date().toISOString() : null
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
