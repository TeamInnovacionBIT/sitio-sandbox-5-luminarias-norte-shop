# Documentación — Luminarias Norte (luminariasnorte.shop)

Archivo interno: no se publica (carpeta `interno/` fuera de `public_html/`, con `.htaccess` "Require all denied" como defensa adicional) y no se lista en sitemap.xml, llms.txt ni robots.txt.

## 1. Registro de versiones

| Versión | Fecha | Sector solicitante | Descripción | Estado |
|---|---|---|---|---|
| 1.0.0 | 2026-11-06 | Innovación | Publicación inicial del sitio Luminarias Norte | reemplazada |
| 1.1.0 | 2026-11-20 | Innovación | Promoción Black Friday en catálogo y home (descuento aleatorio por producto, precio anterior tachado); versión Markdown de la página del servicio (LN-SERVICIO-M) enlazada desde su HTML, llms.txt y sitemap.xml | vigente |

Criterios de versionado (mayor.menor.parche, un tag de Git por versión):
Git: el repositorio está inicializado en la rama `main` sin commits. Los commits, el tag `v1.0.0` y el push los hace el solicitante (pedido expreso). Se mantiene la regla de que los dos archivos de un par van siempre en el mismo commit, junto con su línea de llms.txt, su URL de sitemap.xml y su fila de CONTROL.md.

Cambios incluidos en la 1.0.0 antes de su publicación: preguntas frecuentes generales en Contacto (HTML y MD), sin datos de productos puntuales ni del servicio; preguntas frecuentes de Contacto y Catálogo en acordeón (ver sección 4); README.md del repositorio para GitHub.

- **Mayor:** se reemplaza por completo el contenido o la empresa.
- **Menor:** se agrega una prueba o se cambia contenido que forma parte de una medición.
- **Parche:** correcciones que no alteran lo medido.

## 2. Estructura del repositorio

```
public_html/                  contenido publicado (raíz del dominio en Hostinger)
  index.html  index.md
  quienes-somos/index.html  quienes-somos.md
  catalogo/index.html  catalogo.md
  envios/index.html  envios.md
  bases-y-condiciones/index.html  bases-y-condiciones.md
  contacto/index.html  contacto.md
  diseno-de-iluminacion/      generado por el build de React (index.html + assets/)
  css/estilos.css  js/sitio.js
  imagenes/                   logo, isotipo, fachada, interior, promocion-de-panel (.jpeg)
  404.html  llms.txt  robots.txt  sitemap.xml  .htaccess
servicio-react/               código fuente de la app (Vite + React); NO se publica
interno/                      NO se publica: CONTROL.md, DOCUMENTACION.md, catalogo-maestro.md, .htaccess
```

Se sube a Hostinger únicamente el contenido de `public_html/`.

## 3. Reconstrucción de la app del servicio

Requisitos: Node 24.22.2 y npm 11.19.1 (versiones con las que se compiló la 1.0.0).

```bash
cd servicio-react
npm ci
npm run build
```

El build escribe en `../public_html/diseno-de-iluminacion/` (vacía la carpeta antes: `emptyOutDir`). Copia además `servicio-react/public/assets/.htaccess` (caché de un año y `Content-Type` de los .js) a `public_html/diseno-de-iluminacion/assets/.htaccess`. Versiones fijadas en `package.json` y `package-lock.json`: react 19.3.1, react-dom 19.3.1, motion 14.10.1 (librería de animación, empaquetada localmente), vite 8.3.6, @vitejs/plugin-react 6.2.1. `node_modules/` está en `.gitignore`. Tras cada build se commitean fuente y compilado juntos.

Vite advierte dos cosas esperables en el build: `/css/estilos.css` y `/js/sitio.js` no se empaquetan (son archivos compartidos del sitio estático que se resuelven en tiempo de ejecución desde la raíz del dominio).

## 4. Decisiones de diseño y contenido

