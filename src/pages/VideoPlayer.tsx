import { useParams, Link } from "react-router-dom";
import { useCourse, useCourseLessons, useEnrollment } from "@/hooks/useCourses";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Play } from "lucide-react";

export default function VideoPlayer() {
  const { id: courseId, lessonId } = useParams<{ id: string; lessonId: string }>();
  const { data: course } = useCourse(courseId!);
  const { data: lessons } = useCourseLessons(courseId!);
  const { data: enrollment } = useEnrollment(courseId!);

  const currentLesson = lessons?.find((l) => l.id === lessonId);
  const currentIndex = lessons?.findIndex((l) => l.id === lessonId) ?? -1;
  const nextLesson = lessons?.[currentIndex + 1];
  const prevLesson = currentIndex > 0 ? lessons?.[currentIndex - 1] : null;

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-xl font-bold">Lesson not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Link to={`/course/${courseId}`} className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to {course?.title || "Course"}
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Video area */}
          <div className="lg:col-span-2">
            <div className="mb-4 aspect-video w-full overflow-hidden rounded-lg bg-foreground/5">
              <iframe
                src={currentLesson.video_url}
                className="h-full w-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title={currentLesson.title}
              />
            </div>
            <h1 className="mb-2 font-display text-2xl font-bold text-foreground">{currentLesson.title}</h1>
            {currentLesson.duration && (
              <p className="mb-4 text-sm text-muted-foreground">Duration: {currentLesson.duration}</p>
            )}

            <div className="flex gap-3">
              {prevLesson && (
                <Link to={`/course/${courseId}/lesson/${prevLesson.id}`}>
                  <Button variant="outline" size="sm">← Previous</Button>
                </Link>
              )}
              {nextLesson && (
                <Link to={`/course/${courseId}/lesson/${nextLesson.id}`}>
                  <Button size="sm">Next Lesson →</Button>
                </Link>
              )}
            </div>
          </div>

          {/* Lesson sidebar */}
          <div>
            <h2 className="mb-3 font-display text-lg font-semibold">Lessons</h2>
            <div className="space-y-1">
              {lessons?.map((lesson, i) => {
                const isActive = lesson.id === lessonId;
                const isCompleted = enrollment?.completed_lessons?.includes(lesson.id);
                return (
                  <Link key={lesson.id} to={`/course/${courseId}/lesson/${lesson.id}`}>
                    <Card className={`transition-colors ${isActive ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}>
                      <CardContent className="flex items-center gap-2 p-3">
                        {isCompleted ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                        ) : isActive ? (
                          <Play className="h-4 w-4 shrink-0 text-primary" />
                        ) : (
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center text-xs text-muted-foreground">
                            {i + 1}
                          </span>
                        )}
                        <span className={`text-sm ${isActive ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                          {lesson.title}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
