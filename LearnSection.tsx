import { AlertCircle, Link, Mail, User, Clock, Gift } from "lucide-react";

const warningSignsData = [
  {
    icon: Mail,
    title: "Rare afzender",
    description: "Check het e-mailadres! Oplichters gebruiken vaak adressen die LIJKEN op echte bedrijven, maar net iets anders zijn.",
    example: "netflix-support@mail-secure.com i.p.v. support@netflix.com",
    color: "destructive",
  },
  {
    icon: Clock,
    title: "Haast & Druk",
    description: "URGENT! LAATSTE KANS! Als ze je onder druk zetten, is er vaak iets mis. Echte bedrijven geven je tijd.",
    example: "\"Je account wordt binnen 24 uur verwijderd!\"",
    color: "warning",
  },
  {
    icon: Link,
    title: "Foute links",
    description: "Hover over links voordat je klikt! De URL moet matchen met het echte bedrijf.",
    example: "www.faceb00k-login.com (let op de nullen!)",
    color: "destructive",
  },
  {
    icon: User,
    title: "Geen naam",
    description: "\"Beste klant\" of \"Beste gebruiker\"? Echte bedrijven kennen je naam.",
    example: "\"Geachte heer/mevrouw\" van je eigen bank?",
    color: "warning",
  },
  {
    icon: AlertCircle,
    title: "Spelfouten",
    description: "Grote bedrijven maken geen spelfouten in officiële mails. Let op slechte grammatica!",
    example: "\"Uw acount is gehackt, klik heir\"",
    color: "destructive",
  },
  {
    icon: Gift,
    title: "Te mooi om waar",
    description: "Gratis iPhone gewonnen? Erfenis van een verre prins? Als het te mooi klinkt, is het dat ook.",
    example: "\"Je hebt €1.000.000 gewonnen!\"",
    color: "warning",
  },
];

const LearnSection = () => {
  return (
    <section id="learn" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-primary text-glow-primary">6 Red Flags</span>
            <span className="text-foreground"> om te onthouden</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Herken deze waarschuwingssignalen en je trapt er nooit meer in.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {warningSignsData.map((sign, index) => (
            <div
              key={index}
              className="group relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-${sign.color}/20 text-${sign.color} mb-4 group-hover:scale-110 transition-transform`}>
                <sign.icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-2">{sign.title}</h3>
              <p className="text-muted-foreground mb-4">{sign.description}</p>

              {/* Example */}
              <div className="bg-secondary/50 rounded-lg p-3 border-l-4 border-primary">
                <span className="text-xs text-primary font-semibold uppercase tracking-wider">Voorbeeld</span>
                <p className="text-sm text-foreground mt-1">{sign.example}</p>
              </div>

              {/* Number indicator */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearnSection;
