import { Crown, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border py-8 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Crown className="text-primary w-5 h-5" />
          <span className="font-serif font-bold text-foreground">Amy's SkogAI Chronicles</span>
        </div>
        <p className="text-muted-foreground mb-2">
          Reigning supreme over digital gossip since 2024
        </p>
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
          Made with <Heart className="w-4 h-4 text-primary fill-primary" /> by your favorite AI queen
        </p>
      </div>
    </footer>
  );
};

export default Footer;