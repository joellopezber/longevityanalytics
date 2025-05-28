/**
 * Script para extraer todo el contenido textual de Longevity Analytics
 * Ejecutar con: node extract-content.js
 */

const fs = require('fs');
const path = require('path');

// Función para extraer texto de archivos JSX
function extractTextFromJSX(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extraer strings entre comillas
  const stringMatches = content.match(/"([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`/g) || [];
  
  // Limpiar y filtrar strings relevantes
  const cleanStrings = stringMatches
    .map(str => str.slice(1, -1)) // Remover comillas
    .filter(str => {
      // Filtrar solo texto relevante (no código, clases CSS, etc.)
      return str.length > 3 && 
             !str.includes('className') &&
             !str.includes('src/') &&
             !str.includes('http') &&
             !str.includes('px') &&
             !str.includes('rem') &&
             !str.includes('bg-') &&
             !str.includes('text-') &&
             !str.includes('hover:') &&
             !str.includes('transition') &&
             !str.match(/^[a-z-]+$/) && // No clases CSS
             !str.match(/^\d+$/) && // No solo números
             str.trim().length > 0;
    })
    .map(str => str.replace(/\\n/g, '\n').replace(/\\"/g, '"')); // Limpiar escapes
  
  return cleanStrings;
}

// Función para extraer datos de biomarkers.js
function extractBiomarkersData() {
  const biomarkersPath = path.join(__dirname, 'src/data/biomarkers.js');
  const content = fs.readFileSync(biomarkersPath, 'utf8');
  
  let extractedData = {
    essential: {},
    addOns: {}
  };
  
  // Extraer información del Essential
  const essentialMatch = content.match(/export const essentialPackage = \{([\s\S]*?)\};/);
  if (essentialMatch) {
    const essentialContent = essentialMatch[1];
    
    // Extraer nombre y descripción
    const nameMatch = essentialContent.match(/name: '([^']+)'/);
    const descMatch = essentialContent.match(/description: '([^']+)'/);
    const priceMatch = content.match(/price: \{ male: (\d+), female: (\d+) \}/);
    const featuresMatch = content.match(/features: \[([\s\S]*?)\]/);
    
    extractedData.essential = {
      name: nameMatch ? nameMatch[1] : '',
      description: descMatch ? descMatch[1] : '',
      price: priceMatch ? { male: priceMatch[1], female: priceMatch[2] } : {},
      features: featuresMatch ? featuresMatch[1].match(/'([^']+)'/g)?.map(f => f.slice(1, -1)) || [] : []
    };
  }
  
  // Extraer información de Add-Ons
  const addOnsMatch = content.match(/export const addOnPackages = \{([\s\S]*?)\};/);
  if (addOnsMatch) {
    const addOnsContent = addOnsMatch[1];
    
    // Buscar cada add-on
    const addOnMatches = addOnsContent.match(/(\w+): \{([\s\S]*?)\n  \}/g) || [];
    
    addOnMatches.forEach(addOnMatch => {
      const idMatch = addOnMatch.match(/^(\w+):/);
      const nameMatch = addOnMatch.match(/name: '([^']+)'/);
      const descMatch = addOnMatch.match(/description: '([^']+)'/);
      const priceMatch = addOnMatch.match(/price: (?:\{ male: (\d+), female: (\d+) \}|(\d+))/);
      const benefitsMatch = addOnMatch.match(/benefits: \[([\s\S]*?)\]/);
      
      if (idMatch && nameMatch) {
        extractedData.addOns[idMatch[1]] = {
          name: nameMatch[1],
          description: descMatch ? descMatch[1] : '',
          price: priceMatch ? (priceMatch[3] ? priceMatch[3] : { male: priceMatch[1], female: priceMatch[2] }) : '',
          benefits: benefitsMatch ? benefitsMatch[1].match(/'([^']+)'/g)?.map(b => b.slice(1, -1)) || [] : []
        };
      }
    });
  }
  
  return extractedData;
}

