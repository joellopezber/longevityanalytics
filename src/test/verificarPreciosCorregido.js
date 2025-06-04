/**
 * Verificación corregida de precios con parser robusto
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 VERIFICANDO PRECIOS vs Price_Biomarker.csv (CORREGIDO)\n');

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

// Mostrar algunos ejemplos para verificar
console.log('🔍 EJEMPLOS DE PRECIOS CARGADOS:');
const ejemplos = ['H0000', 'B0000', 'B5600', 'B1260'];
ejemplos.forEach(codigo => {
  if (preciosCSV[codigo]) {
    console.log(`${codigo}: Prevenii ${preciosCSV[codigo].prevenii}€, Market ${preciosCSV[codigo].market}€`);
  } else {
    console.log(`${codigo}: NO ENCONTRADO`);
  }
});
console.log('');

// Precios que tenemos en el sistema (solo algunos para test)
const preciosSistema = {
  "H0000": { prevenii: 4.02, market: 6.28 },
  "B0000": { prevenii: 1.16, market: 2.09 },
  "B5600": { prevenii: 7.22, market: 16.28 },
  "B1260": { prevenii: 6.50, market: 8.14 },
  "B6510": { prevenii: 0.00, market: 0.00 },
  "B1540": { prevenii: 0.00, market: 0.00 }
};

console.log('📊 VERIFICACIÓN PRECIO POR PRECIO:');
console.log('==================================');

let errores = [];
let correctos = 0;
let total = 0;

// Verificar códigos de prueba
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

console.log('\n📊 RESUMEN DE VERIFICACIÓN:');
console.log('===========================');
console.log(`Total códigos verificados: ${total}`);
console.log(`Correctos: ${correctos}`);
console.log(`Con errores: ${errores.length}`);
console.log(`Porcentaje de acierto: ${((correctos / total) * 100).toFixed(1)}%`);

if (errores.length === 0) {
  console.log('\n🎉 ¡PERFECTO! Los precios coinciden exactamente con Price_Biomarker.csv');
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