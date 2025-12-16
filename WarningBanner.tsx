import { AlertTriangle, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const WarningBanner = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Animated danger background */}
      <div className="absolute inset-0 bg-gradient-to-r from-destructive/20 via-warning/10 to-destructive/20 animate-pulse-glow" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto bg-card border-2 border-destructive/50 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Warning icon */}
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-destructive/20 flex items-center justify-center animate-pulse-glow">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                🚨 Denk je dat je slachtoffer bent?
              </h2>
              <p className="text-muted-foreground mb-6">
                Heb je per ongeluk op een phishing link geklikt of gegevens ingevuld? 
                Geen paniek, maar handel snel:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Verander je wachtwoorden</h4>
                    <p className="text-sm text-muted-foreground">Begin met het account dat gehackt kan zijn</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Meld het bij je bank</h4>
                    <p className="text-sm text-muted-foreground">Als je bankgegevens hebt gedeeld</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Vertel je ouders</h4>
                    <p className="text-sm text-muted-foreground">Zij kunnen helpen met de volgende stappen</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Doe aangifte</h4>
                    <p className="text-sm text-muted-foreground">Via politie.nl of Fraudehelpdesk</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="warning" asChild>
                  <a href="https://www.fraudehelpdesk.nl" target="_blank" rel="noopener noreferrer">
                    <Shield className="w-4 h-4" />
                    Fraudehelpdesk
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://www.politie.nl/aangifte-of-melding-doen" target="_blank" rel="noopener noreferrer">
                    Aangifte doen
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WarningBanner;
