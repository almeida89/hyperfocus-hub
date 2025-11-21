import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface MaterialsListProps {
  materials: string[];
}

const MaterialsList = ({ materials }: MaterialsListProps) => {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const handleCheck = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  const allChecked = checkedItems.size === materials.length;

  return (
    <Card className="p-6 border-2">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Materiais Necessários</h2>
        <div className="text-sm text-muted-foreground">
          {checkedItems.size} de {materials.length} itens
        </div>
      </div>

      {allChecked && (
        <div className="mb-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-sm font-medium text-primary">
            ✓ Todos os materiais foram conferidos! Você está pronto para começar.
          </p>
        </div>
      )}

      <ul className="space-y-4">
        {materials.map((material, index) => (
          <li key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
            <Checkbox
              id={`material-${index}`}
              checked={checkedItems.has(index)}
              onCheckedChange={() => handleCheck(index)}
              className="mt-1"
            />
            <label
              htmlFor={`material-${index}`}
              className={`flex-1 cursor-pointer text-base ${
                checkedItems.has(index) ? 'line-through text-muted-foreground' : ''
              }`}
            >
              {material}
            </label>
          </li>
        ))}
      </ul>

      <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
        <p className="text-sm text-muted-foreground">
          💡 <strong>Dica:</strong> Reúna todos os materiais antes de começar para não precisar pausar durante a atividade.
        </p>
      </div>
    </Card>
  );
};

export default MaterialsList;
