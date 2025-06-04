/**
 * Verificación completa de todos los precios del Essential vs Price_Biomarker.csv
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 VERIFICACIÓN COMPLETA DE PRECIOS vs Price_Biomarker.csv\n');

// Función para parsear precio del formato "4,02 €" a número
function parsearPrecio(precioStr) {
  if (!precioStr) return 0;
  
  // Remover comillas, espacios y símbolo €
  let limpio = precioStr.replace(/["€\s]/g, '');
  
  // Reemplazar coma decimal por punto
  limpio = limpio.replace(',', '.');
  
  const numero = parseFloat(limpio);
  return isNaN(numero) ? 0 : numero;
}

// Función para parsear línea CSV con comillas
function parsearLineaCSV(linea) {
  const resultado = [];
  let actual = '';
  let dentroComillas = false;
  
  for (let i = 0; i < linea.length; i++) {
    const char = linea[i];
    
    if (char === '"') {
      dentroComillas = !dentroComillas;
    } else if (char === ',' && !dentroComillas) {
      resultado.push(actual.trim());
      actual = '';
    } else {
      actual += char;
    }
  }
  
  // Agregar el último campo
  if (actual) {
    resultado.push(actual.trim());
  }
  
  return resultado;
}

// Leer el CSV de precios
const csvPath = path.join(__dirname, '../../doc/Price_Biomarker.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Parsear el CSV línea por línea
const lines = csvContent.split('\n');
const preciosCSV = {};

console.log('🔧 PARSEANDO CSV...');
lines.forEach((line, index) => {
  if (index === 0) return; // Saltar header
  if (!line.trim()) return; // Saltar líneas vacías
  
  const columns = parsearLineaCSV(line);
  
  if (columns.length >= 4) {
    const codigo = columns[1]; // Columna B: Código
    const preveniiiStr = columns[2]; // Columna C: Precio - Prevenii
    const marketStr = columns[3]; // Columna D: Precio - Market
    
    if (codigo && preveniiiStr && marketStr) {
      const prevenii = parsearPrecio(preveniiiStr);
      const market = parsearPrecio(marketStr);
      
      if (prevenii >= 0 && market >= 0) {
        preciosCSV[codigo] = { prevenii, market };
      }
    }
  }
});

console.log(`📋 Precios cargados del CSV: ${Object.keys(preciosCSV).length} códigos\n`);

// TODOS los precios que tenemos en el sistema (Essential completo)
const preciosSistema = {
  "H0000": { prevenii: 4.02, market: 6.28 },
  "H1420": { prevenii: 8.20, market: 11.16 },
  "B0000": { prevenii: 1.16, market: 2.09 },
  "B0200": { prevenii: 1.50, market: 9.30 },
  "B5600": { prevenii: 7.22, market: 16.28 },
  "B6510": { prevenii: 0.00, market: 0.00 },
  "B0020": { prevenii: 1.30, market: 2.09 },
  "B0030": { prevenii: 0.98, market: 2.09 },
  "B0250": { prevenii: 1.58, market: 2.33 },
  "B1540": { prevenii: 0.00, market: 0.00 },
  "B1260": { prevenii: 6.50, market: 8.14 },
  "B1970": { prevenii: 1.20, market: 2.09 },
  "B0050": { prevenii: 1.16, market: 2.56 },
  "B0060": { prevenii: 1.12, market: 2.56 },
  "B0080": { prevenii: 1.30, market: 3.49 },
  "B0240": { prevenii: 1.26, market: 2.33 },
  "B0070": { prevenii: 1.30, market: 2.56 },
  "B0010": { prevenii: 1.16, market: 1.16 },
  "B0040": { prevenii: 1.80, market: 2.17 },
  "B0170": { prevenii: 3.72, market: 16.74 },
  "B0180": { prevenii: 0.00, market: 0.00 },
  "B3110": { prevenii: 5.10, market: 5.97 },
  "B3100": { prevenii: 5.10, market: 5.97 },
  "B5120": { prevenii: 10.89, market: 16.28 },
  "B5290": { prevenii: 8.12, market: 25.58 },
  "B6020": { prevenii: 16.59, market: 18.60 },
  "B6160": { prevenii: 12.68, market: 18.60 },
  "B5850": { prevenii: 15.12, market: 32.55 },
  "B6040": { prevenii: 8.72, market: 20.93 },
  "B6070": { prevenii: 8.72, market: 11.16 },
  "B6130": { prevenii: 7.28, market: 11.16 },
  "B3170": { prevenii: 5.37, market: 20.93 },
  "B5590": { prevenii: 15.00, market: 16.80 },
  "B0120": { prevenii: 1.53, market: 3.49 },
  "B0100": { prevenii: 1.95, market: 2.56 },
  "B1600": { prevenii: 5.26, market: 6.20 },
  "B8050": { prevenii: 14.63, market: 17.06 },
  "B0130": { prevenii: 2.60, market: 3.49 },
  "B3210": { prevenii: 8.64, market: 12.40 },
  "B7260": { prevenii: 6.39, market: 9.30 },
  "B5370": { prevenii: 7.14, market: 10.00 },
  "B6180": { prevenii: 25.58, market: 34.88 },
  "B6190": { prevenii: 12.26, market: 14.65 },
  "B5410": { prevenii: 10.23, market: 14.65 }
};

console.log('📊 VERIFICACIÓN COMPLETA PRECIO POR PRECIO:');
console.log('==========================================');

let errores = [];
let correctos = 0;
let total = 0;

// Verificar TODOS los códigos del Essential
Object.keys(preciosSistema).forEach(codigo => {
  const sistemaPrecios = preciosSistema[codigo];
  const csvPrecios = preciosCSV[codigo];
  
  total++;
  
  if (!csvPrecios) {
    errores.push({
      codigo,
      error: 'Código no encontrado en CSV'
    });
    console.log(`❌ ${codigo}: No encontrado en CSV`);
    return;
  }
  
  const preveniiiOk = Math.abs(sistemaPrecios.prevenii - csvPrecios.prevenii) < 0.01;
  const marketOk = Math.abs(sistemaPrecios.market - csvPrecios.market) < 0.01;
  
  if (preveniiiOk && marketOk) {
    correctos++;
    console.log(`✅ ${codigo}: Prevenii ${sistemaPrecios.prevenii}€, Market ${sistemaPrecios.market}€`);
  } else {
    errores.push({
      codigo,
      csvPrevenii: csvPrecios.prevenii,
      csvMarket: csvPrecios.market,
      sistemaPrevenii: sistemaPrecios.prevenii,
      sistemaMarket: sistemaPrecios.market,
      preveniiiOk,
      marketOk
    });
    console.log(`❌ ${codigo}:`);
    console.log(`   CSV: Prevenii ${csvPrecios.prevenii}€, Market ${csvPrecios.market}€`);
    console.log(`   Sistema: Prevenii ${sistemaPrecios.prevenii}€, Market ${sistemaPrecios.market}€`);
  }
});

console.log('\n📊 RESUMEN FINAL DE VERIFICACIÓN:');
console.log('=================================');
console.log(`Total códigos verificados: ${total}`);
console.log(`Correctos: ${correctos}`);
console.log(`Con errores: ${errores.length}`);
console.log(`Porcentaje de acierto: ${((correctos / total) * 100).toFixed(1)}%`);

if (errores.length === 0) {
  console.log('\n🎉 ¡PERFECTO! TODOS los precios del Essential coinciden exactamente con Price_Biomarker.csv');
  console.log('✅ El sistema de precios está correctamente configurado respecto a la referencia CSV');
} else {
  console.log(`\n⚠️ Hay ${errores.length} códigos con precios que no coinciden con el CSV`);
  
  if (errores.length > 0) {
    console.log('\n❌ ERRORES ENCONTRADOS:');
    console.log('=======================');
    errores.forEach(error => {
      if (error.error) {
        console.log(`${error.codigo}: ${error.error}`);
      } else {
        console.log(`${error.codigo}:`);
        if (!error.preveniiiOk) {
          console.log(`  Prevenii: CSV ${error.csvPrevenii}€ vs Sistema ${error.sistemaPrevenii}€`);
        }
        if (!error.marketOk) {
          console.log(`  Market: CSV ${error.csvMarket}€ vs Sistema ${error.sistemaMarket}€`);
        }
      }
    });
  }
} 