/**
 * HOW TO TAKE CONTROL SECTION
 * Sección que explica el proceso práctico para tomar control de la salud
 */

'use client';

export default function HowToTakeControl() {
  const steps = [
    {
      number: "01",
      title: "Capturamos tus datos",
      subtitle: "La foto actual y completa de tu salud",
      description: "Analizamos más de 150 biomarcadores que nos dan una visión completa de tu estado de salud actual. No adivinamos, medimos.",
      icon: "🧬",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      details: [
        "Analizar >150 biomarcadores",
        "Evaluar función hormonal, cardiovascular y metabólica",
        "Detectar inflamación y estrés oxidativo",
        "Identificar deficiencias de vitaminas/minerales"
      ]
    },
    {
      number: "02", 
      title: "Diseñamos tu estrategia",
      subtitle: "Un plan 100% adaptado a tus objetivos y biología",
      description: "Con la información precisa de tu cuerpo, creamos un plan específico para ti. No genérico, no para 'la mayoría', para TI.",
      icon: "🎯",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      details: [
        "Protocolo de suplementación personalizado",
        "Guía nutricional para tu metabolismo",
        "Rutina de ejercicio a medida",
        "Cronobiología del timing óptimo"
      ]
    },
    {
      number: "03",
      title: "Implementas & mides",
      subtitle: "Ejecutas acciones con propósito y ves su impacto real",
      description: "Ya no pierdes tiempo ni dinero en estrategias genéricas. Cada decisión que tomas está respaldada por datos y puedes medir su impacto real.",
      icon: "📈",
      color: "from-purple-500 to-purple-600", 
      bgColor: "bg-purple-50",
      details: [
        "Tomar decisiones basadas en datos",
        "Monitorizar mejoras en biomarcadores",
        "Ajustar intervenciones en ciclos de 90 días",
        "Evidenciar energía, vitalidad y longevidad"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            ¿Cómo tomo el control de mi <span className="text-green-700">salud?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Ya sabes POR QUÉ es importante tomar el control. Ahora te mostramos CÓMO hacerlo de forma inteligente y eficiente. 
            No más estrategias genéricas: tu cuerpo es único y merece un enfoque personalizado.
          </p>
          <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-r-lg max-w-3xl mx-auto">
            <p className="text-green-800 font-medium">
              "A partir de datos precisos puedes ser eficiente en cada acción que tomas y ver su repercusión real en tu salud."
            </p>
          </div>
        </div>

        {/* Process Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                    <p className="text-lg text-green-600 font-medium">{step.subtitle}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 text-lg leading-relaxed">
                  {step.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {step.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-gray-600">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual */}
              <div className="flex-1 max-w-md">
                <div className={`${step.bgColor} rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300`}>
                  <div className="text-6xl mb-4">{step.icon}</div>
                  <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-white text-2xl font-bold">{step.number}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {step.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              El resultado: Eficiencia total en tu salud
            </h3>
            <p className="text-green-100 mb-6 max-w-3xl mx-auto">
              No más suplementos innecesarios. No más dietas que no funcionan para ti. 
              No más ejercicios sin propósito. Solo acciones respaldadas por TUS datos que generan resultados reales y medibles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/paquetes"
                className="bg-white text-green-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl"
              >
                Ver mis opciones de análisis
              </a>
              <a 
                href="/configurador"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-green-700 transition-colors"
              >
                Configurar mi análisis ahora
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 