/**
 * HOW TO TAKE CONTROL SECTION
 * Sección que explica el proceso práctico para tomar control de la salud
 */

'use client';



export default function HowToTakeControl() {

  const steps = [
    {
      number: "01",
      title: "Conoces tu estado real",
      subtitle: "Descubres exactamente dónde estás ahora",
      description: "Obten datos precisos sobre tu cuerpo. Dejas de adivinar qué te pasa y obtienes una fotografía completa y objetiva de tu salud actual. Con más de 150 biomarcadores conoces tus fortalezas, debilidades y oportunidades de mejora específicas.",
      icon: (
        <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.5 14.25l-5.584 2.718 1.84 3.837C7.234 20.405 9.53 20 12 20c2.47 0 4.766.405 6.244.805l1.84-3.837L14.5 14.25c-1.17.33-2.328.33-3.5 0zM12 14.5c1.438 0 2.562.5 2.562.5L16 13.5c0-1.5-1.79-2.5-4-2.5s-4 1-4 2.5L9.438 15S10.562 14.5 12 14.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.41 0 8 3.59 8 8 0 1.85-.63 3.55-1.69 4.9z"/>
        </svg>
      ),
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      number: "02", 
      title: "Recibe tu hoja de ruta",
      subtitle: "Interpretamos tus datos y creamos una estrategia para ti",
      description: "Con tus datos en la mano, diseñamos un plan específico para tus objetivos y tu biología única. No sigues consejos genéricos ni tendencias de moda. Cada decisión que tomas sobre suplementos, nutrición y ejercicio está respaldada por evidencia proporcionada de tu propio cuerpo.",
      icon: (
        <svg className="w-16 h-16 text-green-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
      ),
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    },
    {
      number: "03",
      title: "Implementa tus acciones correctivas",
      subtitle: "Ejecutas acciones con propósito y tienen un impacto real",
      description: "Aplicas tu estrategia personalizada y monitorizas los resultados objetivamente. Cada intervención que haces tiene un propósito claro y puedes medir su efectividad real. Ajustas tu plan basándote en datos, no en sensaciones, y ves tu progreso de forma tangible.",
      icon: (
        <svg className="w-16 h-16 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </svg>
      ),
      color: "from-purple-500 to-purple-600", 
      bgColor: "bg-purple-50"
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
              </div>

              {/* Visual */}
              <div className="flex-1 max-w-md">
                <div className={`${step.bgColor} rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300`}>
                  <div className="mb-4 flex justify-center">{step.icon}</div>
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




      </div>
    </section>
  );
} 