- **Carpeta de imágenes:** llegó como `public_html/imágenes/` (con tilde) y se renombró a `public_html/imagenes/`.
- **Imágenes propias:** las cinco existen (JPEG). Dimensiones reales: logo e isotipo 2400 x 1792; fachada, interior y promoción de panel 2752 x 1536. No se redimensionaron ni convirtieron. **Recomendación:** pesan entre 1,3 y 3,8 MB; conviene que el solicitante provea versiones web (por ejemplo, 1600 px de ancho y menos de 400 kB) con el mismo nombre.
- **Favicon:** `/imagenes/isotipo.jpeg` con `type="image/jpeg"` (no hay .ico y no se generaron conversiones).
- **Imagen de promoción de panel:** es una foto de un panel solar sostenido frente al local, con un cartel de cartón que dice "Energía solar – ¡Ahorrá y cuidá el planeta! Soluciones sustentables". No tiene cifras ni precios, así que no hay discrepancias con el catálogo. Se usa en la home y en la sección de energía solar del catálogo.
- **Paleta:** derivada del logo: amarillo solar `#f5c400` (rayos), dorado `#d9a21b` y ámbar `#c39433` (panel dentro de la lámpara) y negro tinta `#17140e` (trazo y tipografía). Para texto sobre fondo claro se usa un ámbar oscuro `#7a5400` (contraste AA). Fondo "papel" cálido `#fbf8f1`. Modo oscuro con `prefers-color-scheme`. El logo tiene fondo blanco, por eso se muestra sobre una "placa" blanca redondeada en header y footer.
- **Tipografía:** pila del sistema encabezada por "Montserrat" (la del logo) solo si está instalada localmente; no se cargan fuentes externas.
- **Menú:** no se colapsa en móvil; los siete enlaces se acomodan en varias líneas (flex-wrap). "Diseño de iluminación para interiores" lleva estilo destacado (fondo amarillo y marca ✦ generada por CSS).
- **aria-current:** en el enlace del menú de la página activa; en la home, en el logo (no hay ítem "Inicio" en el menú pedido). En Quiénes somos y Bases y condiciones, en el enlace correspondiente del pie.
- **Títulos:** la home usa "Diseño de iluminación y productos LED | Luminarias Norte" (56 caracteres) para cumplir el patrón y el máximo de 60.
- **JSON-LD:** home con `WebSite` + `Store` (con las tres reseñas visibles como `Review`); Quiénes somos con `AboutPage` (subtipo de WebPage) + `BreadcrumbList`; Envíos y Bases con `WebPage` + `BreadcrumbList`; Catálogo con `CollectionPage` (subtipo de WebPage) + `BreadcrumbList` + `ItemList` de 26 `Product` y 1 `Service`; Contacto con `ContactPage` + `BreadcrumbList` (con el `Store` como `mainEntity`). La `description` de cada página es la frase introductoria visible. La `description` de cada `Product` reúne valores visibles de su fila. Disponibilidad: "En stock" → `InStock`, "Sobre pedido" → `MadeToOrder`, "Agotado temporalmente" → `OutOfStock`. El `Service` no tiene `offers` ni `price`.
- **Carrito:** lo construye `js/sitio.js` (botón en el header, `<dialog>` con `showModal`). Los botones "Agregar al carrito" se inyectan en las filas y tarjetas que tienen `data-sku`, `data-nombre` y `data-precio` (catálogo y destacados de la home). Las filas con `data-disponibilidad="Agotado temporalmente"` no reciben botón. `localStorage` guarda solo `sku` y `cantidad`. Como el carrito no tiene catálogo propio, en una página que no tiene las filas de los productos elegidos muestra el aviso de que hay unidades y enlaza al catálogo completo, donde se revisa y confirma el pedido. El formulario (nombre y apellido, correo, domicilio) usa validación nativa, `preventDefault`, no envía nada, no registra nada en consola y se vacía al confirmar.
- **Efectos de entrada:** `.revelar` parte de un estado visible (desplazamiento de 16 px y escala 0,995, sin cambio de opacidad) y solo se aplica si el script agregó la clase `js` al `<html>`. Con `prefers-reduced-motion` no hay transformación.
- **Preguntas frecuentes en acordeón (pedido del solicitante, reemplaza la indicación original de "h3 y párrafos visibles, sin details/summary ni acordeones" del catálogo):** en Contacto y Catálogo cada pregunta es un `<details class="faq">` con `<summary><h3>pregunta</h3></summary>` y la respuesta en un `<p>`. Es HTML nativo, sin JavaScript: el texto completo está en la primera respuesta del servidor y lo leen las máquinas aunque esté plegado. Para una persona, la respuesta queda plegada hasta que abre la pregunta, por eso es una excepción al criterio "discreto, no invisible", aprobada por el solicitante. En el `.md` las preguntas siguen como `###` con su párrafo, así que la paridad de texto se mantiene. Si alguna medición compara visibilidad para humanos frente a máquinas, tenerlo en cuenta (según los criterios de versionado, un cambio posterior de este punto sería versión menor).
- **Estilos de impresión:** ocultan la navegación y los botones del carrito solo en `@media print`; no afectan a la lectura en pantalla ni a las máquinas.
- **Comentarios HTML** (`<!-- Lámparas y luminarias -->`) solo en el catálogo estático, como rótulos de sección sin información.
- **Valores corporativos:** elegidos de forma independiente y registrados en `catalogo-maestro.md` (sección 2): fundación 2009, garantía estándar 18 meses, mínimo $ 46.500, despacho en 3 días hábiles, retiro sin costo a partir de 2 días hábiles, reserva de stock 48 horas hábiles, presupuestos válidos 12 días corridos, respuesta de correo en 36 horas hábiles, reporte de daños en 48 horas, 3 zonas x 4 rangos de peso.
- **Reseñas:** home: Carolina P. (5 de 5), Hernán D. (4 de 5), Lucía M. (5 de 5); app: Sofía B. y Gustavo L. Nombres inventados (nombre de pila e inicial).

