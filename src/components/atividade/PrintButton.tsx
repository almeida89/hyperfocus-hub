import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface PrintButtonProps {
  activity: any;
}

const PrintButton = ({ activity }: PrintButtonProps) => {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${activity.title} - Hyperfocus Hub</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
              line-height: 1.6;
              color: #333;
            }
            h1 { 
              font-size: 32px; 
              margin-bottom: 10px;
              color: #1a1a1a;
            }
            h2 { 
              font-size: 24px; 
              margin: 30px 0 15px;
              color: #2a2a2a;
              border-bottom: 2px solid #f0c000;
              padding-bottom: 5px;
            }
            h3 { 
              font-size: 18px; 
              margin: 20px 0 10px;
              color: #3a3a3a;
            }
            .header {
              border-bottom: 3px solid #f0c000;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .meta {
              display: flex;
              gap: 20px;
              margin: 15px 0;
              font-size: 14px;
              color: #666;
            }
            .meta-item {
              display: flex;
              align-items: center;
              gap: 5px;
            }
            .badge {
              display: inline-block;
              padding: 4px 12px;
              background: #f5f5f5;
              border-radius: 20px;
              font-size: 12px;
              margin-right: 8px;
            }
            .description {
              margin: 20px 0;
              padding: 15px;
              background: #f9f9f9;
              border-left: 4px solid #f0c000;
              font-size: 16px;
            }
            ul {
              margin: 15px 0;
              padding-left: 25px;
            }
            li {
              margin: 10px 0;
              padding-left: 5px;
            }
            .step {
              margin: 20px 0;
              padding: 15px;
              background: #fafafa;
              border-radius: 8px;
              page-break-inside: avoid;
            }
            .step-number {
              display: inline-block;
              width: 30px;
              height: 30px;
              background: #f0c000;
              color: white;
              border-radius: 50%;
              text-align: center;
              line-height: 30px;
              font-weight: bold;
              margin-right: 10px;
            }
            .step-title {
              font-weight: bold;
              font-size: 16px;
              margin-bottom: 8px;
            }
            .step-duration {
              color: #666;
              font-size: 14px;
              margin-top: 5px;
            }
            .tips {
              background: #fff9e6;
              padding: 15px;
              border-radius: 8px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 2px solid #eee;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
            .checkbox {
              width: 16px;
              height: 16px;
              border: 2px solid #ccc;
              display: inline-block;
              margin-right: 10px;
              vertical-align: middle;
            }
            @media print {
              body { padding: 20px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${activity.title}</h1>
            <div class="meta">
              <span class="badge">${activity.difficulty}</span>
              <span class="badge">${activity.type}</span>
              <span class="badge">${activity.ageRange}</span>
              <span class="badge">⏱️ ${activity.duration}</span>
            </div>
          </div>

          <div class="description">
            <strong>Descrição:</strong> ${activity.description}
          </div>

          ${activity.longDescription ? `
            <p style="margin: 20px 0;">${activity.longDescription}</p>
          ` : ''}

          <h2>📋 Materiais Necessários</h2>
          <ul>
            ${activity.materials.map((material: string) => `
              <li><span class="checkbox"></span>${material}</li>
            `).join('')}
          </ul>

          <h2>🎯 Passo a Passo</h2>
          ${activity.steps.map((step: any, index: number) => `
            <div class="step">
              <div>
                <span class="step-number">${index + 1}</span>
                <span class="step-title">${step.title}</span>
              </div>
              <p style="margin: 10px 0 0 40px;">${step.description}</p>
              <div class="step-duration" style="margin-left: 40px;">⏱️ Tempo estimado: ${step.duration} minutos</div>
            </div>
          `).join('')}

          ${activity.learningObjectives ? `
            <h2>🎓 Objetivos de Aprendizagem</h2>
            <ul>
              ${activity.learningObjectives.map((obj: string) => `<li>${obj}</li>`).join('')}
            </ul>
          ` : ''}

          ${activity.tips ? `
            <div class="tips">
              <h3>💡 Dicas Importantes</h3>
              <ul style="margin-top: 10px;">
                ${activity.tips.map((tip: string) => `<li>${tip}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <div class="footer">
            <p><strong>Hyperfocus Hub</strong> - Explore seus interesses profundos</p>
            <p style="margin-top: 5px;">Impresso em ${new Date().toLocaleDateString('pt-BR')}</p>
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 250);
            }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
  };

  return (
    <Button 
      variant="outline" 
      size="lg"
      onClick={handlePrint}
    >
      <Printer className="h-5 w-5 mr-2" />
      Imprimir PDF
    </Button>
  );
};

export default PrintButton;
