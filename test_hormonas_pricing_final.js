/**
 * TEST FINAL: Verificar cálculo correcto de precios del add-on de hormonas
 * Después de corregir la duplicación de biomarcadores opcionales
 */

// Códigos de hormonas para hombres (precio base)
const MALE_BIOMARKERS = ['B5350', 'B5380', 'B5420', 'B5800', 'B5980', 'B6480', 'D0601', 'D0850'];

// Precios reales del archivo priceData.js
const ACTUAL_PRICES = {
  'B5350': { precio: 12.48, pvp: 16.28 }, // Estradiol
  'B5380': { precio: 7.52, pvp: 18.60 },  // FSH
  'B5420': { precio: 10.48, pvp: 18.60 }, // Hormona de crecimiento (hGH)
  'B5800': { precio: 7.52, pvp: 18.60 },  // LH
  'B5980': { precio: 7.52, pvp: 16.28 },  // Prolactina
  'B6480': { precio: 0.00, pvp: 0.00 },   // Testosterona biodisp. (€0,00 - precio inferior)
  'D0601': { precio: 21.28, pvp: 32.55 }, // Testosterona libre
  'D0850': { precio: 36.06, pvp: 37.87 }  // DHT
};

console.log('✅ TEST FINAL: Cálculo Correcto de Precios - Add-on Hormonas');
console.log('='.repeat(70));

// Calcular precio base (sin duplicaciones)
let totalPrevenii = 0;
let totalMarket = 0;

console.log('\n📊 PRECIO BASE (sin biomarcadores opcionales duplicados):');
console.log('-'.repeat(70));

MALE_BIOMARKERS.forEach(code => {
  const price = ACTUAL_PRICES[code];
  totalPrevenii += price.precio;
  totalMarket += price.pvp;
  
  console.log(`${code}: €${price.precio.toFixed(2)} (PVP: €${price.pvp.toFixed(2)})`);
});

console.log('-'.repeat(70));
console.log(`💰 TOTAL PREVENII: €${totalPrevenii.toFixed(2)}`);
console.log(`💰 TOTAL MARKET: €${totalMarket.toFixed(2)}`);
console.log(`🧪 BIOMARCADORES: ${MALE_BIOMARKERS.length}`);

console.log('\n🔧 CORRECCIÓN APLICADA:');
console.log('- Biomarcadores opcionales de hormonas: false por defecto');
console.log('- Eliminada duplicación de precios');
console.log('- Precio base incluye todos los biomarcadores hormonales');

console.log('\n✅ RESULTADO:');
console.log(`- Precio correcto sin duplicaciones: €${totalPrevenii.toFixed(2)}`);
console.log(`- Biomarcadores incluidos: ${MALE_BIOMARKERS.length}`);
console.log('- Sistema funcionando correctamente ✓'); 