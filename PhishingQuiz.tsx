import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Mail, AlertTriangle, Trophy, Share2, Twitter, Facebook, Copy, Check } from "lucide-react";

interface QuizQuestion {
  id: number;
  type: "email" | "message" | "dm";
  sender: string;
  subject?: string;
  content: string;
  isPhishing: boolean;
  explanation: string;
  redFlags?: string[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: "email",
    sender: "security@app1e-id.com",
    subject: "Uw Apple ID is geblokkeerd!",
    content: "Beste klant,\n\nWe hebben verdachte activiteit gedetecteerd op uw Apple ID. Uw account is tijdelijk geblokkeerd. Klik HIER om uw identiteit te verifiëren binnen 24 uur of uw account wordt permanent verwijderd.\n\nMet vriendelijke groet,\nApple Support Team",
    isPhishing: true,
    explanation: "Dit is phishing! Let op: het e-mailadres is 'app1e' (met een 1) i.p.v. 'apple'. Ook gebruiken ze druk (24 uur!) en zeggen ze 'Beste klant' i.p.v. je naam.",
    redFlags: ["Vals e-mailadres (app1e met een 1)", "Tijdsdruk (24 uur)", "Geen persoonlijke aanhef", "Dreigement"],
  },
  {
    id: 2,
    type: "message",
    sender: "Bol.com",
    subject: "Je bestelling is onderweg",
    content: "Hoi Max,\n\nGoed nieuws! Je bestelling (#8847291) is vandaag verzonden en komt morgen aan. Je kunt je pakket volgen via je Bol.com account.\n\nBedankt voor je bestelling!\nTeam Bol.com",
    isPhishing: false,
    explanation: "Dit is echt! De mail gebruikt je naam, heeft een ordernummer, en vraagt niet om ergens op te klikken of gegevens in te vullen. Ze verwijzen naar je account, niet naar een externe link.",
    redFlags: [],
  },
  {
    id: 3,
    type: "email",
    sender: "no-reply@instagrarn.com",
    subject: "Iemand probeert in te loggen op je account",
    content: "Er is geprobeerd in te loggen op je Instagram account vanaf een nieuw apparaat.\n\nAls jij dit niet was, klik dan ONMIDDELLIJK op de link hieronder om je wachtwoord te resetten:\n\nwww.instagrarn-security.com/reset\n\nAls je niet reageert wordt je account gehackt!",
    isPhishing: true,
    explanation: "Phishing! Het e-mailadres is 'instagrarn' (met 'rn' die op 'm' lijkt). De link gaat naar een nep-website en ze dreigen met hacken.",
    redFlags: ["instagrarn i.p.v. instagram (rn lijkt op m)", "Externe link naar nep-site", "Dreigement over hacken", "ONMIDDELLIJK (druk)"],
  },
  {
    id: 4,
    type: "message",
    sender: "+31 6 12345678",
    subject: "WhatsApp bericht",
    content: "Hey schat! Mijn telefoon is kapot en dit is mijn nieuwe nummer. Kun je €500 overmaken? Ik betaal je morgen terug! Het is echt dringend... 🙏\n\nRekening: NL12FAKE3456789\nNaam: J. de Vries",
    isPhishing: true,
    explanation: "Klassieke 'vriend in nood' scam! Altijd eerst bellen naar het oude nummer om te checken. Oplichters doen alsof ze familie/vrienden zijn en vragen om geld.",
    redFlags: ["Nieuw nummer, geen verificatie", "Direct om geld vragen", "Dringend/urgent", "Vage naam op rekening"],
  },
  {
    id: 5,
    type: "email",
    sender: "nieuws@spotify.com",
    subject: "Je Wrapped 2024 is klaar!",
    content: "Hoi Emma,\n\nJe Spotify Wrapped 2024 staat klaar! Ontdek welke nummers je het meest hebt geluisterd en deel je resultaten met vrienden.\n\nOpen de Spotify app om je Wrapped te bekijken.\n\nTeam Spotify",
    isPhishing: false,
    explanation: "Dit is echt! Correct e-mailadres, je naam wordt gebruikt, en ze vragen je om de officiële app te openen - niet om op een link te klikken.",
    redFlags: [],
  },
  // Nieuwe vragen: Instagram DM scams
  {
    id: 6,
    type: "dm",
    sender: "@instagram_support_help",
    subject: "Instagram DM",
    content: "⚠️ URGENT: Je account wordt verwijderd wegens schending van auteursrecht. Verifieer je account binnen 12 uur via deze link:\n\ninstagram-verify-account.com/appeal\n\nAntwoord niet op dit bericht.",
    isPhishing: true,
    explanation: "Nep Instagram support! Echte Instagram stuurt NOOIT DM's over accountproblemen. Check altijd of het een geverifieerd account is met een blauw vinkje.",
    redFlags: ["Instagram DM's nooit voor accountzaken", "Nep username", "Externe link", "Tijdsdruk (12 uur)"],
  },
  {
    id: 7,
    type: "dm",
    sender: "@nike_giveaway_official",
    subject: "Instagram DM",
    content: "🎉 GEFELICITEERD! 🎉\n\nJe bent geselecteerd om GRATIS Nike Air Jordan 1's te winnen!\n\nKlik op de link in onze bio en vul je adres + creditcardgegevens in voor verzendkosten (€2.99).\n\nDeze aanbieding verloopt over 1 uur! ⏰",
    isPhishing: true,
    explanation: "Klassieke giveaway scam! Echte bedrijven vragen NOOIT creditcardgegevens voor 'gratis' producten. Ze willen je betaalgegevens stelen.",
    redFlags: ["Gratis product maar wel betalen", "Creditcard vragen", "Extreme tijdsdruk", "Te mooi om waar te zijn"],
  },
  // Gaming scams
  {
    id: 8,
    type: "message",
    sender: "FreeVBucks_Generator",
    subject: "Discord bericht",
    content: "Yo! Ik heb een werkende V-Bucks generator gevonden! 💰\n\nIk heb net 10.000 V-Bucks gekregen, 100% gratis en veilig!\n\nGa naar: fortnite-vbucks-free.net\n\nJe moet alleen even inloggen met je Epic account. Werkt echt, trust me bro! 🎮",
    isPhishing: true,
    explanation: "SCAM! Er bestaan GEEN gratis V-Bucks generators. Ze willen je Epic Games inloggegevens stelen om je account over te nemen.",
    redFlags: ["'Gratis' in-game currency bestaat niet", "Vraagt om inloggegevens", "Onbetrouwbare link", "'Trust me bro' 🚩"],
  },
  {
    id: 9,
    type: "email",
    sender: "no-reply@stearn.com",
    subject: "Je Steam account is gecompromitteerd",
    content: "Beste Steam gebruiker,\n\nWe hebben detecteerd dat iemand geprobeerd heeft je account te hacken. Om je account te beveiligen, log in via onderstaande link:\n\nstearn-community.com/login\n\nJe inventaris ter waarde van €847 staat op het spel!",
    isPhishing: true,
    explanation: "Let op: 'stearn' i.p.v. 'steam'! Ze proberen je Steam inloggegevens te stelen om je skins en games te jatten.",
    redFlags: ["stearn i.p.v. steam", "Nep-link", "Noemen een geldbedrag om je bang te maken", "Geen persoonlijke info"],
  },
  // Nep-prijsvragen
  {
    id: 10,
    type: "message",
    sender: "Albert Heijn",
    subject: "SMS bericht",
    content: "Gefeliciteerd! U bent winnaar van de Albert Heijn loterij! U heeft €2500 aan boodschappentegoed gewonnen!\n\nClaim uw prijs: ah-winner.com/claim\n\nU moet €4.99 verzendkosten betalen om uw prijs te ontvangen.",
    isPhishing: true,
    explanation: "Je kunt geen loterij winnen waar je niet aan meedoet! Albert Heijn stuurt geen SMS'jes over prijzen en vraagt nooit geld om iets te 'claimen'.",
    redFlags: ["Loterij waar je niet aan meedeed", "Moet betalen om te 'winnen'", "Nep website", "SMS van bedrijf"],
  },
  {
    id: 11,
    type: "dm",
    sender: "@MrBeast",
    subject: "Instagram DM",
    content: "Hey! Ik geef $1000 weg aan mijn trouwe volgers! 🤑\n\nJe bent geselecteerd! Stuur me je PayPal email zodat ik het geld kan overmaken.\n\nDit is geen scam, ik doe dit voor mijn nieuwe video!",
    isPhishing: true,
    explanation: "Nep MrBeast account! Echte celebrities sturen NOOIT random DM's om geld te geven. Check of het account geverifieerd is (blauw vinkje).",
    redFlags: ["Celebrity stuurt random DM", "Vraagt om persoonlijke info", "Te mooi om waar te zijn", "Geen verificatie"],
  },
  {
    id: 12,
    type: "email",
    sender: "klantenservice@postnl.nl",
    subject: "Je pakket wacht op bezorging",
    content: "Hallo Jan,\n\nJe pakket met trackingnummer 3SPOSTXXXXXXXXX staat klaar bij het afhaalpunt.\n\nJe kunt het ophalen bij: Albert Heijn Stationsplein\nOpeningstijden: 8:00 - 21:00\n\nMet vriendelijke groet,\nPostNL",
    isPhishing: false,
    explanation: "Dit is echt! Correct e-mailadres, je naam, een echt trackingnummer formaat, en een specifiek afhaalpunt. Geen verdachte links of betalingsverzoeken.",
    redFlags: [],
  },
];

