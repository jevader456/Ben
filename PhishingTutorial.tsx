import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Mail, AlertTriangle, CheckCircle, XCircle, MousePointer, Eye, Search } from "lucide-react";

interface TutorialStep {
  title: string;
  description: string;
  highlight?: string;
  action?: string;
  icon: "eye" | "search" | "mouse" | "check";
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "Stap 1: Check de afzender",
    description: "Kijk ALTIJD eerst naar het e-mailadres van de afzender. Oplichters gebruiken vaak adressen die lijken op echte bedrijven, maar net iets anders zijn.",
    highlight: "sender",
    action: "Klik op het e-mailadres om het te analyseren",
    icon: "eye",
  },
  {
    title: "Stap 2: Analyseer de aanhef",
    description: "Echte bedrijven gebruiken meestal je naam. 'Beste klant' of 'Geachte heer/mevrouw' kan een waarschuwingssignaal zijn.",
    highlight: "greeting",
    action: "Let op hoe je wordt aangesproken",
    icon: "search",
  },
  {
    title: "Stap 3: Herken urgentie en dreigementen",
    description: "Phishing mails proberen je onder druk te zetten met woorden als 'URGENT', 'ONMIDDELLIJK', of 'binnen 24 uur'. Dit is om je te laten handelen zonder na te denken.",
    highlight: "urgency",
    action: "Zoek naar woorden die druk uitoefenen",
    icon: "eye",
  },
  {
    title: "Stap 4: Inspecteer links VOOR je klikt",
    description: "Hover over links om te zien waar ze echt naartoe gaan. Klik NOOIT direct! Check of het domein klopt (bijv. apple.com vs app1e.com).",
    highlight: "link",
    action: "Hover over de link om de echte URL te zien",
    icon: "mouse",
  },
  {
    title: "Stap 5: Controleer spelfouten",
    description: "Professionele bedrijven maken zelden spelfouten. Slechte grammatica en rare zinnen zijn vaak een teken van phishing.",
    highlight: "spelling",
    action: "Zoek naar taalfouten in de tekst",
    icon: "search",
  },
  {
    title: "Stap 6: Vraag jezelf af: verwacht ik dit?",
    description: "Als je geen pakket hebt besteld, geen Apple account hebt, of niet meedeed aan een loterij - dan is het 99% zeker phishing!",
    highlight: "context",
    action: "Denk logisch na over de context",
    icon: "check",
  },
];

// Example phishing email for tutorial
const exampleEmail = {
  sender: "security@app1e-support.com",
  subject: "⚠️ URGENT: Uw Apple ID wordt geblokkeerd!",
  content: `Beste klant,

We hebben ONMIDDELLIJKE actie nodig! Er is verdachte activiteit gedetecteerd op uw account. Uw Apple ID wordt binnen 24 uur permanent geblokkeerd als u niet verifieert.

Klik hier om uw account te beveiligen:
www.app1e-verify-id.com/secure

Als u niet reageert, verliest u toegang tot al uw aankopen en gegevens.

Met vriendelijke groten,
Apple Beveiligingsteam`,
};

interface PhishingTutorialProps {
  onClose: () => void;
  onStartQuiz: () => void;
}