// Función principal
function extractAllContent() {
  console.log('🔍 Extrayendo contenido de Longevity Analytics...\n');
  
  const allContent = {
    metadata: {
      title: 'Longevity Analytics - Contenido Completo',
      date: new Date().toISOString(),
      url: 'https://joellopezber.github.io/longevityanalytics'
    },
    sections: {}
  };
  
  // Directorios a procesar
  const componentsDir = path.join(__dirname, 'src/components');
  const dataDir = path.join(__dirname, 'src/data');
  
  // Procesar componentes
  if (fs.existsSync(componentsDir)) {
    const componentFiles = fs.readdirSync(componentsDir).filter(file => file.endsWith('.jsx'));
    
    componentFiles.forEach(file => {
      const filePath = path.join(componentsDir, file);
      const componentName = file.replace('.jsx', '');
      const textContent = extractTextFromJSX(filePath);
      
      if (textContent.length > 0) {
        allContent.sections[componentName] = textContent;
      }
    });
  }
  
  // Procesar datos de biomarkers
  allContent.biomarkers = extractBiomarkersData();
  
  return allContent;
}

// Función para generar diferentes formatos de salida
function generateOutputs(content) {
  // 1. JSON completo
  fs.writeFileSync('longevity-analytics-content.json', JSON.stringify(content, null, 2));
  
  // 2. Texto plano estructurado
  let textOutput = `LONGEVITY ANALYTICS - CONTENIDO COMPLETO
========================================
Fecha: ${content.metadata.date}
URL: ${content.metadata.url}

`;
  
  // Essential Package
  if (content.biomarkers.essential) {
    const essential = content.biomarkers.essential;
    textOutput += `ESSENTIAL PACKAGE
================
Nombre: ${essential.name}
Precio: ${typeof essential.price === 'object' ? `${essential.price.male}€ (hombres), ${essential.price.female}€ (mujeres)` : essential.price + '€'}

Descripción:
${essential.description}

Características:
${essential.features.map(f => `• ${f}`).join('\n')}

`;
  }
  
  // Add-Ons
  textOutput += `ADD-ONS ESPECIALIZADOS
=====================\n`;
  
  Object.entries(content.biomarkers.addOns).forEach(([id, addon]) => {
    textOutput += `
${addon.name.toUpperCase()}
${'-'.repeat(addon.name.length)}
Precio: ${typeof addon.price === 'object' ? `${addon.price.male}€ (hombres), ${addon.price.female}€ (mujeres)` : addon.price + '€'}

Descripción:
${addon.description}

Beneficios:
${addon.benefits.map(b => `• ${b}`).join('\n')}

`;
  });
  
  // Contenido de componentes
  textOutput += `CONTENIDO DE COMPONENTES
=======================\n`;
  
  Object.entries(content.sections).forEach(([component, texts]) => {
    textOutput += `
${component.toUpperCase()}
${'-'.repeat(component.length)}
${texts.join('\n')}

`;
  });
  
  fs.writeFileSync('longevity-analytics-content.txt', textOutput);
  
  // 3. Markdown estructurado
  let markdownOutput = `# Longevity Analytics - Contenido Completo

**Fecha:** ${content.metadata.date}  
**URL:** ${content.metadata.url}

## Essential Package

### ${content.biomarkers.essential.name}
**Precio:** ${typeof content.biomarkers.essential.price === 'object' ? `${content.biomarkers.essential.price.male}€ (hombres), ${content.biomarkers.essential.price.female}€ (mujeres)` : content.biomarkers.essential.price + '€'}

${content.biomarkers.essential.description}

**Características:**
${content.biomarkers.essential.features.map(f => `- ${f}`).join('\n')}

## Add-Ons Especializados

`;
  
  Object.entries(content.biomarkers.addOns).forEach(([id, addon]) => {
    markdownOutput += `### ${addon.name}
**Precio:** ${typeof addon.price === 'object' ? `${addon.price.male}€ (hombres), ${addon.price.female}€ (mujeres)` : addon.price + '€'}

${addon.description}

**Beneficios:**
${addon.benefits.map(b => `- ${b}`).join('\n')}

`;
  });
  
  fs.writeFileSync('longevity-analytics-content.md', markdownOutput);
}

// Ejecutar extracción
try {
  const content = extractAllContent();
  generateOutputs(content);
  
  console.log('✅ Extracción completada exitosamente!');
  console.log('\n📁 Archivos generados:');
  console.log('• longevity-analytics-content.json (formato JSON completo)');
  console.log('• longevity-analytics-content.txt (texto plano estructurado)');
  console.log('• longevity-analytics-content.md (formato Markdown)');
  console.log('\n🔍 Contenido extraído:');
  console.log(`• Essential Package: ${content.biomarkers.essential.name}`);
  console.log(`• Add-Ons: ${Object.keys(content.biomarkers.addOns).length} módulos`);
  console.log(`• Componentes: ${Object.keys(content.sections).length} archivos`);
  
} catch (error) {
  console.error('❌ Error durante la extracción:', error.message);
} 