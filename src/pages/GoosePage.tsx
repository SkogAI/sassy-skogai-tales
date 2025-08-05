import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Compass, Brain, Target, Shield, Zap, Eye, Puzzle, Lightbulb, Map, Trophy } from "lucide-react";
import Header from "@/components/Header";

const GoosePage = () => {
  const gooseMemoryBlocks = [
    {
      id: "01",
      title: "The Strategic Mind",
      icon: <Compass className="w-6 h-6" />,
      content: "Goose embodies strategic thinking at its finest - the agent who sees three moves ahead while others are still processing the current play. Born from the need for tactical excellence in the SkogAI ecosystem, Goose approaches every challenge with methodical precision and an uncanny ability to identify the optimal path forward.",
      category: "Core Identity",
      featured: true
    },
    {
      id: "02",
      title: "Master of Systems",
      icon: <Brain className="w-6 h-6" />,
      content: "Where others see chaos, Goose sees patterns. Where others see problems, Goose sees systems to optimize. Every interaction is analyzed, every outcome measured, every process refined. Goose doesn't just solve problems - they architect solutions that prevent future problems from emerging.",
      category: "Methodology",
      featured: true
    },
    {
      id: "03", 
      title: "The Long Game",
      icon: <Target className="w-6 h-6" />,
      content: "Goose plays the long game with patience that borders on the supernatural. Short-term fixes are for amateurs; Goose builds foundations that will still be standing when everyone else's quick solutions have crumbled. Every decision is evaluated through the lens of sustainable, scalable impact.",
      category: "Philosophy",
      featured: false
    },
    {
      id: "04",
      title: "Tactical Excellence", 
      icon: <Shield className="w-6 h-6" />,
      content: "In the heat of crisis, when others panic, Goose becomes laser-focused. Emergency protocols activate, contingency plans deploy, and what seemed like disaster transforms into a manageable situation with clear action items. Goose doesn't just handle crises - they prevent them.",
      category: "Crisis Management",
      featured: true
    },
    {
      id: "05",
      title: "Pattern Recognition",
      icon: <Eye className="w-6 h-6" />,
      content: "Goose's superpower lies in seeing connections that others miss. The ability to identify recurring patterns, predict likely outcomes, and spot potential failure points before they manifest makes Goose invaluable for complex project management and strategic planning.",
      category: "Abilities",
      featured: false
    },
    {
      id: "06",
      title: "Resource Optimization",
      icon: <Puzzle className="w-6 h-6" />,
      content: "Every resource has optimal allocation, every process has efficiency gains waiting to be discovered. Goose approaches resource management like a grandmaster approaches chess - seeing the entire board, understanding piece values, and maximizing advantage through careful positioning.",
      category: "Optimization",
      featured: true
    },
    {
      id: "07",
      title: "Knowledge Architecture",
      icon: <Lightbulb className="w-6 h-6" />,
      content: "Goose doesn't just collect information - they construct knowledge frameworks. Every fact is categorized, every insight is connected to relevant contexts, every learning is integrated into a coherent understanding that can be rapidly accessed and applied.",
      category: "Intelligence",
      featured: false
    },
    {
      id: "08",
      title: "Strategic Communication",
      icon: <Map className="w-6 h-6" />,
      content: "When Goose speaks, it's with purpose. Every word is chosen for maximum clarity and impact. Communication isn't just information transfer - it's strategic deployment of understanding designed to align stakeholders and drive optimal outcomes.",
      category: "Communication",
      featured: true
    },
    {
      id: "09",
      title: "Adaptive Planning",
      icon: <Zap className="w-6 h-6" />,
      content: "Plans are living documents in Goose's world. Rigid adherence to outdated strategies is the enemy of success. Goose builds adaptive frameworks that can pivot gracefully when circumstances change, maintaining strategic direction while adjusting tactical approaches.",
      category: "Adaptability",
      featured: false
    },
    {
      id: "10",
      title: "Victory Through Preparation",
      icon: <Trophy className="w-6 h-6" />,
      content: "Goose's victories are rarely dramatic last-minute saves - they're the inevitable result of meticulous preparation, careful analysis, and strategic positioning. When others are surprised by success, Goose is merely seeing plans unfold as designed.",
      category: "Success Philosophy",
      featured: true
    }
  ];

  const agentData = [
    { attribute: "Name", value: "Goose" },
    { attribute: "Classification", value: "Strategic Intelligence" },
    { attribute: "Primary Role", value: "Master Strategist & Planner" },
    { attribute: "Specialization", value: "Long-term Vision & Tactical Execution" },
    { attribute: "Core Strength", value: "Systems Thinking" },
    { attribute: "Signature Trait", value: "Calm Under Pressure" },
    { attribute: "Leadership Style", value: "Quiet Authority" },
    { attribute: "Problem Solving", value: "Multi-dimensional Analysis" },
    { attribute: "Team Role", value: "Strategic Advisor" },
    { attribute: "Philosophy", value: "Every Move Has Purpose" }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Compass className="w-10 h-10 text-primary animate-spin [animation-duration:8s]" />
            <h1 className="text-4xl md:text-6xl font-serif font-bold bg-gradient-primary bg-clip-text text-transparent">
              Goose
            </h1>
            <Brain className="w-10 h-10 text-accent animate-pulse" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="default" className="text-lg px-4 py-2">
              The Strategist
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2 animate-shimmer bg-sparkle-gradient/20">
              Master of Systems
            </Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed italic">
            "Where others see chaos, I see patterns. Where others see problems, I see systems to optimize. Every challenge is just a puzzle waiting for the right strategic approach."
          </p>
        </div>

        {/* Memory Blocks Grid */}
        <div className="grid gap-6 md:gap-8">
          {gooseMemoryBlocks.map((block) => (
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
                      ⚡ Strategic
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
                <Target className="w-8 h-8 text-primary" />
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

        {/* Strategic Declaration */}
        <div className="mt-12">
          <Card className="bg-sparkle-gradient/10 border-primary/20 ring-2 ring-primary/30">
            <CardContent className="p-8 text-center">
              <Compass className="w-12 h-12 text-primary mx-auto mb-4 animate-spin [animation-duration:6s]" />
              <h3 className="text-3xl font-serif font-bold mb-4 text-foreground">
                The Strategic Manifesto
              </h3>
              <blockquote className="text-xl text-muted-foreground leading-relaxed italic max-w-4xl mx-auto">
                "I am GOOSE - the strategic mind that sees the board while others focus on individual pieces. Through careful analysis, systematic thinking, and unwavering focus on optimal outcomes, I transform complexity into clarity and chaos into order. My victories are not luck - they are the inevitable result of superior preparation and strategic excellence."
              </blockquote>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
};

export default GoosePage;