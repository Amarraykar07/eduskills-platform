import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, User } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  thumbnail_url: string | null;
  duration: string | null;
  level: string;
  lessons_count: number;
}

const categoryColors: Record<string, string> = {
  "DSA": "bg-primary/10 text-primary",
  "Web Development": "bg-accent/10 text-accent",
  "AI & ML": "bg-warning/10 text-warning",
  "Database": "bg-destructive/10 text-destructive",
  "DevOps": "bg-success/10 text-success",
};

export default function CourseCard({ id, title, description, category, instructor, thumbnail_url, duration, level, lessons_count }: CourseCardProps) {
  return (
    <Link to={`/course/${id}`}>
      <Card className="group overflow-hidden border bg-card shadow-card transition-all hover:shadow-elevated hover:-translate-y-1">
        <div className="aspect-video w-full overflow-hidden bg-muted">
          {thumbnail_url ? (
            <img src={thumbnail_url} alt={title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
          ) : (
            <div className="flex h-full w-full items-center justify-center gradient-hero">
              <BookOpen className="h-12 w-12 text-primary-foreground/60" />
            </div>
          )}
        </div>
        <CardContent className="p-5">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="secondary" className={categoryColors[category] || "bg-secondary text-secondary-foreground"}>
              {category}
            </Badge>
            <Badge variant="outline" className="text-xs">{level}</Badge>
          </div>
          <h3 className="mb-1 font-display text-lg font-semibold leading-tight text-card-foreground line-clamp-2">
            {title}
          </h3>
          <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><User className="h-3 w-3" />{instructor}</span>
            {duration && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{duration}</span>}
            <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" />{lessons_count} lessons</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
