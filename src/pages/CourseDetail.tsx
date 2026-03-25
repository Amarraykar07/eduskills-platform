import { useParams, useNavigate, Link } from "react-router-dom";
import { useCourse, useCourseLessons, useEnrollment, useEnroll } from "@/hooks/useCourses";
import { useAuth } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Clock, User, Play, CheckCircle2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: course, isLoading } = useCourse(id!);
  const { data: lessons } = useCourseLessons(id!);
  const { data: enrollment } = useEnrollment(id!);
  const enrollMutation = useEnroll();

  const handleEnroll = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await enrollMutation.mutateAsync(id!);
      toast.success("Successfully enrolled!");
    } catch {
      toast.error("Failed to enroll");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="mb-4 h-8 w-1/3" />
          <Skeleton className="mb-2 h-4 w-2/3" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Course not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Link to="/courses" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Courses
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge>{course.category}</Badge>
              <Badge variant="outline">{course.level}</Badge>
            </div>
            <h1 className="mb-3 font-display text-3xl font-bold text-foreground">{course.title}</h1>
            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><User className="h-4 w-4" />{course.instructor}</span>
              {course.duration && <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{course.duration}</span>}
              <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" />{course.lessons_count} lessons</span>
            </div>

            {/* Thumbnail */}
            <div className="mb-6 aspect-video w-full overflow-hidden rounded-lg bg-muted">
              {course.thumbnail_url ? (
                <img src={course.thumbnail_url} alt={course.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center gradient-hero">
                  <BookOpen className="h-16 w-16 text-primary-foreground/60" />
                </div>
              )}
            </div>

            <h2 className="mb-2 font-display text-xl font-semibold">About this course</h2>
            <p className="text-muted-foreground leading-relaxed">{course.description}</p>

            {/* Lessons list */}
            {lessons && lessons.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 font-display text-xl font-semibold">Course Content</h2>
                <div className="space-y-2">
                  {lessons.map((lesson, i) => {
                    const isCompleted = enrollment?.completed_lessons?.includes(lesson.id);
                    return (
                      <Card key={lesson.id} className="transition-colors hover:bg-muted/50">
                        <CardContent className="flex items-center gap-3 p-4">
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                          ) : (
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                              {i + 1}
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-medium">{lesson.title}</p>
                          </div>
                          {lesson.duration && (
                            <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                          )}
                          {enrollment && (
                            <Link to={`/course/${id}/lesson/${lesson.id}`}>
                              <Button size="sm" variant="ghost">
                                <Play className="h-4 w-4" />
                              </Button>
                            </Link>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <Card className="sticky top-20 shadow-card">
              <CardContent className="p-6">
                <div className="mb-4 text-center">
                  <span className="font-display text-3xl font-bold text-primary">Free</span>
                </div>
                {enrollment ? (
                  <>
                    <div className="mb-4">
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{enrollment.progress}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-accent transition-all"
                          style={{ width: `${enrollment.progress}%` }}
                        />
                      </div>
                    </div>
                    {lessons && lessons.length > 0 && (
                      <Link to={`/course/${id}/lesson/${lessons[0].id}`}>
                        <Button className="w-full gap-2">
                          <Play className="h-4 w-4" /> Continue Learning
                        </Button>
                      </Link>
                    )}
                  </>
                ) : (
                  <Button className="w-full" onClick={handleEnroll} disabled={enrollMutation.isPending}>
                    {enrollMutation.isPending ? "Enrolling..." : "Enroll Now"}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
