/**
 * HOW TO TAKE CONTROL SECTION
 * Sección que explica el proceso práctico para tomar control de la salud
 */

'use client';

export default function HowToTakeControl() {
  const steps = [
    {
      number: "01",
      title: "Obtenemos datos precisos",
      subtitle: "La foto actual de tu cuerpo",
      description: "Analizamos más de 150 biomarcadores que nos dan una visión completa de tu estado de salud actual. No adivinamos, medimos.",
      icon: "🧬",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      details: [
        "Biomarcadores de función hormonal",
        "Marcadores de inflamación y estrés oxidativo", 
        "Función cardiovascular y metabólica",
        "Niveles de vitaminas y minerales"
      ]
    },
    {
      number: "02", 
      title: "Diseñamos tu plan personalizado",
      subtitle: "Basado en TUS datos únicos",
      description: "Con la información precisa de tu cuerpo, creamos un plan específico para ti. No genérico, no para 'la mayoría', para TI.",
      icon: "🎯",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      details: [
        "Protocolo de suplementación personalizado",
        "Guía nutricional específica para tu metabolismo",
        "Recomendaciones de estilo de vida adaptadas",
        "Timing óptimo para cada intervención"
      ]
    },
    {
      number: "03",
      title: "Actúas con eficiencia",
      subtitle: "Cada acción tiene propósito",
      description: "Ya no pierdes tiempo ni dinero en estrategias genéricas. Cada decisión que tomas está respaldada por datos de TU cuerpo.",
      icon: "⚡",
      color: "from-purple-500 to-purple-600", 
      bgColor: "bg-purple-50",
      details: [
        "Suplementos que TU cuerpo necesita realmente",
        "Alimentos que optimizan TU bioquímica",
        "Ejercicios que benefician TU fisiología",
        "Seguimiento de TU progreso específico"
      ]
    },
    {
      number: "04",
      title: "Ves la repercusión real",
      subtitle: "Cambios medibles y objetivos",
      description: "No es fe ciega. Medimos el impacto de cada cambio en tu salud con nuevos análisis que muestran tu progreso real.",
      icon: "📈",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50", 
      details: [
        "Mejoras objetivas en biomarcadores",
        "Optimización de función hormonal",
        "Reducción de marcadores de inflamación",
        "Aumento de energía y vitalidad medibles"
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