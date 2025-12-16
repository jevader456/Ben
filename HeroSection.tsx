import { Shield, AlertTriangle, Eye, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onStartQuiz: () => void;
  onStartTutorial: () => void;
}

const HeroSection = ({ onStartQuiz, onStartTutorial }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center cyber-grid overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-destructive/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Warning badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/20 border border-destructive/50 text-destructive mb-8 animate-slide-in">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">1 op 3 jongeren trapt in phishing</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-in" style={{ animationDelay: "0.1s" }}>
            <span className="text-foreground">Word een </span>
            <span className="text-primary text-glow-primary">Phishing</span>
            <br />
            <span className="text-foreground">Detective</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-slide-in" style={{ animationDelay: "0.2s" }}>
            Leer nep van echt te onderscheiden. 
            Bescherm jezelf tegen hackers en oplichters.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="cyber" size="lg" onClick={onStartQuiz}>
              <Eye className="w-5 h-5" />
              Start de Quiz
            </Button>
            <Button variant="outline" size="lg" onClick={onStartTutorial}>
              <BookOpen className="w-5 h-5" />
              Interactieve Tutorial
            </Button>
            <Button variant="ghost" size="lg" onClick={() => document.getElementById("learn")?.scrollIntoView({ behavior: "smooth" })}>
              <Shield className="w-5 h-5" />
              Leer de basics
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 animate-slide-in" style={{ animationDelay: "0.4s" }}>
            {[
              { value: "3.4B", label: "Phishing mails per dag" },
              { value: "€48M", label: "Schade in NL per jaar" },
              { value: "12-16", label: "Meest kwetsbare leeftijd" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary text-glow-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