const PhishingTutorial = ({ onClose, onStartQuiz }: PhishingTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState<string | null>(null);
  const [foundRedFlags, setFoundRedFlags] = useState<string[]>([]);

  const step = tutorialSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setHighlightedElement(tutorialSteps[currentStep + 1].highlight || null);
      
      // Add red flag when completing a step
      const flags = ["sender", "greeting", "urgency", "link", "spelling", "context"];
      if (flags[currentStep] && !foundRedFlags.includes(flags[currentStep])) {
        setFoundRedFlags([...foundRedFlags, flags[currentStep]]);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setHighlightedElement(tutorialSteps[currentStep - 1].highlight || null);
    }
  };

  const handleElementClick = (element: string) => {
    if (element === step.highlight) {
      if (!foundRedFlags.includes(element)) {
        setFoundRedFlags([...foundRedFlags, element]);
      }
    }
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "eye": return <Eye className="w-5 h-5" />;
      case "search": return <Search className="w-5 h-5" />;
      case "mouse": return <MousePointer className="w-5 h-5" />;
      case "check": return <CheckCircle className="w-5 h-5" />;
      default: return <Eye className="w-5 h-5" />;
    }
  };

  const isComplete = currentStep === tutorialSteps.length - 1 && foundRedFlags.length >= 5;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-4xl bg-card border border-border rounded-2xl p-6 md:p-8 my-8 animate-scale-in relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Phishing Analyse Tutorial</h2>
              <p className="text-sm text-muted-foreground">Leer stap voor stap een phishing mail te herkennen</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-6">
          {tutorialSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full transition-colors ${
                index <= currentStep ? "bg-primary" : "bg-secondary"
              }`}
            />
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Email example */}
          <div className="order-2 md:order-1">
            <div className="bg-secondary/50 rounded-xl border border-border overflow-hidden">
              {/* Email header */}
              <div 
                className={`bg-secondary p-4 border-b border-border cursor-pointer transition-all ${
                  highlightedElement === "sender" ? "ring-2 ring-warning bg-warning/10" : ""
                }`}
                onClick={() => handleElementClick("sender")}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <div className={`font-semibold text-sm ${highlightedElement === "sender" ? "text-warning" : "text-foreground"}`}>
                      {exampleEmail.sender}
                      {highlightedElement === "sender" && (
                        <span className="ml-2 text-xs bg-warning/20 text-warning px-2 py-0.5 rounded">
                          🚩 app1e ≠ apple!
                        </span>
                      )}
                    </div>
                    <div className="text-muted-foreground text-sm">{exampleEmail.subject}</div>
                  </div>
                </div>
              </div>
              
              {/* Email content */}
              <div className="p-4 space-y-3 text-sm">
                <p 
                  className={`cursor-pointer transition-all ${
                    highlightedElement === "greeting" ? "bg-warning/20 text-warning rounded px-2 py-1 -mx-2" : "text-foreground"
                  }`}
                  onClick={() => handleElementClick("greeting")}
                >
                  Beste klant,
                  {highlightedElement === "greeting" && (
                    <span className="ml-2 text-xs bg-warning/20 text-warning px-2 py-0.5 rounded">
                      🚩 Geen naam!
                    </span>
                  )}
                </p>

                <p 
                  className={`cursor-pointer transition-all ${
                    highlightedElement === "urgency" ? "bg-warning/20 text-warning rounded px-2 py-1 -mx-2" : "text-foreground"
                  }`}
                  onClick={() => handleElementClick("urgency")}
                >
                  We hebben <span className={highlightedElement === "urgency" ? "font-bold underline" : ""}>ONMIDDELLIJKE</span> actie nodig! Er is verdachte activiteit gedetecteerd op uw account. Uw Apple ID wordt binnen <span className={highlightedElement === "urgency" ? "font-bold underline" : ""}>24 uur</span> permanent geblokkeerd als u niet verifieert.
                  {highlightedElement === "urgency" && (
                    <span className="ml-2 text-xs bg-warning/20 text-warning px-2 py-0.5 rounded">
                      🚩 Tijdsdruk!
                    </span>
                  )}
                </p>

                <div 
                  className={`cursor-pointer transition-all ${
                    highlightedElement === "link" ? "bg-warning/20 text-warning rounded px-2 py-1 -mx-2" : "text-foreground"
                  }`}
                  onClick={() => handleElementClick("link")}
                >
                  <p>Klik hier om uw account te beveiligen:</p>
                  <p className={`${highlightedElement === "link" ? "text-destructive underline font-bold" : "text-primary underline"}`}>
                    www.app1e-verify-id.com/secure
                  </p>
                  {highlightedElement === "link" && (
                    <span className="text-xs bg-warning/20 text-warning px-2 py-0.5 rounded">
                      🚩 Nep-domein!
                    </span>
                  )}
                </div>

                <p className="text-foreground">
                  Als u niet reageert, verliest u toegang tot al uw aankopen en gegevens.
                </p>

                <p 
                  className={`cursor-pointer transition-all ${
                    highlightedElement === "spelling" ? "bg-warning/20 text-warning rounded px-2 py-1 -mx-2" : "text-foreground"
                  }`}
                  onClick={() => handleElementClick("spelling")}
                >
                  Met vriendelijke <span className={highlightedElement === "spelling" ? "font-bold underline text-destructive" : ""}>groten</span>,
                  {highlightedElement === "spelling" && (
                    <span className="ml-2 text-xs bg-warning/20 text-warning px-2 py-0.5 rounded">
                      🚩 Spelfout!
                    </span>
                  )}
                </p>
                <p className="text-foreground">Apple Beveiligingsteam</p>
              </div>
            </div>

            {/* Found red flags */}
            <div className="mt-4 p-4 bg-secondary/30 rounded-lg">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Gevonden Red Flags:</p>
              <div className="flex flex-wrap gap-2">
                {foundRedFlags.map((flag) => (
                  <span key={flag} className="text-xs bg-destructive/20 text-destructive px-2 py-1 rounded-full flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    {flag === "sender" && "Vals e-mailadres"}
                    {flag === "greeting" && "Geen persoonlijke aanhef"}
                    {flag === "urgency" && "Tijdsdruk"}
                    {flag === "link" && "Nep-link"}
                    {flag === "spelling" && "Spelfouten"}
                    {flag === "context" && "Verdachte context"}
                  </span>
                ))}
                {foundRedFlags.length === 0 && (
                  <span className="text-sm text-muted-foreground">Nog geen red flags gevonden...</span>
                )}
              </div>
            </div>
          </div>

          {/* Tutorial steps */}
          <div className="order-1 md:order-2">
            <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  {getIcon(step.icon)}
                </div>
                <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
              </div>
              
              <p className="text-muted-foreground mb-4">{step.description}</p>
              
              {step.action && (
                <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 rounded-lg p-3">
                  <MousePointer className="w-4 h-4" />
                  <span>{step.action}</span>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex gap-4 mt-6">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Vorige
              </Button>
              {currentStep < tutorialSteps.length - 1 ? (
                <Button
                  variant="cyber"
                  onClick={handleNext}
                  className="flex-1"
                >
                  Volgende
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  variant="cyber"
                  onClick={onStartQuiz}
                  className="flex-1"
                >
                  Start Quiz!
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>

            {/* Tips */}
            <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">💡 Pro Tip</p>
              <p className="text-sm text-foreground">
                {currentStep === 0 && "Hover met je muis over een e-mailadres om het volledige adres te zien!"}
                {currentStep === 1 && "Echte bedrijven hebben je naam in hun systeem en gebruiken die."}
                {currentStep === 2 && "Neem altijd de tijd. Geen legitiem bedrijf dwingt je om binnen minuten te handelen."}
                {currentStep === 3 && "Op mobiel: houd je vinger op een link om de echte URL te zien."}
                {currentStep === 4 && "Phishing mails komen vaak uit het buitenland - vandaar de spelfouten!"}
                {currentStep === 5 && "Bij twijfel: ga ZELF naar de officiële website, niet via de link in de mail."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhishingTutorial;