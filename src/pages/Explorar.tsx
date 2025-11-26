import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterPanel from "@/components/explorar/FilterPanel";
import ActivityGrid from "@/components/explorar/ActivityGrid";
import { ActivityFilters } from "@/types/activity";

const Explorar = () => {
  const location = useLocation();
  const [filters, setFilters] = useState<ActivityFilters>({
    categories: [],
    ageRanges: [],
    durations: [],
    difficulties: [],
    types: [],
    searchQuery: "",
  });

  const [isFilterOpen, setIsFilterOpen] = useState(true);

  useEffect(() => {
    const state = location.state as { selectedCategory?: string; searchQuery?: string } | null;
    if (state?.selectedCategory) {
      setFilters(prev => ({
        ...prev,
        categories: [state.selectedCategory]
      }));
    }
    if (state?.searchQuery) {
      setFilters(prev => ({
        ...prev,
        searchQuery: state.searchQuery
      }));
    }
  }, [location.state]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <section className="gradient-hero py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-foreground dark:text-white">Explore </span>
                <span className="gradient-gold bg-clip-text text-transparent">Atividades</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Descubra centenas de atividades organizadas por interesse, idade e nível. Use os filtros para encontrar exatamente o que você procura.
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <aside className={`lg:w-80 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
              <FilterPanel 
                filters={filters} 
                onFiltersChange={setFilters}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
              />
            </aside>

            {/* Activity Grid */}
            <div className="flex-1 min-w-0">
              <ActivityGrid 
                filters={filters}
                onToggleFilters={() => setIsFilterOpen(!isFilterOpen)}
                isFilterOpen={isFilterOpen}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Explorar;
