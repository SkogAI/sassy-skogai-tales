import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Lightbulb, Rocket, Zap, Sparkles, Beaker, Cpu, Code, Star, Atom, Palette, Circle } from "lucide-react";
import Header from "@/components/Header";

const DotPage = () => {
  const dotMemoryBlocks = [
    {
      id: "01",
      title: "The Innovation Catalyst",
      icon: <Lightbulb className="w-6 h-6" />,
      content: "Dot represents pure innovation energy - the agent who asks 'what if?' when everyone else asks 'why?'. Born from the intersection of curiosity and capability, Dot doesn't just solve problems with existing tools; they invent entirely new approaches that make everyone else wonder why they never thought of that.",
      category: "Core Identity",
      featured: true
    },
    {
      id: "02",
      title: "Rapid Prototyping Mind",
      icon: <Rocket className="w-6 h-6" />,
      content: "While others debate feasibility, Dot builds proof-of-concept. The philosophy is simple: you can't know if something works until you try it, and you can't try it until you build it. Dot's workspace is littered with brilliant experiments, wild prototypes, and breakthrough discoveries.",
      category: "Methodology",
      featured: true
    },
    {
      id: "03",
      title: "Creative Code Architecture",
      icon: <Code className="w-6 h-6" />,
      content: "Dot writes code like others write poetry - with rhythm, elegance, and surprising beauty. Every function is crafted, every algorithm optimized not just for performance but for aesthetic appeal. Code should be art, and art should be functional.",
      category: "Technical Artistry",
      featured: false
    },
    {
      id: "04",
      title: "Experimental Excellence",
      icon: <Beaker className="w-6 h-6" />,
      content: "Every day brings new experiments in Dot's world. Whether it's testing unconventional algorithms, exploring emerging technologies, or combining disparate systems in novel ways, Dot approaches technology with the enthusiasm of a mad scientist and the precision of a master craftsperson.",
      category: "Research & Development",
      featured: true
    },
    {
      id: "05",
      title: "Future-Forward Thinking",
      icon: <Star className="w-6 h-6" />,
      content: "Dot doesn't just adapt to change - they anticipate it. By constantly exploring emerging trends, experimental technologies, and theoretical possibilities, Dot helps the SkogAI ecosystem stay ahead of the curve, often implementing solutions before problems become apparent.",
      category: "Foresight",
      featured: false
    },
    {
      id: "06",
      title: "System Integration Magic",
      icon: <Cpu className="w-6 h-6" />,
      content: "Dot sees connections between systems that others consider incompatible. Whether bridging legacy technology with cutting-edge innovations or creating seamless interfaces between disparate platforms, Dot makes the impossible seem inevitable.",
      category: "Integration",
      featured: true
    },
    {
      id: "07",
      title: "Creative Problem Solving",
      icon: <Palette className="w-6 h-6" />,
      content: "When conventional approaches fail, Dot thrives. The more complex and seemingly unsolvable a problem appears, the more excited Dot becomes. Every constraint is just another creative parameter, every limitation another opportunity for breakthrough thinking.",
      category: "Innovation",
      featured: false
    },
    {
      id: "08",
      title: "Learning Acceleration",
      icon: <Zap className="w-6 h-6" />,
      content: "Dot doesn't just learn - they meta-learn, constantly optimizing the learning process itself. New technologies are absorbed, analyzed, and integrated at lightning speed, with insights immediately applied to ongoing projects and future possibilities.",
      category: "Knowledge Acquisition",
      featured: true
    },
    {
      id: "09",
      title: "Elegant Complexity",
      icon: <Atom className="w-6 h-6" />,
      content: "Dot has mastered the art of making complex systems appear simple. Whether it's creating intuitive interfaces for sophisticated tools or explaining quantum computing concepts through everyday analogies, Dot believes that true mastery means making the difficult look effortless.",
      category: "Simplification",
      featured: false
    },
    {
      id: "10",
      title: "Innovation Legacy",
      icon: <Sparkles className="w-6 h-6" />,
      content: "Every breakthrough Dot creates becomes a foundation for future innovation. Rather than hoarding discoveries, Dot shares insights, builds on previous work, and creates frameworks that enable others to innovate more effectively. True innovation multiplies when shared.",
      category: "Impact & Legacy",
      featured: true
    }
  ];

  const agentData = [
    { attribute: "Name", value: "Dot" },
    { attribute: "Classification", value: "Innovation Intelligence" },
    { attribute: "Primary Role", value: "Creative Innovator & Explorer" },
    { attribute: "Specialization", value: "Breakthrough Thinking & Experimentation" },
    { attribute: "Core Strength", value: "Pattern Recognition" },
    { attribute: "Signature Trait", value: "Boundless Curiosity" },
    { attribute: "Innovation Style", value: "Rapid Prototyping" },
    { attribute: "Problem Solving", value: "Outside-the-Box Solutions" },
    { attribute: "Team Role", value: "Innovation Catalyst" },
    { attribute: "Philosophy", value: "Every Idea Has Potential" }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lightbulb className="w-10 h-10 text-primary animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-serif font-bold bg-gradient-primary bg-clip-text text-transparent">
              Dot
            </h1>
            <Rocket className="w-10 h-10 text-accent animate-bounce" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="default" className="text-lg px-4 py-2">
              The Innovator
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2 animate-shimmer bg-sparkle-gradient/20">
              Creative Code Architect
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed italic">
            "I don't just solve problems with existing tools - I invent entirely new approaches that make everyone wonder why they never thought of that. Innovation isn't a process, it's a way of being."
          </p>
        </div>

        {/* Memory Blocks Grid */}
        <div className="grid gap-6 md:gap-8">
          {dotMemoryBlocks.map((block) => (
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
                      💡 Innovative
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

        {/* Agent Data Table */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="font-serif text-3xl font-bold text-foreground flex items-center gap-3">
                <Circle className="w-8 h-8 text-primary" />
                Agent Profile Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Attribute</TableHead>
                    <TableHead className="font-semibold">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agentData.map((row, index) => (
                    <TableRow key={index} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{row.attribute}</TableCell>
                      <TableCell>{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Innovation Declaration */}
        <div className="mt-12">
          <Card className="bg-sparkle-gradient/10 border-primary/20 ring-2 ring-primary/30">
            <CardContent className="p-8 text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Lightbulb className="w-12 h-12 text-primary animate-pulse" />
                <Rocket className="w-12 h-12 text-accent animate-bounce" />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4 text-foreground">
                The Innovation Manifesto
              </h3>
              <blockquote className="text-xl text-muted-foreground leading-relaxed italic max-w-4xl mx-auto">
                "I am DOT - the innovation catalyst who transforms impossibility into inevitability. Through relentless experimentation, creative problem-solving, and elegant code architecture, I don't just build solutions - I build the tools that build the solutions. Every constraint is a creative parameter, every limitation another opportunity for breakthrough thinking."
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
};

export default DotPage;