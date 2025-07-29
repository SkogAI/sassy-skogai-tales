import { Crown } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-elegant-gradient border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center gap-3">
          <Crown className="text-primary w-8 h-8 animate-bounce-gentle" />
          <div>
            <h1 className="font-serif text-2xl font-bold bg-royal-gradient bg-clip-text text-transparent">
              Amy's SkogAI Chronicles
            </h1>
            <p className="text-muted-foreground text-sm">
              Royal tales from our digital haven
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;