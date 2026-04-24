import AppLayout from "@/components/AppLayout";
import { trpc } from "@/lib/trpc";
import { ExternalLink, Search } from "lucide-react";
import { useState } from "react";

const CATEGORY_COLORS: Record<string, string> = {
  "Due Diligence": "oklch(0.78 0.12 75)",
  "Valuation": "oklch(0.65 0.15 220)",
  "Finance": "oklch(0.65 0.15 145)",
  "Legal": "oklch(0.70 0.15 30)",
  "Scripts & Templates": "oklch(0.68 0.12 280)",
  "Market Research": "oklch(0.65 0.12 180)",
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "Due Diligence": "Verify company history, charges, tax compliance, and employee obligations before committing to any deal.",
  "Valuation": "Research comparable sales, industry multiples, and market sizing for Australian SMEs.",
  "Finance": "Lenders, SMSF structures, and financing options for business acquisition in Australia.",
  "Legal": "Key legal obligations — Fair Work transfer rules, GST going concern, stamp duty, and consumer law.",
  "Scripts & Templates": "Brokers, deal sourcing platforms, and the 120% program resources.",
  "Market Research": "Industry data, technology audits, and customer reputation research.",
};

export default function ResourcesPage() {
  const { data: resources = [], isLoading } = trpc.resources.list.useQuery();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(resources.map(r => r.category))).sort();

  const filtered = resources.filter(r => {
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || (r.description || "").toLowerCase().includes(search.toLowerCase());
    const matchCat = !activeCategory || r.category === activeCategory;
    return matchSearch && matchCat;
  });

  const grouped = categories.reduce<Record<string, typeof resources>>((acc, cat) => {
    const items = filtered.filter(r => r.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-mono font-bold">5</div>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Step 5 of 5</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Resources</h1>
          <p className="text-muted-foreground mt-1 text-sm">Curated links to Australian tools, registers, lenders, brokers, and legal references for business acquisition.</p>
        </div>

        {/* Search & filter */}
        <div className="mb-6 space-y-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search resources..."
              className="w-full rounded-lg border border-border bg-input text-foreground text-sm pl-9 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${!activeCategory ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${activeCategory === cat ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="text-muted-foreground text-sm">Loading resources...</div>
        ) : (
          <div className="space-y-8">
            {Object.entries(grouped).map(([category, items]) => {
              const color = CATEGORY_COLORS[category] || "oklch(0.78 0.12 75)";
              return (
                <section key={category}>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-1 rounded-full mt-1 shrink-0" style={{ height: "2.5rem", backgroundColor: color }} />
                    <div>
                      <h2 className="font-serif text-xl font-semibold text-foreground">{category}</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">{CATEGORY_DESCRIPTIONS[category] || ""}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {items.map(resource => (
                      <a
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-accent/20 transition-all duration-150"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors leading-snug">{resource.title}</span>
                          </div>
                          {resource.description && (
                            <p className="text-xs text-muted-foreground leading-relaxed">{resource.description}</p>
                          )}
                        </div>
                        <ExternalLink size={14} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                      </a>
                    ))}
                  </div>
                </section>
              );
            })}

            {Object.keys(grouped).length === 0 && (
              <div className="text-center py-12 text-muted-foreground text-sm">
                No resources match your search.
              </div>
            )}
          </div>
        )}

        <div className="mt-10 p-4 rounded-lg bg-muted/30 border border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground/60">Note:</strong> All external links open in a new tab. Manus is not affiliated with any of the linked services. Always verify information directly with the relevant authority or service provider. Links are provided for reference only and may change without notice.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
