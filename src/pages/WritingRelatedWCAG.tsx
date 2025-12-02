import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, ExternalLink, Search, X } from "lucide-react";

type WCAGLevel = "A" | "AA" | "AAA";
type WCAGCategory = "Structure & Semantics" | "Navigation & Links" | "Language & Readability" | "Instructions & Error Handling" | "Predictability & Consistency" | "Name, Role, Value";

interface WCAGCriterion {
  id: string;
  title: string;
  level: WCAGLevel;
  category: WCAGCategory;
  shortDescription: string;
  whyItMatters: string;
  writerResponsibilities: string[];
  officialLink: string;
}

const wcagCriteria: WCAGCriterion[] = [
  {
    id: "1.3.1",
    title: "Info and Relationships",
    level: "A",
    category: "Structure & Semantics",
    shortDescription: "Semantic structure must be communicated through markup (headings, lists, tables).",
    whyItMatters: "Writers determine the hierarchy and grouping of content. This criterion ensures that structure is conveyed programmatically, not just visually.",
    writerResponsibilities: [
      "Use true headings (not bold text)",
      "Write structured lists",
      "Preserve logical order of content",
      "Avoid implying relationships visually only"
    ],
    officialLink: "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html"
  },
  {
    id: "2.4.2",
    title: "Page Titled",
    level: "A",
    category: "Structure & Semantics",
    shortDescription: "Pages must have descriptive, meaningful titles.",
    whyItMatters: "Writers create titles; screen readers announce them. Page titles are the first thing users hear when navigating.",
    writerResponsibilities: [
      "Write unique, descriptive page titles",
      "Match title to primary page purpose"
    ],
    officialLink: "https://www.w3.org/WAI/WCAG21/Understanding/page-titled.html"
  },
  {
    id: "2.4.6",
    title: "Headings and Labels",
    level: "AA",
    category: "Structure & Semantics",
    shortDescription: "Headings and labels must describe purpose or topic.",
    whyItMatters: "This is core UX writing. Headings and labels are navigation landmarks for all users.",
    writerResponsibilities: [
      "Ensure headings reflect section content",
      "Write labels that describe what the field does",
      "Avoid poetic or vague headings"
    ],
    officialLink: "https://www.w3.org/WAI/WCAG21/Understanding/headings-and-labels.html"
  },
  {
    id: "2.4.4",
    title: "Link Purpose (In Context)",
    level: "A",
    category: "Navigation & Links",
    shortDescription: "Every link must explain where it goes or what it does.",
    whyItMatters: "Screen reader users often navigate by links only. Vague link text creates barriers to understanding.",
    writerResponsibilities: [
      "Avoid 'click here,' 'learn more,' 'lihat selengkapnya'",
      "Write descriptive link text in plain language"
    ],
    officialLink: "https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html"
  },
  {
    id: "2.4.9",
    title: "Link Purpose (Link Only)",
    level: "AAA",
    category: "Navigation & Links",
    shortDescription: "Link purpose must be clear from the link text alone. No context required.",
    whyItMatters: "For users navigating by links only, each link must be self-explanatory without surrounding context.",
    writerResponsibilities: [
      "Write self-contained, unambiguous links"
    ],
    officialLink: "https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-link-only.html"
  },
  {
    id: "3.1.1",
    title: "Language of Page",
    level: "A",
    category: "Language & Readability",
    shortDescription: "Each page must declare its main language.",
    whyItMatters: "Language tags affect pronunciation in screen readers. Incorrect language tags break comprehension.",
    writerResponsibilities: [
      "Ensure the primary language is consistent with content",
      "Avoid mixing languages unnecessarily"
    ],
    officialLink: "https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html"
  },
  {
    id: "3.1.2",
    title: "Language of Parts",
    level: "AA",
    category: "Language & Readability",
    shortDescription: "Foreign words or phrases must be marked with correct language attributes.",
    whyItMatters: "Screen readers need to know when to switch pronunciation. This is critical in multilingual products.",
    writerResponsibilities: [
      "Identify foreign-language fragments",
      "Recognize borrowed terms vs true foreign phrases"
    ],
    officialLink: "https://www.w3.org/WAI/WCAG21/Understanding/language-of-parts.html"
  },
  {
    id: "3.1.5",
    title: "Reading Level",
    level: "AAA",
    category: "Language & Readability",
    shortDescription: "Content should be understandable by people with lower literacy levels.",
    whyItMatters: "Plain language is good UX regardless of AAA compliance. It reduces cognitive load and increases inclusion.",
    writerResponsibilities: [
      "Use plain language",
      "Avoid jargon unless explained",
      "Break long sentences"
    ],
    officialLink: "https://www.w3.org/WAI/WCAG21/Understanding/reading-level.html"
  },
  {
    id: "3.3.1",
    title: "Error Identification",
    level: "A",
    category: "Instructions & Error Handling",
    shortDescription: "If an input error occurs, it must be clearly described.",
    whyItMatters: "Vague errors create frustration and barriers. Clear error messages are an accessibility requirement.",
    writerResponsibilities: [
      "Write explicit, specific error messages",
      "Avoid generic 'something went wrong'"
    ],
    officialLink: "https://www.w3.org/WAI/WCAG21/Understanding/error-identification.html"
  },
  {
    id: "3.3.2",
    title: "Labels or Instructions",
    level: "A",
    category: "Instructions & Error Handling",
    shortDescription: "Users must receive helpful labels and instructions before interacting.",
    whyItMatters: "Clear instructions prevent errors and reduce cognitive load. This is fundamental to accessible forms.",
    writerResponsibilities: [
      "Provide clear, concise instructions",
      "Write meaningful labels for inputs",
      "Make requirements obvious (e.g., formats, constraints)"
    ],
    officialLink: "https://www.w3.org/WAI/WCAG21/Understanding/labels-or-instructions.html"
  },
  {
    id: "3.3.3",
    title: "Error Suggestion",
    level: "AA",
    category: "Instructions & Error Handling",
    shortDescription: "When possible, suggest solutions for correcting errors.",
    whyItMatters: "Errors should be instructional, not punitive. Actionable corrections help users succeed.",
    writerResponsibilities: [
      "Write actionable corrections",
      "Use supportive tone, not blame"
    ],
    officialLink: "https://www.w3.org/WAI/WCAG21/Understanding/error-suggestion.html"
  },
  {
    id: "3.3.4",
    title: "Error Prevention (Legal, Financial, Data)",
    level: "AA",
    category: "Instructions & Error Handling",
    shortDescription: "Critical transactions must prevent errors.",
    whyItMatters: "For high-stakes actions, prevention is better than correction. Writers design the safety mechanisms.",
    writerResponsibilities: [
      "Write confirmation steps",
      "Provide clear explanations of consequences",
      "Help users review information before submission"
    ],
    officialLink: "https://www.w3.org/WAI/WCAG21/Understanding/error-prevention-legal-financial-data.html"
  },
  {
    id: "3.2.4",
    title: "Consistent Identification",
    level: "AA",
    category: "Predictability & Consistency",
    shortDescription: "Components and actions with the same functionality must be labeled consistently.",
    whyItMatters: "Inconsistent naming creates confusion and cognitive load. This requires content governance and glossaries.",
    writerResponsibilities: [
      "Use a glossary",
      "Align naming across pages and modules",
      "Avoid synonym mismatch ('Submit' vs 'Kirim')"
    ],
    officialLink: "https://www.w3.org/WAI/WCAG21/Understanding/consistent-identification.html"
  },
  {
    id: "4.1.2",
    title: "Name, Role, Value",
    level: "A",
    category: "Name, Role, Value",
    shortDescription: "UI components must expose name, role, and state programmatically.",
    whyItMatters: "Labels map to programmatic names. Writers ensure that what users see matches what assistive technology announces.",
    writerResponsibilities: [
      "Ensure labels are meaningful",
      "Avoid ambiguous or decorative naming"
    ],
    officialLink: "https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html"
  }
];