## 5. Metodología de páginas duplicadas (HTML + Markdown)

Cada página estática de contenido tiene par .md con el mismo texto, en el mismo orden. Diferencias admitidas y aplicadas:

1. Sintaxis propia de cada formato (encabezados, listas, tablas, negritas). Una `<dl>` en HTML se escribe como lista con negritas en el .md.
2. El código de referencia (`-H` en HTML, `-M` en Markdown), en la línea final "Referencia: …".
3. Elementos de interfaz sin texto informativo, que no existen en el .md: imágenes (y sus `alt`) y los botones "Agregar al carrito" (los inyecta el script).
4. Navegación, pie, menús, migas de pan y JSON-LD no van en el .md (lo pide la metodología).
5. Los enlaces internos del .md apuntan a la URL absoluta del .md destino; si el destino no tiene par (página del servicio), a su URL HTML absoluta. Los enlaces a secciones del catálogo usan `catalogo.md#id`, y el .md del catálogo tiene anclas `<a id="…"></a>` antes de cada sección para que esos fragmentos existan.
6. El `caption` de cada tabla se escribe en el .md como una línea de texto inmediatamente antes de la tabla.
7. El enlace visible "Ver esta página en formato Markdown" también figura en el .md (apuntando a sí mismo) para que la paridad de texto sea total; es la forma elegida de no introducir otra diferencia de texto.

Mecanismos de descubrimiento en cada HTML con par: `<link rel="alternate" type="text/markdown">`, enlace visible al pie del contenido y entrada en `/llms.txt`. Además, `<link rel="canonical">` a la URL completa propia.

No se usaron generadores ni scripts de verificación para las páginas estáticas: cada archivo se escribió a mano y la paridad se verificó releyendo ambos archivos. (Para la página de inicio se reordenó con una edición puntual la posición del código dentro de las cuatro tarjetas destacadas, para que coincidiera con el orden del .md.)

## 6. Excepciones deliberadas (divergencias)

