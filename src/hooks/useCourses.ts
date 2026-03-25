import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export function useCourses(category?: string, search?: string) {
  return useQuery({
    queryKey: ["courses", category, search],
    queryFn: async () => {
      let query = supabase.from("courses").select("*").order("created_at", { ascending: false });
      if (category && category !== "All") {
        query = query.eq("category", category);
      }
      if (search) {
        query = query.ilike("title", `%${search}%`);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useCourse(id: string) {
  return useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
}

export function useCourseLessons(courseId: string) {
  return useQuery({
    queryKey: ["lessons", courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("course_lessons")
        .select("*")
        .eq("course_id", courseId)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
    enabled: !!courseId,
  });
}

export function useEnrollments() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["enrollments", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enrollments")
        .select("*, courses(*)")
        .eq("user_id", user!.id);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useEnrollment(courseId: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["enrollment", user?.id, courseId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enrollments")
        .select("*")
        .eq("user_id", user!.id)
        .eq("course_id", courseId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user && !!courseId,
  });
}

export function useEnroll() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: async (courseId: string) => {
      const { error } = await supabase
        .from("enrollments")
        .insert({ user_id: user!.id, course_id: courseId });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
      queryClient.invalidateQueries({ queryKey: ["enrollment"] });
    },
  });
}