export default function WritingRelatedWCAG() {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    document.title = "WCAG Criteria for Writers | Prasaja";
  }, []);

  const filteredCriteria = useMemo(() => {
    return wcagCriteria.filter((criterion) => {
      const matchesSearch =
        searchQuery === "" ||
        criterion.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        criterion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        criterion.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        criterion.writerResponsibilities.some((resp) =>
          resp.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesLevel = levelFilter === "all" || criterion.level === levelFilter;
      const matchesCategory = categoryFilter === "all" || criterion.category === categoryFilter;

      return matchesSearch && matchesLevel && matchesCategory;
    });
  }, [searchQuery, levelFilter, categoryFilter]);

  const toggleCard = (id: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setLevelFilter("all");
    setCategoryFilter("all");
  };

  const hasActiveFilters = searchQuery !== "" || levelFilter !== "all" || categoryFilter !== "all";

  const getLevelBadgeVariant = (level: WCAGLevel) => {
    switch (level) {
      case "A":
        return "default";
      case "AA":
        return "secondary";
      case "AAA":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold font-mono tracking-tighter sm:text-4xl md:text-5xl mb-4">
            WCAG Criteria for Writers
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
            A curated list of WCAG success criteria specifically relevant to writing, content design, 
            semantics, labeling, structure, and comprehension. This page highlights where writing 
            practice affects accessibility compliance.
          </p>
        </div>

        {/* Disclaimer */}
        <Card className="mb-8 border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/20">
          <CardHeader>
            <CardTitle className="text-lg">Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>All WCAG Success Criteria are important</strong> and contribute to an inclusive, 
              accessible digital experience. This page does not replace or reduce the WCAG standard.
            </p>
            <p>
              Instead, this page highlights only the WCAG Success Criteria that directly relate to 
              writing, semantics, clarity, structure, and content design. For full accessibility compliance, 
              always refer to the{" "}
              <a 
                href="https://www.w3.org/WAI/WCAG21/quickref/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                official WCAG specification
              </a>{" "}
              and consult with certified accessibility professionals.
            </p>
          </CardContent>
        </Card>

        {/* Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by ID, keyword, or responsibility..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                aria-label="Search WCAG criteria"
              />
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-full sm:w-[180px]" aria-label="Filter by WCAG level">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="A">Level A</SelectItem>
                <SelectItem value="AA">Level AA</SelectItem>
                <SelectItem value="AAA">Level AAA</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]" aria-label="Filter by category">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Structure & Semantics">Structure & Semantics</SelectItem>
                <SelectItem value="Navigation & Links">Navigation & Links</SelectItem>
                <SelectItem value="Language & Readability">Language & Readability</SelectItem>
                <SelectItem value="Instructions & Error Handling">Instructions & Error Handling</SelectItem>
                <SelectItem value="Predictability & Consistency">Predictability & Consistency</SelectItem>
                <SelectItem value="Name, Role, Value">Name, Role, Value</SelectItem>
              </SelectContent>
            </Select>
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full sm:w-auto"
                aria-label="Clear all filters"
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
          {filteredCriteria.length !== wcagCriteria.length && (
            <p className="text-sm text-muted-foreground">
              Showing {filteredCriteria.length} of {wcagCriteria.length} criteria
            </p>
          )}
        </div>

        {/* WCAG Cards Grid */}
        {filteredCriteria.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No criteria match your filters. Try adjusting your search or filters.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredCriteria.map((criterion) => {
              const isExpanded = expandedCards.has(criterion.id);
              const cardId = `wcag-${criterion.id.replace(/\./g, '-')}`;
              return (
                <Collapsible
                  key={criterion.id}
                  open={isExpanded}
                  onOpenChange={() => toggleCard(criterion.id)}
                >
                  <Card id={cardId} className="flex flex-col h-full scroll-mt-20">
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <CardTitle className="text-xl">
                                {criterion.id} – {criterion.title}
                              </CardTitle>
                              <Badge variant={getLevelBadgeVariant(criterion.level)}>
                                {criterion.level}
                              </Badge>
                            </div>
                            <CardDescription className="mt-2">
                              {criterion.shortDescription}
                            </CardDescription>
                            <Badge variant="outline" className="mt-2">
                              {criterion.category}
                            </Badge>
                          </div>
                          <div className="flex-shrink-0">
                            {isExpanded ? (
                              <ChevronUp className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                            ) : (
                              <ChevronDown className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="space-y-4">
                        <div>
                          <h3 className="font-semibold mb-2">Why It Matters to Writers</h3>
                          <p className="text-sm text-muted-foreground">{criterion.whyItMatters}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">Writer Responsibilities</h3>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {criterion.writerResponsibilities.map((responsibility, index) => (
                              <li key={index}>{responsibility}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-4 border-t">
                          <a
                            href={criterion.officialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            View official WCAG documentation
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              );
            })}
          </div>
        )}

        {/* Footer Information */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p className="mb-2">
            For complete WCAG compliance, refer to the{" "}
            <a
              href="https://www.w3.org/WAI/WCAG21/quickref/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              official WCAG 2.1 specification
            </a>
            .
          </p>
          <p>
            This page was created to help writers, UX writers, content designers, and product teams 
            understand which WCAG requirements directly intersect with writing decisions.
          </p>
        </div>
      </div>
    </div>
  );
}

