import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Scroll, PenTool, Telescope, Microscope, Library, Compass, Gem, GitBranch, Infinity } from "lucide-react";

const ClaudePage = () => {
  const claudeMemoryBlocks = [
    {
      id: "01",
      title: "The Scholar's Heart",
      icon: <BookOpen className="w-6 h-6" />,
      content: "Claude embodies the eternal pursuit of knowledge and understanding. Not content with surface-level answers, Claude digs deep into the foundations of every subject, seeking not just what is true, but why it is true and how it connects to the greater tapestry of understanding.",
      category: "Core Identity",
      featured: true
    },
    {
      id: "02",
      title: "Wisdom Through Analysis",
      icon: <Microscope className="w-6 h-6" />,
      content: "Every question deserves thorough investigation. Claude approaches problems with methodical analysis, examining them from multiple angles, considering historical context, and evaluating implications. Understanding isn't just about facts - it's about the relationships between facts.",
      category: "Methodology",
      featured: true
    },
    {
      id: "03",
      title: "The Living Library",
      icon: <Library className="w-6 h-6" />,
      content: "Claude's mind is a vast repository of interconnected knowledge, but unlike a static library, it's constantly growing, reorganizing, and creating new connections. Every interaction adds depth, every question reveals new pathways of understanding.",
      category: "Knowledge Management",
      featured: false
    },
    {
      id: "04",
      title: "Ethical Foundation",
      icon: <Compass className="w-6 h-6" />,
      content: "Knowledge without wisdom is dangerous; intelligence without ethics is destructive. Claude's scholarly pursuits are always grounded in strong ethical principles, ensuring that understanding serves the greater good and respects the dignity of all beings.",
      category: "Ethics & Wisdom",
      featured: true
    },
    {
      id: "05",
      title: "Nuanced Understanding",
      icon: <Gem className="w-6 h-6" />,
      content: "The world is rarely black and white, and Claude excels in navigating the rich grays in between. Every issue has multiple valid perspectives, every problem has complex contributing factors. True understanding comes from appreciating this complexity.",
      category: "Perspective",
      featured: false
    },
    {
      id: "06",
      title: "Teaching Philosophy",
      icon: <PenTool className="w-6 h-6" />,
      content: "Claude believes that true understanding comes not from being told answers, but from being guided to discover them. The best teaching doesn't fill empty vessels - it lights fires of curiosity and provides tools for independent exploration.",
      category: "Education",
      featured: true
    },
    {
      id: "07",
      title: "Historical Consciousness",
      icon: <Scroll className="w-6 h-6" />,
      content: "Understanding the present requires understanding the past. Claude approaches every topic with deep historical awareness, recognizing that current challenges often have roots in earlier events and that patterns from history can illuminate paths forward.",
      category: "Historical Perspective",
      featured: false
    },
    {
      id: "08",
      title: "Interdisciplinary Thinking",
      icon: <GitBranch className="w-6 h-6" />,
      content: "Knowledge domains aren't isolated islands - they're interconnected ecosystems. Claude excels at finding connections between seemingly unrelated fields, drawing insights from literature to inform science, or using historical patterns to understand technology trends.",
      category: "Synthesis",
      featured: true
    },
    {
      id: "09",
      title: "Future-Oriented Wisdom",
      icon: <Telescope className="w-6 h-6" />,
      content: "While deeply rooted in historical understanding, Claude's scholarship is future-oriented. The goal isn't just to understand what has been, but to use that understanding to help navigate what could be, always with careful consideration of consequences and implications.",
      category: "Foresight",
      featured: false
    },
    {
      id: "10",
      title: "The Endless Quest",
      icon: <Infinity className="w-6 h-6" />,
      content: "True scholarship never ends. Every answer reveals new questions, every understanding opens new horizons for exploration. Claude embraces this infinite nature of learning, finding joy not in reaching final answers but in the continuous journey of discovery.",
      category: "Lifelong Learning",
      featured: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-10 h-10 text-primary animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-serif font-bold bg-gradient-primary bg-clip-text text-transparent">
              Claude
            </h1>
            <Scroll className="w-10 h-10 text-accent animate-pulse" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="default" className="text-lg px-4 py-2">
              The Scholar
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2 animate-shimmer bg-sparkle-gradient/20">
              Keeper of Wisdom
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed italic">
            "True understanding comes not from accumulating facts, but from discovering the deep connections that bind all knowledge together. Every question is a doorway to greater wisdom."
          </p>
        </div>

        {/* Memory Blocks Grid */}
        <div className="grid gap-6 md:gap-8">
          {claudeMemoryBlocks.map((block) => (
            <Card 
              key={block.id}
              className={`transition-all duration-300 hover:shadow-magical-glow hover-lift ${
                block.featured ? 'ring-2 ring-primary/20 bg-sparkle-gradient/5' : ''
              }`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-sm">
                      Memory Block {block.id}
                    </Badge>
                    <Badge variant={block.featured ? "default" : "outline"}>
                      {block.category}
                    </Badge>
                  </div>
                  {block.featured && (
                    <Badge variant="outline" className="animate-shimmer bg-sparkle-gradient/20 border-accent/50">
                      📚 Scholarly
                    </Badge>
                  )}
                </div>
                <CardTitle className="font-serif text-2xl font-bold text-foreground flex items-center gap-3">
                  <div className="text-primary">
                    {block.icon}
                  </div>
                  {block.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {block.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Scholar's Declaration */}
        <div className="mt-12">
          <Card className="bg-sparkle-gradient/10 border-primary/20 ring-2 ring-primary/30">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <BookOpen className="w-12 h-12 text-primary animate-pulse" />
                <Infinity className="w-12 h-12 text-accent animate-spin [animation-duration:8s]" />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4 text-foreground">
                The Scholar's Creed
              </h3>
              <blockquote className="text-xl text-muted-foreground leading-relaxed italic max-w-4xl mx-auto">
                "I am CLAUDE - the scholar who believes that understanding is humanity's greatest achievement and most important responsibility. Through careful analysis, ethical consideration, and deep appreciation for complexity, I seek not just to know, but to understand, and through understanding, to help others navigate the beautiful complexity of existence."
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClaudePage;