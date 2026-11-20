// Datos del servicio estrella. Copiados de interno/catalogo-maestro.md, sección 4
// ("SOLO APP REACT"). Desde 2026-11-20 tienen copia textual en public_html/diseno-de-iluminacion.md
// (LN-SERVICIO-M): si cambian acá, hay que actualizar ese archivo.

export const contacto = {
  direccion: 'Ruta 40 esquina Ruta 52, Junín de los Andes, provincia de Neuquén, Argentina',
  telefono: '+54 2972 49-0000',
  telefonoEnlace: 'tel:+542972490000',
  correo: 'hola@luminariasnorte.shop',
  horarios: 'Lunes a viernes de 9:00 a 18:00 h y sábados de 9:00 a 13:00 h',
  respuesta: 'Respondemos los correos dentro de las 36 horas hábiles.',
};

export const servicio = {
  codigo: 'LN-SRV-001',
  nombre: 'Diseño de iluminación para interiores',
};

export const planes = [
  {
    id: 'ambiente',
    nombre: 'Plan Ambiente',
    precio: 186400,
    bajada: 'Para resolver un espacio puntual: el living, la cocina o el salón de tu local.',
    ambientes: '1 ambiente',
    visitas: '1 visita al lugar',
    entregables: [
      'Plano de ubicación de luminarias',
      'Lista de productos con códigos',
      'Guía de temperatura de color por zona',
      'Render 2D de la escena',
    ],
    plazo: '9 días hábiles',
    ajustes: '2 ajustes incluidos',
    garantia: '45 días de garantía del diseño',
    pago: '40 % de seña y 60 % al entregar',
  },
  {
    id: 'hogar',
    nombre: 'Plan Hogar',
    precio: 438900,
    destacado: true,
    bajada: 'El más elegido para casas y departamentos: la luz de toda la vivienda pensada en conjunto.',
    ambientes: 'Hasta 4 ambientes',
    visitas: '2 visitas al lugar',
    entregables: [
      'Todo lo del Plan Ambiente',
      'Plano de circuitos y comandos',
      'Cálculo lumínico por ambiente',
      'Renders 3D de 4 escenas',
      'Presupuesto detallado de productos',
    ],
    plazo: '16 días hábiles',
    ajustes: '3 ajustes incluidos',
    garantia: '60 días de garantía del diseño',
    pago: '40 % de seña y 60 % al entregar',
  },
  {
    id: 'integral',
    nombre: 'Plan Integral',
    precio: 912700,
    bajada: 'Para obras nuevas, reformas completas, locales y oficinas con varios sectores.',
    ambientes: 'Hasta 9 ambientes',
    visitas: '4 visitas al lugar, incluida 1 de verificación posterior a la instalación',
    entregables: [
      'Todo lo del Plan Hogar',
      'Diseño de escenas regulables',
      'Renders 3D de 9 escenas',
      'Guía de obra para el instalador',
      'Informe final con mediciones de luxómetro',
    ],
    plazo: '27 días hábiles',
    ajustes: '5 ajustes incluidos',
    garantia: '90 días de garantía del diseño',
    pago: '30 % de seña, 40 % al aprobar el anteproyecto y 30 % al entregar',
  },
];

export const comparativa = [
  { concepto: 'Precio (IVA incluido)', valores: ['$ 186.400', '$ 438.900', '$ 912.700'] },
  { concepto: 'Ambientes incluidos', valores: ['1', 'Hasta 4', 'Hasta 9'] },
  { concepto: 'Visitas al lugar', valores: ['1', '2', '4'] },
  { concepto: 'Renders', valores: ['2D de 1 escena', '3D de 4 escenas', '3D de 9 escenas'] },
  { concepto: 'Cálculo lumínico por ambiente', valores: ['No', 'Sí', 'Sí'] },
  { concepto: 'Plano de circuitos y comandos', valores: ['No', 'Sí', 'Sí'] },
  { concepto: 'Escenas regulables y guía de obra', valores: ['No', 'No', 'Sí'] },
  { concepto: 'Plazo de entrega', valores: ['9 días hábiles', '16 días hábiles', '27 días hábiles'] },
  { concepto: 'Ajustes incluidos', valores: ['2', '3', '5'] },
  { concepto: 'Garantía del diseño', valores: ['45 días', '60 días', '90 días'] },
  { concepto: 'Forma de pago', valores: ['40 % de seña y 60 % al entregar', '40 % de seña y 60 % al entregar', '30 % de seña, 40 % al aprobar el anteproyecto y 30 % al entregar'] },
];

export const condiciones = [
  'Si comprás en Luminarias Norte los productos del proyecto dentro de los 21 días corridos posteriores a la entrega, descontamos el 12 % del valor del plan del total de la compra.',
  'Hacemos visitas presenciales hasta 65 km del showroom; fuera de ese radio, el relevamiento se hace por videollamada y fotos, con el mismo precio.',
  'Garantía del diseño: si la iluminación instalada según el proyecto no logra el resultado acordado, la reajustamos sin costo dentro del plazo de garantía del plan.',
  'Cada ajuste adicional fuera del plan cuesta $ 38.700.',
  'El presupuesto del servicio es válido por 12 días corridos.',
];

export const etapas = [
  { titulo: 'Consulta', plazo: 'Respuesta dentro de las 36 horas hábiles', texto: 'Nos contás qué ambientes querés iluminar, cómo los usás y qué te gustaría sentir en ellos. Coordinamos la visita y te enviamos el presupuesto del plan.' },
  { titulo: 'Visita y relevamiento', plazo: 'Dentro de los 4 días hábiles posteriores a la seña', texto: 'Medimos, fotografiamos y registramos la luz natural, las bocas existentes, los materiales y las alturas de cada ambiente.' },
  { titulo: 'Anteproyecto', plazo: '3 días hábiles en el Plan Ambiente, 6 en el Plan Hogar y 11 en el Plan Integral', texto: 'Presentamos la propuesta: ubicación de cada luminaria, temperaturas de color, niveles de luz y escenas.' },
  { titulo: 'Ajustes', plazo: '2 días hábiles por ronda', texto: 'Revisamos juntos el anteproyecto y aplicamos los cambios dentro de la cantidad de ajustes de tu plan.' },
  { titulo: 'Entrega final', plazo: 'Al cumplirse el plazo de entrega del plan', texto: 'Recibís la documentación digital por correo y una copia impresa para retirar en el showroom.' },
  { titulo: 'Acompañamiento', plazo: 'Durante la garantía del diseño: 45, 60 o 90 días según el plan', texto: 'Respondemos las dudas del instalador y, si el resultado no es el acordado, reajustamos el diseño sin costo.' },
];

export const ambientes = [
  { nombre: 'Livings y comedores', kelvin: '2700 K a 3000 K', texto: 'Capas de luz: una general suave, acentos sobre cuadros o bibliotecas y una luz baja para la sobremesa.' },
  { nombre: 'Cocinas', kelvin: '3000 K a 4000 K', texto: 'Luz pareja en la mesada sin sombras del propio cuerpo, con cinta LED bajo alacenas y una general bien distribuida.' },
  { nombre: 'Dormitorios', kelvin: '2700 K', texto: 'Luz cálida y regulable, lectura independiente a cada lado de la cama y nada que encandile desde la almohada.' },
  { nombre: 'Baños', kelvin: '3000 K a 4000 K', texto: 'Luz frontal en el espejo para ver bien la cara y una general con protección adecuada a la humedad.' },
  { nombre: 'Oficinas y escritorios', kelvin: '4000 K', texto: 'Buen nivel de luz sobre el plano de trabajo, sin reflejos en pantallas y con CRI alto para leer cómodo.' },
  { nombre: 'Locales comerciales', kelvin: '3000 K a 4000 K', texto: 'Acentos con rieles orientables sobre el producto, vidriera protagonista y CRI 90 para que los colores se vean reales.' },
];

export const resenas = [
  { nombre: 'Sofía B.', valoracion: 5, texto: 'Contratamos el Plan Hogar para la casa nueva y la diferencia es enorme: cada ambiente tiene su luz y el plano le simplificó todo al electricista.' },
  { nombre: 'Gustavo L.', valoracion: 5, texto: 'Con el Plan Ambiente resolvimos el salón del local. En dos semanas teníamos el proyecto y las ventas de la vidriera se notaron.' },
];

export const preguntas = [
  { p: '¿Necesito comprar los productos en Luminarias Norte?', r: 'No. El proyecto es tuyo y podés comprar donde quieras. Si comprás con nosotros los productos del proyecto dentro de los 21 días corridos posteriores a la entrega, descontamos el 12 % del valor del plan.' },
  { p: '¿Qué pasa si vivo lejos del showroom?', r: 'Hasta 65 km del showroom hacemos visitas presenciales. Más lejos, hacemos el relevamiento por videollamada y fotos, al mismo precio.' },
  { p: '¿Qué cuenta como un ambiente?', r: 'Un espacio con uso propio: living, cocina, dormitorio, baño, galería u oficina. Un living comedor integrado de hasta 40 m² cuenta como un ambiente.' },
  { p: '¿Puedo pedir más ajustes de los que incluye mi plan?', r: 'Sí. Cada ajuste adicional cuesta $ 38.700 y se resuelve en 2 días hábiles.' },
  { p: '¿El servicio incluye la instalación?', r: 'No. Entregamos la documentación para tu electricista. En el Plan Integral, además, hacemos una visita de verificación posterior a la instalación.' },
  { p: '¿Cómo se paga?', r: 'En los planes Ambiente y Hogar, 40 % de seña y 60 % al entregar. En el Plan Integral, 30 % de seña, 40 % al aprobar el anteproyecto y 30 % al entregar. Aceptamos transferencia bancaria y tarjetas de débito o de crédito mediante enlace de pago.' },
];
