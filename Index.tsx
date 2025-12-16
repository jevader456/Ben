import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import LearnSection from "@/components/LearnSection";
import PhishingQuiz from "@/components/PhishingQuiz";
import PhishingTutorial from "@/components/PhishingTutorial";
import WarningBanner from "@/components/WarningBanner";
import Footer from "@/components/Footer";

const Index = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const handleStartQuizFromTutorial = () => {
    setShowTutorial(false);
    setShowQuiz(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection 
        onStartQuiz={() => setShowQuiz(true)} 
        onStartTutorial={() => setShowTutorial(true)}
      />
      <LearnSection />
      <WarningBanner />
      <Footer />
      
      {showQuiz && <PhishingQuiz onClose={() => setShowQuiz(false)} />}
      {showTutorial && (
        <PhishingTutorial 
          onClose={() => setShowTutorial(false)} 
          onStartQuiz={handleStartQuizFromTutorial}
        />
      )}
    </div>
  );
};

export default Index;
