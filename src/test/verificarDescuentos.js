/**
 * Verificar si los precios del CSV incluyen descuentos por volumen
 */

console.log('🔍 VERIFICANDO DESCUENTOS EN PRECIOS CSV\n');

// Totales calculados sin descuento
const totalPrevenii = 261.38;
const totalMarket = 428.63;

// Precios esperados del CSV
const expectedPrice = 259.00;
const expectedPvp = 402.27; // Valor exacto del CSV

console.log('📊 ANÁLISIS DE DESCUENTOS:');
console.log('=========================');

console.log(`Total Prevenii sin descuento: ${totalPrevenii.toFixed(2)}€`);
console.log(`Precio esperado CSV: ${expectedPrice.toFixed(2)}€`);
console.log(`Diferencia: ${(totalPrevenii - expectedPrice).toFixed(2)}€`);

console.log(`\nTotal Market sin descuento: ${totalMarket.toFixed(2)}€`);
console.log(`PVP esperado CSV: ${expectedPvp.toFixed(2)}€`);
console.log(`Diferencia: ${(totalMarket - expectedPvp).toFixed(2)}€`);

// Calcular qué descuento se aplicó
const descuentoPrevenii = (totalPrevenii - expectedPrice) / totalPrevenii;
const descuentoMarket = (totalMarket - expectedPvp) / totalMarket;

console.log('\n💰 DESCUENTOS APLICADOS:');
console.log('========================');
console.log(`Descuento Prevenii: ${(descuentoPrevenii * 100).toFixed(2)}%`);
console.log(`Descuento Market: ${(descuentoMarket * 100).toFixed(2)}%`);

// Verificar si coincide con algún descuento estándar
console.log('\n🎯 COMPARACIÓN CON DESCUENTOS ESTÁNDAR:');
console.log('======================================');

const descuentos = [
  { tests: '0-10', descuento: 0 },
  { tests: '11-25', descuento: 0.05 },
  { tests: '26-50', descuento: 0.10 },
  { tests: '51+', descuento: 0.15 }
];

descuentos.forEach(d => {
  const precioConDescuento = totalPrevenii * (1 - d.descuento);
  const pvpConDescuento = totalMarket * (1 - d.descuento);
  
  console.log(`${d.tests} tests (${(d.descuento * 100)}%): Precio ${precioConDescuento.toFixed(2)}€, PVP ${pvpConDescuento.toFixed(2)}€`);
  
  if (Math.abs(precioConDescuento - expectedPrice) < 1) {
    console.log(`  ✅ COINCIDE con precio esperado!`);
  }
  if (Math.abs(pvpConDescuento - expectedPvp) < 1) {
    console.log(`  ✅ COINCIDE con PVP esperado!`);
  }
});

console.log('\n🔍 CONCLUSIÓN:');
console.log('==============');

if (Math.abs(descuentoPrevenii - 0.01) < 0.005) {
  console.log('✅ Se aplica aproximadamente 1% de descuento en Prevenii');
} else if (Math.abs(descuentoPrevenii - 0.05) < 0.01) {
  console.log('✅ Se aplica aproximadamente 5% de descuento en Prevenii');
} else if (Math.abs(descuentoPrevenii) < 0.01) {
  console.log('✅ NO se aplica descuento en Prevenii (precio sin descuento)');
} else {
  console.log(`⚠️ Se aplica un descuento personalizado del ${(descuentoPrevenii * 100).toFixed(2)}% en Prevenii`);
}

if (Math.abs(descuentoMarket - 0.06) < 0.01) {
  console.log('✅ Se aplica aproximadamente 6% de descuento en Market');
} else if (Math.abs(descuentoMarket) < 0.01) {
  console.log('✅ NO se aplica descuento en Market (precio sin descuento)');
} else {
  console.log(`⚠️ Se aplica un descuento personalizado del ${(descuentoMarket * 100).toFixed(2)}% en Market`);
} 