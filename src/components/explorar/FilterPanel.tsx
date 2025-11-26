import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { 
  ActivityFilters, 
  CATEGORIES, 
  AGE_RANGES, 
  DURATIONS, 
  DIFFICULTIES, 
  ACTIVITY_TYPES 
} from "@/types/activity";

interface FilterPanelProps {
  filters: ActivityFilters;
  onFiltersChange: (filters: ActivityFilters) => void;
  onToggle: () => void;
}

const FilterPanel = ({ filters, onFiltersChange, onToggle }: FilterPanelProps) => {
  const handleCheckboxChange = (filterType: keyof ActivityFilters, value: string) => {
    const currentValues = filters[filterType] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFiltersChange({
      ...filters,
      [filterType]: newValues,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      ageRanges: [],
      durations: [],
      difficulties: [],
      types: [],
      searchQuery: "",
    });
  };

  const hasActiveFilters = 
    filters.categories.length > 0 ||
    filters.ageRanges.length > 0 ||
    filters.durations.length > 0 ||
    filters.difficulties.length > 0 ||
    filters.types.length > 0 ||
    filters.searchQuery !== "";

  return (
    <Card className="p-6 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto border-2">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Filtros</h2>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Limpar
            </Button>
          )}
        </div>

        {/* Search */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">Buscar</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Procurar atividades..."
              value={filters.searchQuery}
              onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">Categoria</Label>
          <div className="space-y-3">
            {CATEGORIES.map((category) => (
              <div key={category.id} className="flex items-center gap-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={filters.categories.includes(category.id)}
                  onCheckedChange={() => handleCheckboxChange('categories', category.id)}
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className="text-sm cursor-pointer flex-1 flex items-center gap-2"
                >
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  {category.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Age Range */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">Faixa Etária</Label>
          <div className="space-y-3">
            {AGE_RANGES.map((age) => (
              <div key={age.id} className="flex items-center gap-2">
                <Checkbox
                  id={`age-${age.id}`}
                  checked={filters.ageRanges.includes(age.id)}
                  onCheckedChange={() => handleCheckboxChange('ageRanges', age.id)}
                />
                <label
                  htmlFor={`age-${age.id}`}
                  className="text-sm cursor-pointer flex-1"
                >
                  {age.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">Duração</Label>
          <div className="space-y-3">
            {DURATIONS.map((duration) => (
              <div key={duration.id} className="flex items-center gap-2">
                <Checkbox
                  id={`duration-${duration.id}`}
                  checked={filters.durations.includes(duration.id)}
                  onCheckedChange={() => handleCheckboxChange('durations', duration.id)}
                />
                <label
                  htmlFor={`duration-${duration.id}`}
                  className="text-sm cursor-pointer flex-1"
                >
                  {duration.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">Dificuldade</Label>
          <div className="space-y-3">
            {DIFFICULTIES.map((difficulty) => (
              <div key={difficulty.id} className="flex items-center gap-2">
                <Checkbox
                  id={`difficulty-${difficulty.id}`}
                  checked={filters.difficulties.includes(difficulty.id)}
                  onCheckedChange={() => handleCheckboxChange('difficulties', difficulty.id)}
                />
                <label
                  htmlFor={`difficulty-${difficulty.id}`}
                  className="text-sm cursor-pointer flex-1"
                >
                  {difficulty.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Type */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">Tipo de Atividade</Label>
          <div className="space-y-3">
            {ACTIVITY_TYPES.map((type) => (
              <div key={type.id} className="flex items-center gap-2">
                <Checkbox
                  id={`type-${type.id}`}
                  checked={filters.types.includes(type.id)}
                  onCheckedChange={() => handleCheckboxChange('types', type.id)}
                />
                <label
                  htmlFor={`type-${type.id}`}
                  className="text-sm cursor-pointer flex-1"
                >
                  {type.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FilterPanel;
