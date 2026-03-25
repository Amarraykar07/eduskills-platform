import { useAuth } from "@/lib/auth";
import { useEnrollments } from "@/hooks/useCourses";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, Navigate } from "react-router-dom";
import { BookOpen, Play, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const { data: enrollments, isLoading } = useEnrollments();

  if (authLoading) return null;
  if (!user) return <Navigate to="/login" />;

  const totalCourses = enrollments?.length || 0;
  const avgProgress = totalCourses
    ? Math.round((enrollments?.reduce((sum, e) => sum + e.progress, 0) || 0) / totalCourses)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-1 font-display text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="mb-8 text-muted-foreground">Welcome back, {user.user_metadata?.full_name || user.email}</p>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card className="shadow-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{totalCourses}</p>
                <p className="text-sm text-muted-foreground">Enrolled Courses</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">{avgProgress}%</p>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                <Play className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold font-display">
                  {enrollments?.filter((e) => e.progress === 100).length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrolled Courses */}
        <h2 className="mb-4 font-display text-xl font-semibold">My Courses</h2>
        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40 rounded-lg" />
            ))}
          </div>
        ) : enrollments && enrollments.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {enrollments.map((enrollment) => {
              const course = enrollment.courses as any;
              return (
                <Card key={enrollment.id} className="shadow-card transition-all hover:shadow-elevated">
                  <CardContent className="p-5">
                    <h3 className="mb-2 font-display text-lg font-semibold line-clamp-2">{course?.title}</h3>
                    <p className="mb-3 text-sm text-muted-foreground">{course?.category} · {course?.level}</p>
                    <div className="mb-3">
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span>Progress</span>
                        <span className="font-medium">{enrollment.progress}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-primary transition-all"
                          style={{ width: `${enrollment.progress}%` }}
                        />
                      </div>
                    </div>
                    <Link to={`/course/${enrollment.course_id}`}>
                      <Button size="sm" variant="outline" className="w-full">
                        Continue Learning
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-12 text-center">
            <BookOpen className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
            <p className="mb-3 text-muted-foreground">You haven't enrolled in any courses yet.</p>
            <Link to="/courses">
              <Button>Browse Courses</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