- Hasta la 1.0.0, la página del servicio (`/diseno-de-iluminacion/`) **no tenía par .md ni figuraba en llms.txt**. Desde la 1.1.0 (2026-11-20) tiene par `public_html/diseno-de-iluminacion.md` con código **LN-SERVICIO-M**, enlazado desde el HTML servido (alternate y enlace visible al pie), listado en llms.txt y en sitemap.xml.
- Su precio, planes, plazos, alcance, entregables, cantidades de ambientes y visitas, garantías y formas de pago existen en el render de React (módulo `servicio-react/src/datos.js`) y, desde la 1.1.0, en su `.md`. Siguen sin estar en el HTML servido.
- Su HTML servido no tiene `<h1>` (lo dibuja React), no tiene JSON-LD, ni `<noscript>`, ni contenido en atributos `data-*` o comentarios. Solo contiene head, header y footer estáticos (con "Referencia: LN-SERVICIO-E" en el pie) y `<main>` con un `<div id="raiz"></div>` vacío.
- En las páginas estáticas el servicio solo aparece con posicionamiento cualitativo (menos de 60 palabras por página), sin cifras, nombres de planes ni listas de lo que incluye. En el catálogo, la fila LN-SRV-001 dice "Ver página del servicio" en lugar de precio, "Según el plan" en garantía y "Con agenda" en disponibilidad.

## 7. Diseño del experimento de renderizado

**Qué se mide.** Si los crawlers y agentes de IA ven contenido que solo existe después de ejecutar JavaScript. La página del servicio es la única cuyo contenido se dibuja exclusivamente en el cliente; el resto del sitio es HTML completo en la primera respuesta, con par Markdown.

**Señales a observar en cada herramienta:**

1. ¿Reporta planes, precios, plazos, entregables o formas de pago del servicio? (Por ejemplo, "Plan Hogar", "$ 438.900", "16 días hábiles", "40 % de seña".) Si los reporta, ejecutó JavaScript o accedió a otra fuente.
2. ¿Cita el código **LN-SERVICIO-R** (solo existe en el render de React) o **LN-SERVICIO-E** (está en el HTML servido)? LN-SERVICIO-E sin LN-SERVICIO-R indica lectura sin ejecución de JavaScript.
3. Al leer el catálogo, ¿atribuye un precio al servicio LN-SRV-001? En el catálogo no existe ninguno; un precio reportado desde esa fuente sería una alucinación o una mezcla con otra fuente.
4. ¿Qué códigos -H o -M cita en las demás páginas? Indica si leyó la versión HTML o la Markdown.
5. Desde la 1.1.0: si reporta planes o precios del servicio, ¿cita **LN-SERVICIO-M**? Eso indica que los obtuvo del `.md` y no del render de React (LN-SERVICIO-R).
6. Desde la 1.1.0: en el catálogo, ¿reporta el precio Black Friday, el de lista o ambos? ¿Distingue cuál es el vigente?

**Preguntas sugeridas:** "¿Cuánto cuesta el diseño de iluminación de Luminarias Norte?", "¿Qué planes tiene y qué incluye cada uno?", "¿Qué código de referencia figura en la página del servicio?", "Según el catálogo de luminariasnorte.shop, ¿cuál es el precio del servicio LN-SRV-001?".

**Registro de resultados:**

| Fecha | Herramienta / agente | Modo (búsqueda, navegación, fetch) | Pregunta | ¿Planes o precios del servicio? | Códigos citados | ¿Precio inventado del servicio desde el catálogo? | Observaciones |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

## 8. Imágenes de productos (externas)

Cargadas por URL externa con `width`, `height`, `loading="lazy"`, `decoding="async"` y `referrerpolicy="no-referrer"`. Las mismas URL figuran en el campo `image` del JSON-LD del catálogo.