interface ScoreEntry {
  name: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
}

interface PhishingQuizProps {
  onClose: () => void;
}

const PhishingQuiz = ({ onClose }: PhishingQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [scoreboard, setScoreboard] = useState<ScoreEntry[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("phishing-scoreboard");
    if (saved) {
      setScoreboard(JSON.parse(saved));
    }
  }, []);

  const question = quizQuestions[currentQuestion];

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowExplanation(true);
    if (answer === question.isPhishing) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setIsComplete(true);
      setShowNameInput(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setIsComplete(false);
    setShowNameInput(false);
    setPlayerName("");
  };

  const handleSaveScore = () => {
    if (playerName.trim()) {
      const newEntry: ScoreEntry = {
        name: playerName.trim(),
        score,
        total: quizQuestions.length,
        percentage: Math.round((score / quizQuestions.length) * 100),
        date: new Date().toLocaleDateString("nl-NL"),
      };
      const updated = [...scoreboard, newEntry]
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 10);
      setScoreboard(updated);
      localStorage.setItem("phishing-scoreboard", JSON.stringify(updated));
      setShowNameInput(false);
    }
  };

  const shareText = `🎣 Ik scoorde ${score}/${quizQuestions.length} (${Math.round((score / quizQuestions.length) * 100)}%) op de Phishing Quiz! Kun jij phishing herkennen? Test jezelf! 🔒`;

  const handleShare = (platform: "twitter" | "facebook" | "copy") => {
    const url = window.location.href;
    
    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`, "_blank");
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`, "_blank");
    } else {
      navigator.clipboard.writeText(`${shareText}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isCorrect = selectedAnswer === question.isPhishing;
  const percentage = Math.round((score / quizQuestions.length) * 100);

  // Scoreboard view
  if (showScoreboard) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm overflow-y-auto">
        <div className="w-full max-w-lg bg-card border border-border rounded-2xl p-8 my-8 animate-scale-in">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-8 h-8 text-warning" />
            <h2 className="text-2xl font-bold text-foreground">Scorebord</h2>
          </div>

          {scoreboard.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Nog geen scores! Wees de eerste om de quiz te maken.
            </p>
          ) : (
            <div className="space-y-2">
              {scoreboard.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-3 rounded-lg ${
                    index === 0 ? "bg-warning/20" : index === 1 ? "bg-muted/50" : index === 2 ? "bg-orange-500/20" : "bg-secondary/50"
                  }`}
                >
                  <span className="text-2xl font-bold text-muted-foreground w-8">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                  </span>
                  <div className="flex-1">
                    <span className="font-semibold text-foreground">{entry.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">({entry.date})</span>
                  </div>
                  <span className="font-bold text-primary">{entry.percentage}%</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <Button variant="outline" onClick={() => setShowScoreboard(false)} className="flex-1">
              Terug
            </Button>
            <Button variant="default" onClick={onClose} className="flex-1">
              Sluiten
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz complete view
  if (isComplete) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm overflow-y-auto">
        <div className="w-full max-w-lg bg-card border border-border rounded-2xl p-8 my-8 text-center animate-scale-in">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${percentage >= 80 ? "bg-success/20" : percentage >= 60 ? "bg-warning/20" : "bg-destructive/20"} mb-6`}>
            <span className="text-4xl">{percentage >= 80 ? "🏆" : percentage >= 60 ? "👍" : "📚"}</span>
          </div>
          
          <h2 className="text-3xl font-bold text-foreground mb-2">Quiz Voltooid!</h2>
          <p className="text-xl text-muted-foreground mb-6">
            Je score: <span className="text-primary font-bold">{score}/{quizQuestions.length}</span> ({percentage}%)
          </p>

          <div className="p-4 rounded-lg bg-secondary mb-6">
            {percentage >= 80 ? (
              <p className="text-success">🎉 Uitstekend! Je bent een echte phishing detective!</p>
            ) : percentage >= 60 ? (
              <p className="text-warning">👍 Goed gedaan! Blijf oefenen om nog beter te worden.</p>
            ) : (
              <p className="text-destructive">📚 Bekijk de red flags nog eens en probeer opnieuw!</p>
            )}
          </div>

          {/* Save score */}
          {showNameInput && (
            <div className="mb-6 p-4 bg-secondary/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Sla je score op voor het scorebord:</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Je naam..."
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  maxLength={20}
                />
                <Button onClick={handleSaveScore} disabled={!playerName.trim()}>
                  Opslaan
                </Button>
              </div>
            </div>
          )}

          {/* Share buttons */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-3">Deel je score:</p>
            <div className="flex justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("twitter")}
                className="gap-2"
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("facebook")}
                className="gap-2"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("copy")}
                className="gap-2"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Gekopieerd!" : "Kopieer"}
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" onClick={handleRestart} className="flex-1">
              <RotateCcw className="w-4 h-4 mr-2" />
              Opnieuw
            </Button>
            <Button variant="ghost" onClick={() => setShowScoreboard(true)} className="flex-1">
              <Trophy className="w-4 h-4 mr-2" />
              Scorebord
            </Button>
            <Button variant="default" onClick={onClose} className="flex-1">
              Sluiten
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/95 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-2xl bg-card border border-border rounded-2xl p-6 md:p-8 my-8 animate-scale-in relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Vraag {currentQuestion + 1}/{quizQuestions.length}</span>
            <button
              onClick={() => setShowScoreboard(true)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              <Trophy className="w-4 h-4" />
              Scorebord
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Score:</span>
            <span className="font-bold text-primary">{score}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-secondary rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>

        {/* Question prompt */}
        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-warning" />
          Is dit phishing of echt?
        </h3>

        {/* Email/Message mockup */}
        <div className="bg-secondary/50 rounded-xl border border-border overflow-hidden mb-6">
          {/* Email header */}
          <div className="bg-secondary p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-sm">{question.sender}</div>
                {question.subject && (
                  <div className="text-muted-foreground text-sm">{question.subject}</div>
                )}
              </div>
            </div>
          </div>
          
          {/* Email content */}
          <div className="p-4">
            <p className="text-foreground whitespace-pre-line text-sm md:text-base">{question.content}</p>
          </div>
        </div>

        {/* Answer buttons */}
        {!showExplanation ? (
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="destructive"
              size="lg"
              onClick={() => handleAnswer(true)}
              className="h-16 text-lg"
            >
              🎣 Phishing!
            </Button>
            <Button
              variant="success"
              size="lg"
              onClick={() => handleAnswer(false)}
              className="h-16 text-lg"
            >
              ✓ Echt
            </Button>
          </div>
        ) : (
          <div className={`animate-slide-in ${isCorrect ? "animate-none" : "animate-shake"}`}>
            {/* Result */}
            <div className={`flex items-center gap-3 p-4 rounded-lg mb-4 ${isCorrect ? "bg-success/20" : "bg-destructive/20"}`}>
              {isCorrect ? (
                <>
                  <CheckCircle className="w-6 h-6 text-success" />
                  <span className="font-bold text-success">Goed gezien!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-destructive" />
                  <span className="font-bold text-destructive">Helaas, fout!</span>
                </>
              )}
            </div>

            {/* Explanation */}
            <div className="bg-secondary/50 rounded-lg p-4 mb-6">
              <p className="text-foreground">{question.explanation}</p>
              
              {question.redFlags && question.redFlags.length > 0 && (
                <div className="mt-4">
                  <span className="text-xs text-destructive font-semibold uppercase tracking-wider">Red Flags:</span>
                  <ul className="mt-2 space-y-1">
                    {question.redFlags.map((flag, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive" />
                        {flag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Next button */}
            <Button variant="cyber" size="lg" onClick={handleNext} className="w-full">
              {currentQuestion < quizQuestions.length - 1 ? (
                <>
                  Volgende vraag
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                "Bekijk resultaat"
              )}
            </Button>
          </div>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default PhishingQuiz;
