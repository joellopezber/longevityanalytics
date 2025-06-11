/**
 * TEST: Verificar estados actuales de selectores opcionales de hormonas
 * Identificar si hay estados persistentes causando la duplicación
 */

// Simular la función getInitialStateValue del contexto
const getInitialStateValue = (key) => {
  // Simular localStorage (puede estar causando persistencia)
  const stored = localStorage?.getItem(key);
  if (stored !== null) {
    return stored === 'true';
  }
  
  // Valores por defecto desde biomarkersConfig.js (ahora false)
  const defaultValues = {
    'selectedEstradiolHormonas': false,
    'selectedProlactinaHormonas': false,
    'selectedLHHormonas': false,
    'selectedFSHHormonas': false,
    'selectedHormonaCrecimientoHormonas': false,
    'selectedTestosteronaBiodispHormonas': false,
    'selectedTestosteronaLibreHormonas': false,
    'selectedDHTHormonas': false
  };
  
  return defaultValues[key] || false;
};

console.log('🔍 TEST: Estados Actuales de Selectores Opcionales de Hormonas');
console.log('='.repeat(70));

const hormonalStates = [
  'selectedEstradiolHormonas',
  'selectedProlactinaHormonas', 
  'selectedLHHormonas',
  'selectedFSHHormonas',
  'selectedHormonaCrecimientoHormonas',
  'selectedTestosteronaBiodispHormonas',
  'selectedTestosteronaLibreHormonas',
  'selectedDHTHormonas'
];

console.log('\n📊 ESTADOS ACTUALES:');
console.log('-'.repeat(70));

let activeStates = 0;
hormonalStates.forEach(state => {
  const value = getInitialStateValue(state);
  const status = value ? '✅ ACTIVO' : '❌ INACTIVO';
  console.log(`${state}: ${status}`);
  if (value) activeStates++;
});

console.log('-'.repeat(70));
console.log(`🔢 ESTADOS ACTIVOS: ${activeStates} de ${hormonalStates.length}`);

if (activeStates > 0) {
  console.log('\n⚠️  PROBLEMA DETECTADO:');
  console.log('- Hay estados activos que están causando duplicación de precios');
  console.log('- Estos estados pueden estar persistiendo en localStorage');
  console.log('- Necesario limpiar localStorage o forzar valores por defecto');
} else {
  console.log('\n✅ ESTADOS CORRECTOS:');
  console.log('- Todos los estados opcionales están inactivos');
  console.log('- No debería haber duplicación de precios');
}

console.log('\n💡 SOLUCIÓN:');
console.log('- Limpiar localStorage: localStorage.clear()');
console.log('- O forzar valores por defecto en getInitialStateValue()');
console.log('- Verificar que biomarkersConfig.js tenga todos los valores en false'); 