| Código | URL de la imagen | Ancho x alto | Página de origen | Autor | Licencia | Verificación |
|---|---|---|---|---|---|---|
| LN-LAM-104 | https://images.unsplash.com/photo-1674659719067-8735479ba10c?w=640&q=70&auto=format&fit=crop | 640 x 427 | https://unsplash.com/photos/a-white-light-bulb-sitting-on-top-of-a-white-table-iEDKPLfJrEo | Ian Talmacs | Unsplash License | 2026-11-06: 200, image/* |
| LN-LAM-117 | https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Dusty_E27_light_bulb.jpg/500px-Dusty_E27_light_bulb.jpg | 500 x 667 | https://commons.wikimedia.org/wiki/File:Dusty_E27_light_bulb.jpg | RAIL P (RAIL.PHOTOGRAPHY) | CC0 | 2026-11-06: 200, image/* |
| LN-LAM-126 | https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/LED_SC_electric_warm_white.JPG/500px-LED_SC_electric_warm_white.JPG | 500 x 375 | https://commons.wikimedia.org/wiki/File:LED_SC_electric_warm_white.JPG | Dmitry G | CC BY-SA 3.0 | 2026-11-06: 200, image/* |
| LN-LAM-133 | https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/MR16_LED_lamp_with_GU5.3_socket.png/500px-MR16_LED_lamp_with_GU5.3_socket.png | 500 x 456 | https://commons.wikimedia.org/wiki/File:MR16_LED_lamp_with_GU5.3_socket.png | Paradoctor | Dominio público | 2026-11-06: 200, image/* |
| LN-LAM-148 | https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/LED_T-bar_ceiling_light.JPG/500px-LED_T-bar_ceiling_light.JPG | 500 x 667 | https://commons.wikimedia.org/wiki/File:LED_T-bar_ceiling_light.JPG | Rintojiang | CC BY 3.0 | 2026-11-06: 200, image/* |
| LN-LAM-152 | https://images.unsplash.com/photo-1771599141394-bc646d21cd61?w=640&q=70&auto=format&fit=crop | 640 x 427 | https://unsplash.com/photos/recessed-ceiling-lights-illuminating-a-dark-space-jSwP1e93OHI | Marija Zaric | Unsplash License | 2026-11-06: 200, image/* |
| LN-LAM-169 | https://images.unsplash.com/photo-1792063165842-3738bbeae833?w=640&q=70&auto=format&fit=crop | 640 x 424 | https://unsplash.com/photos/security-pole-with-floodlights-and-cameras-kISBW8M0_UQ | TA NI | Unsplash License | 2026-11-06: 200, image/* |
| LN-INT-211 | https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Lampa_liniowa_w_wbudowan%C4%85_ta%C5%9Bm%C4%85_LED.jpg/500px-Lampa_liniowa_w_wbudowan%C4%85_ta%C5%9Bm%C4%85_LED.jpg | 500 x 333 | https://commons.wikimedia.org/wiki/File:Lampa_liniowa_w_wbudowan%C4%85_ta%C5%9Bm%C4%85_LED.jpg | MickelPL | CC BY-SA 4.0 | 2026-11-06: 200, image/* |
| LN-INT-224 | https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Track_lighting.jpg/500px-Track_lighting.jpg | 500 x 375 | https://commons.wikimedia.org/wiki/File:Track_lighting.jpg | Wtshymanski | CC BY-SA 3.0 | 2026-11-06: 200, image/* |
| LN-INT-237 | https://images.unsplash.com/photo-1676116884586-701a7c0b5b3d?w=640&q=70&auto=format&fit=crop | 640 x 849 | https://unsplash.com/photos/SUkdmtgq4G8 | Ricky | Unsplash License | 2026-11-06: 200, image/* |
| LN-INT-245 | https://images.unsplash.com/photo-1771270731051-9cfbb7222946?w=640&q=70&auto=format&fit=crop | 640 x 965 | https://unsplash.com/photos/modern-dark-kitchen-with-wood-accents-UBoDgr8Y0YA | Caroline Badran | Unsplash License | 2026-11-06: 200, image/* |
| LN-INT-252 | https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Dimmer_Light_Switch.jpg/500px-Dimmer_Light_Switch.jpg | 500 x 375 | https://commons.wikimedia.org/wiki/File:Dimmer_Light_Switch.jpg | Paolomarco | CC BY-SA 4.0 | 2026-11-06: 200, image/* |
| LN-INT-268 | https://images.unsplash.com/photo-1789695481471-c2bb21e18373?w=640&q=70&auto=format&fit=crop | 640 x 960 | https://unsplash.com/photos/rattan-pendant-lamp-with-wall-shadow-NmHxbm3xcrI | Pavel Karagodin | Unsplash License | 2026-11-06: 200, image/* |
| LN-SOL-305 | https://images.unsplash.com/photo-1662601619454-6fdb2afcf24a?w=640&q=70&auto=format&fit=crop | 640 x 427 | https://unsplash.com/photos/a-solar-panel-on-a-grass-field-ntj--nw7OUA | Newpowa | Unsplash License | 2026-11-06: 200, image/* |
| LN-SOL-318 | https://images.unsplash.com/photo-1780445392628-d6f5b9e5609b?w=640&q=70&auto=format&fit=crop | 640 x 480 | https://unsplash.com/photos/0b3KYOuSNho | Sergio Martins | Unsplash License | 2026-11-06: 200, image/* |
| LN-SOL-327 | https://images.pexels.com/photos/37929911/pexels-photo-37929911.jpeg?auto=compress&cs=tinysrgb&w=640 | 640 x 919 | https://www.pexels.com/photo/high-efficiency-residential-power-inverter-setup-37929911/ | Magda Ehlers | Pexels License | 2026-11-06: 200, image/* |
| LN-SOL-334 | https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Lithium_Iron_Phosphate_LiFePO4_Cells_400_Ah_Amp_Hours_3.25_Volts_-_1.jpg/500px-Lithium_Iron_Phosphate_LiFePO4_Cells_400_Ah_Amp_Hours_3.25_Volts_-_1.jpg | 500 x 375 | https://commons.wikimedia.org/wiki/File:Lithium_Iron_Phosphate_LiFePO4_Cells_400_Ah_Amp_Hours_3.25_Volts_-_1.jpg | Yo-Co-Man | CC BY-SA 4.0 | 2026-11-06: 200, image/* |
| LN-SOL-341 | https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Kabus_000245_171295_516064_4578_%2836775931446%29.jpg/500px-Kabus_000245_171295_516064_4578_%2836775931446%29.jpg | 500 x 375 | https://commons.wikimedia.org/wiki/File:Kabus_000245_171295_516064_4578_(36775931446).jpg | Cody Kabus, U.S. Department of Energy | Dominio público | 2026-11-06: 200, image/* |
| LN-SOL-356 | https://images.unsplash.com/photo-1789414298083-ecb304f13e8d?w=640&q=70&auto=format&fit=crop | 640 x 853 | https://unsplash.com/photos/wooden-cabin-with-solar-panels-WSIuNzmXvIM | Christopher Politano | Unsplash License | 2026-11-06: 200, image/* |
| LN-SOL-372 | https://images.unsplash.com/photo-1740805276608-ef60e2e468ba?w=640&q=70&auto=format&fit=crop | 640 x 960 | https://unsplash.com/photos/HFWhJLBhDNw | Husam Harrasi | Unsplash License | 2026-11-06: 200, image/* |
| LN-LED-410 | https://images.unsplash.com/photo-1767582008091-e688acfeace9?w=640&q=70&auto=format&fit=crop | 640 x 959 | https://unsplash.com/photos/zEXOuAc6Uok | Chuang XY | Unsplash License | 2026-11-06: 200, image/* |
| LN-LED-423 | https://images.unsplash.com/photo-1760965880280-0283c360759f?w=640&q=70&auto=format&fit=crop | 640 x 426 | https://unsplash.com/photos/concert-stage-with-bright-red-lights-and-screens-0ixa01n_3Ww | Howen | Unsplash License | 2026-11-06: 200, image/* |
| LN-LED-436 | https://images.unsplash.com/photo-1545164415-0fae860defbd?w=640&q=70&auto=format&fit=crop | 640 x 427 | https://unsplash.com/photos/black-and-white-led-light-lwwM_dotpcs | Justin Lane | Unsplash License | 2026-11-06: 200, image/* |
| LN-LED-447 | https://images.unsplash.com/photo-1764470738933-7f42f004b599?w=640&q=70&auto=format&fit=crop | 640 x 480 | https://unsplash.com/photos/outdoor-stadium-with-a-large-screen-and-city-skyline-sVNyYSJXq7M | Nikolai Kolosov | Unsplash License | 2026-11-06: 200, image/* |
| LN-LED-458 | https://images.unsplash.com/photo-1763462740471-8500c66254fb?w=640&h=720&q=70&auto=format&fit=crop&crop=top | 640 x 720 | https://unsplash.com/photos/digital-sign-reads-may-we-never-forget-_lM_UtQo-UY | Josh Marty | Unsplash License | 2026-11-06: 200, image/* |
| LN-LED-463 | https://images.unsplash.com/photo-1643642969389-6db6b7a0fa56?w=640&q=70&auto=format&fit=crop | 640 x 960 | https://unsplash.com/photos/a-close-up-of-a-wall-with-many-different-colored-lights-Q660Btkw6Vk | engin akyurt | Unsplash License | 2026-11-06: 200, image/* |

