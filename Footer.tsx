import { Shield, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-foreground">Phishing Detective</span>
          </div>

          {/* Message */}
          <p className="text-muted-foreground text-sm text-center flex items-center gap-2">
            Gemaakt met <Heart className="w-4 h-4 text-destructive fill-destructive" /> om jongeren te beschermen
          </p>

          {/* Links */}
          <div className="flex gap-6 text-sm">
            <a 
              href="https://www.fraudehelpdesk.nl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Fraudehelpdesk
            </a>
            <a 
              href="https://veiliginternetten.nl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Veilig Internetten
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
