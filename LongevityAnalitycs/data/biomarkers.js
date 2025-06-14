/**
 * DICCIONARIO DE BIOMARCADORES
 * Base de datos centralizada de todos los biomarcadores disponibles
 */

const BIOMARKERS_DICTIONARY = {
  // HEMATOLOGÍA Y COAGULACIÓN
  "H0000": { name: "Hemograma completo", category: "Hematología", gender: "both" },
  "H0020": { name: "VSG", category: "Inflamación", gender: "both" },
  "H0050": { name: "Fibrinógeno", category: "Coagulación", gender: "both" },
  "H0850": { name: "Cefalina-APTT", category: "Coagulación", gender: "both" },
  "H0860": { name: "INR (Protrombina)", category: "Coagulación", gender: "both" },
  "H1420": { name: "Hemoglobina A1c", category: "Metabolismo glucídico", gender: "both" },
  
  // BIOQUÍMICA BÁSICA
  "B0000": { name: "Glucosa en ayunas", category: "Metabolismo glucídico", gender: "both" },
  "B0010": { name: "Colesterol total", category: "Perfil lipídico", gender: "both" },
  "B0020": { name: "BUN (Urea)", category: "Función renal", gender: "both" },
  "B0030": { name: "Creatinina", category: "Función renal", gender: "both" },
  "B0040": { name: "Triglicéridos", category: "Perfil lipídico", gender: "both" },
  "B0050": { name: "GPT-ALT", category: "Enzimas hepáticas", gender: "both" },
  "B0060": { name: "GOT-AST", category: "Enzimas hepáticas", gender: "both" },
  "B0070": { name: "GGT", category: "Colestasis", gender: "both" },
  "B0080": { name: "Bilirrubina total", category: "Hígado", gender: "both" },
  "B0100": { name: "Calcio total", category: "Mineral óseo", gender: "both" },
  "B0110": { name: "LDH", category: "Enzima celular", gender: "both" },
  "B0120": { name: "Fósforo", category: "Mineral óseo", gender: "both" },
  "B0130": { name: "Hierro", category: "Metabolismo hierro", gender: "both" },
  "B0170": { name: "HDL-C", category: "Perfil lipídico", gender: "both" },
  "B0180": { name: "LDL-C", category: "Perfil lipídico", gender: "both" },
  "B0190": { name: "VLDL", category: "Perfil lipídico", gender: "both" },
  "B0200": { name: "Albúmina", category: "Función hepática", gender: "both" },
  "B0220": { name: "CPK total", category: "Enzima muscular", gender: "both" },
  "B0240": { name: "Proteínas totales", category: "Nutrición", gender: "both" },
  "B0250": { name: "Ácido úrico", category: "Purinas", gender: "both" },
  "B0260": { name: "Bilirrubina directa", category: "Hígado", gender: "both" },
  "B0270": { name: "Osmolalidad sérica", category: "Función renal", gender: "both" },
  "B0350": { name: "Amilasa", category: "Función pancreática", gender: "both" },
  "B0750": { name: "Ácido láctico", category: "Metabolismo", gender: "both" },
  
  // ELECTROLITOS
  "B1260": { name: "Ionograma (Na⁺, K⁺, Cl⁻)", category: "Electrolitos", gender: "both" },
  "B1540": { name: "eGFR", category: "Filtrado glomerular", gender: "both" },
  "B1600": { name: "Magnesio", category: "Mineral neuromuscular", gender: "both" },
  "B1900": { name: "LDL directo", category: "Perfil lipídico", gender: "both" },
  "B1970": { name: "Fosfatasa alcalina (ALP)", category: "Hígado/Hueso", gender: "both" },
  "B1980": { name: "Lipasa", category: "Función pancreática", gender: "both" },
  "B2120": { name: "CK-MB", category: "Cardíaco", gender: "both" },
  
  // ANTIOXIDANTES Y ESTRÉS OXIDATIVO
  "B3015": { name: "Glutatión peroxidasa", category: "Antioxidante", gender: "both" },
  "B3041": { name: "G6PD", category: "Defensa antioxidante", gender: "both" },
  "B7121": { name: "Glutatión reductasa + B2", category: "Antioxidante", gender: "both" },
  
  // PERFIL CARDIOVASCULAR
  "B3100": { name: "ApoA-I", category: "Riesgo cardiovascular", gender: "both" },
  "B3110": { name: "ApoB", category: "Riesgo cardiovascular", gender: "both" },
  "B3170": { name: "PCR (hsCRP)", category: "Inflamación cardiovascular", gender: "both" },
  "B7700": { name: "Lp(a)", category: "Riesgo cardiovascular", gender: "both" },
  
  // METABOLISMO HIERRO
  "B3210": { name: "Transferrina", category: "Transporte hierro", gender: "both" },
  "B5370": { name: "Ferritina", category: "Depósito hierro", gender: "both" },
  "B7260": { name: "Índice saturación transf.", category: "Hierro", gender: "both" },
  
  // HORMONAS GENERALES
  "B5120": { name: "Cortisol", category: "Eje HHA", gender: "both" },
  "B5290": { name: "DHEA-S", category: "Andrógenos suprarrenales", gender: "both" },
  "B5350": { name: "Estradiol", category: "Hormonas femeninas", gender: "both" },
  "B5380": { name: "FSH", category: "Gonadotropina", gender: "both" },
  "B5420": { name: "Hormona de crecimiento (hGH)", category: "Eje GH/IGF", gender: "both" },
  "B5800": { name: "LH", category: "Gonadotropina", gender: "both" },
  "B5850": { name: "PTH intacta (PTHi)", category: "Paratiroides", gender: "both" },
  "B5980": { name: "Prolactina", category: "Hormonas", gender: "both" },
  "B6020": { name: "SHBG", category: "Transporte esteroides", gender: "both" },
  "B6160": { name: "Testosterona total", category: "Hormona general", gender: "both" },
  
  // HORMONAS ESPECÍFICAS MASCULINAS
  "B6480": { name: "Testosterona biodisp.", category: "Hormona masculina", gender: "male" },
  "D0601": { name: "Testosterona libre", category: "Hormona masculina", gender: "male" },
  "D0850": { name: "DHT", category: "Andrógeno potente", gender: "male" },
  "B5830": { name: "PSA total", category: "Próstata", gender: "male" },
  "B5840": { name: "PSA libre", category: "Próstata", gender: "male" },
  "B3340": { name: "Espermiograma", category: "Fertilidad", gender: "male" },
  
  // HORMONAS ESPECÍFICAS FEMENINAS
  "B5932": { name: "Progesterona", category: "Hormona femenina", gender: "female" },
  "D0181": { name: "17-OH-Progesterona", category: "Suprarrenal", gender: "female" },
  "D0780": { name: "Estrona", category: "Estrógeno menopáusico", gender: "female" },
  "D1001": { name: "AMH", category: "Reserva ovárica", gender: "female" },
  "B8110": { name: "Proteína Epididimal Humana 4 (HE4)", category: "Marcador tumoral", gender: "female" },
  
  // EJE GH/IGF
  "B6010": { name: "IGFBP-3", category: "Regula IGF", gender: "both" },
  "B6030": { name: "IGF-1", category: "Eje GH/IGF", gender: "both" },
  "I6740": { name: "ACTH", category: "Pituitaria", gender: "both" },
  
  // TIROIDES
  "B6040": { name: "T3 libre", category: "Tiroides", gender: "both" },
  "B6070": { name: "T4 libre", category: "Tiroides", gender: "both" },
  "B6130": { name: "TSH", category: "Tiroides", gender: "both" },
  "B6300": { name: "anti-TPO", category: "Tiroides", gender: "both" },
  "B6321": { name: "anti-Tg", category: "Tiroides", gender: "both" },
  
  // VITAMINAS
  "B5410": { name: "Folato", category: "Hematopoyesis", gender: "both" },
  "B6180": { name: "Vitamina D (25-OH)", category: "Mineral-inmune", gender: "both" },
  "B6190": { name: "Vitamina B12", category: "Hematopoyesis", gender: "both" },
  "D0560": { name: "Vitamina D 1,25-OH", category: "Hormona calcitriol", gender: "both" },
  "T0811": { name: "Retinol (Vit A)", category: "Antioxidante", gender: "both" },
  "T1061": { name: "Vitamina C", category: "Antioxidante", gender: "both" },
  "T1191": { name: "α-Tocoferol (Vit E)", category: "Antioxidante", gender: "both" },
  "T2841": { name: "γ-Tocoferol", category: "Antioxidante", gender: "both" },
  "T1720": { name: "Vitamina K1", category: "Coagulación", gender: "both" },
  
  // METABOLISMO Y RESISTENCIA INSULÍNICA
  "B5590": { name: "Homocisteína", category: "Metionina/CV", gender: "both" },
  "B5600": { name: "Insulina basal", category: "Resistencia insulínica", gender: "both" },
  "B6510": { name: "HOMA-R", category: "Resistencia insulínica", gender: "both" },
  
  // MINERALES Y OLIGOELEMENTOS
  "T0500": { name: "Cromo", category: "Oligoelemento", gender: "both" },
  "B8050": { name: "Zinc", category: "Inmunidad", gender: "both" },
  "B8060": { name: "Cobre", category: "Oligoelemento", gender: "both" },
  "T3920": { name: "Selenio", category: "Antioxidante", gender: "both" },
  "T1572": { name: "Calcio iónico", category: "Mineral óseo", gender: "both" },
  
  // METALES PESADOS
  "T0150": { name: "Plomo", category: "Metal pesado", gender: "both" },
  "T0302": { name: "Mercurio", category: "Metal pesado", gender: "both" },
  "T0480": { name: "Cadmio", category: "Metal pesado", gender: "both" },
  "T0960": { name: "Arsénico", category: "Metal pesado", gender: "both" },
  
  // INFLAMACIÓN
  "B7790": { name: "IL-6", category: "Inflamación", gender: "both" },
  "I2081": { name: "TNF-α", category: "Inflamación", gender: "both" },
  
  // AUTOINMUNIDAD
  "B3130": { name: "Factor reumatoide", category: "Artritis", gender: "both" },
  "I0141": { name: "Nucleares An (ANA)", category: "Autoinmunidad", gender: "both" },
  "I5072": { name: "anti-CCP", category: "Artritis", gender: "both" },
  "B7750": { name: "Helicobacter pylori IgG An", category: "Infección", gender: "both" },
  
  // FUNCIÓN RENAL AVANZADA
  "I5047": { name: "Cistatina-C", category: "Función renal", gender: "both" },
  
  // METABOLISMO ÓSEO
  "D1111": { name: "ALP ósea", category: "Metabolismo óseo", gender: "both" },
  "I3291": { name: "CTX", category: "Resorción ósea", gender: "both" },
  
  // MARCADORES TUMORALES
  "B5080": { name: "CA 125", category: "Marcador tumoral", gender: "both" },
  "B5090": { name: "CA 15.3", category: "Marcador tumoral", gender: "both" },
  "B5100": { name: "CA 19-9", category: "Marcador tumoral", gender: "both" },
  "B5110": { name: "CEA", category: "Marcador tumoral", gender: "both" },
  "B7900": { name: "Alfa-feto (AFP)", category: "Marcador tumoral", gender: "both" },
  "B8120": { name: "CYFRA 21-1", category: "Marcador tumoral", gender: "both" },
  "B8130": { name: "Células escamosas Ag (SCC)", category: "Marcador tumoral", gender: "both" },
  "B8160": { name: "Péptido liberador gastrina (ProGRP)", category: "Marcador tumoral", gender: "both" },
  "D1271": { name: "CA 72-4", category: "Marcador tumoral", gender: "both" },
  "D1760": { name: "β-HCG", category: "Embarazo/Tumoral", gender: "both" },
  "I5080": { name: "Proteina s-100", category: "Marcador tumoral", gender: "both" },
  "I5090": { name: "NSE", category: "Marcador tumoral", gender: "both" },
  
  // PERFIL LIPÍDICO AVANZADO
  "T2590": { name: "Ácidos grasos %", category: "Perfil lipídico", gender: "both" },
  "T2830": { name: "Coenzima Q10", category: "Energía mitocondrial", gender: "both" },
  "T1200": { name: "β-Caroteno", category: "Antioxidante", gender: "both" },
  
  // ANÁLISIS DE ORINA Y HECES
  "6897": { name: "Urianálisis + sedimento", category: "Función renal", gender: "both" },
  "M0010": { name: "Sangre oculta en heces", category: "Digestivo", gender: "both" },
  "M1190": { name: "Parásitos en heces", category: "Parasitología", gender: "both" },
  
  // TESTS ESPECIALIZADOS
  "P3031": { name: "Intolerancia alimentaria (IgG)", category: "Intolerancia alimentaria", gender: "both" },
  "AB001": { name: "Microbioma intestinal", category: "Microbiota", gender: "both" },
  "AB002": { name: "Metaboloma (heces/orina)", category: "Microbiota", gender: "both" },
  
  // ANÁLISIS GENÉTICOS
  "OG001": { name: "MyEpiAgeing", category: "Epigenética", gender: "both" },
  "G1465": { name: "Longitud telomérica", category: "Epigenética", gender: "both" },
  "OG002": { name: "MyPharma", category: "Farmacogenética", gender: "both" },
  "OG003": { name: "MyDetox", category: "Detoxificación genética", gender: "both" },
  "OG004": { name: "MyDiet", category: "Nutrigenética", gender: "both" },
  "OG005": { name: "MySport", category: "Genética deportiva", gender: "both" },
  "OG006": { name: "MySupplements", category: "Suplementación genética", gender: "both" }
};

export { BIOMARKERS_DICTIONARY };
export default BIOMARKERS_DICTIONARY; 