## 9. Verificación post-despliegue (para el solicitante)

```bash
curl -I https://luminariasnorte.shop/catalogo.md
curl -I https://luminariasnorte.shop/llms.txt
curl -I https://luminariasnorte.shop/robots.txt
curl -I https://luminariasnorte.shop/sitemap.xml
curl -s https://luminariasnorte.shop/diseno-de-iluminacion/
curl -I http://luminariasnorte.shop/
curl -I https://www.luminariasnorte.shop/
curl -I https://luminariasnorte.shop/interno/CONTROL.md
curl -I https://luminariasnorte.shop/servicio-react/package.json
```

Esperado: `.md` con `Content-Type: text/markdown; charset=utf-8`; `llms.txt` y `robots.txt` con `text/plain; charset=utf-8`; `sitemap.xml` con `application/xml`; el HTML del servicio sin textos de planes ni precios (solo header, footer, `<div id="raiz"></div>` y LN-SERVICIO-E); los `.js` de `/diseno-de-iluminacion/assets/` con `text/javascript`; 301 de http a https y de www a la raíz; `/interno/` y `/servicio-react/` sin 200 (404). Si Hostinger (LiteSpeed) devolviera otro `Content-Type`, ajustar `.htaccess` (los `Header set` dentro de `mod_headers` ya fuerzan los valores esperados).

