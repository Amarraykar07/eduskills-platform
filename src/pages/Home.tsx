import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Award, Play } from "lucide-react";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import { useCourses } from "@/hooks/useCourses";

const stats = [
  { icon: BookOpen, label: "Courses", value: "50+" },
  { icon: Users, label: "Students", value: "10K+" },
  { icon: Award, label: "Certificates", value: "5K+" },
  { icon: Play, label: "Video Hours", value: "500+" },
];

export default function Home() {
  const { data: courses } = useCourses();
  const featured = courses?.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="gradient-hero absolute inset-0 opacity-5" />
        <div className="container mx-auto px-4 py-24 text-center lg:py-32">
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-fade-in">
            Master Engineering Skills with{" "}
            <span className="text-primary">EduSkills</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Learn DSA, Web Development, AI & more from industry experts.
            Build real-world projects and advance your career.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Link to="/courses">
              <Button size="lg" className="gap-2">
                Browse Courses <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-card">
        <div className="container mx-auto grid grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <stat.icon className="mx-auto mb-2 h-8 w-8 text-primary" />
              <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      {featured && featured.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-foreground">Featured Courses</h2>
            <Link to="/courses" className="text-sm font-medium text-primary hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          © 2026 EduSkills. Built for engineering students.
        </div>
      </footer>
    </div>
  );
}