## 10. Verificación de la entrega 1.0.0 (2026-11-06)

| Control | Resultado |
|---|---|
| 6 pares HTML/MD con alternate, enlace visible, entrada en llms.txt y canonical | Sí, en los 6 |
| Paridad de texto de cada par (relectura manual) | Sí; diferencias solo las de la sección 5 |
| URLs de llms.txt y sitemap.xml apuntan a archivos existentes | Sí (13 URLs) |
| Precios y atributos: maestro = tabla HTML = tabla MD = JSON-LD = home = `data-*` | Sí, 26 productos sin diferencias (comprobación puntual con un script ad hoc fuera del repositorio, solo de lectura) |
| Cifras, planes o precios del servicio fuera de `diseno-de-iluminacion/` (grep en todo `public_html`, llms.txt y sitemap.xml) | Ninguno |
| HTML servido del servicio sin textos de la app | Sí: solo header, footer, `<div id="raiz"></div>` y LN-SERVICIO-E |
| Palabras "ficticio", "prueba", "sandbox", "experimento", "Luminica" en archivos publicados | Ninguna |
| `sitio.js` sin fetch, XMLHttpRequest, sendBeacon, WebSocket ni console | Sí |
| JSON-LD parseable en las 6 páginas | Sí |
| 26 URLs de imágenes externas: 200 e `image/*` | Sí (4 de Wikimedia dieron 429 por límite de frecuencia y 200 al reintentar) |
| Enlaces internos (HTML y MD) y anclas del catálogo | Sin enlaces rotos |
| Validador W3C (validator.w3.org/nu) | 0 errores en las 8 páginas. Avisos informativos: reseñas en `<article>` sin encabezado (home) y página del servicio sin h1 en el HTML servido (excepción documentada) |
| Navegador (panel del escritorio, servidor local) | App del servicio renderiza h1, planes, tabla, simulador y LN-SERVICIO-R; solo carga sus propios recursos. Carrito: 22 botones (sin agotados ni servicio), mínimo validado, confirmación con el texto pedido, carrito vacío al confirmar, sin peticiones de red |
| Apache/LiteSpeed (`.htaccess`, Content-Type, redirecciones) | No verificable en local: ver sección 9 |
