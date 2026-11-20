# Luminarias Norte — luminariasnorte.shop

Sitio web de **Luminarias Norte**, empresa de iluminación con showroom en Junín de los Andes (Neuquén, Argentina): lámparas y luminarias, diseño de iluminación para interiores, energía solar y pantallas LED, con precios en pesos e IVA incluido.

El sitio se publica en [https://luminariasnorte.shop](https://luminariasnorte.shop) sobre Hostinger (Apache/LiteSpeed, hosting compartido que sirve archivos estáticos y no ejecuta Node).

## Características

- **Sitio estático escrito a mano.** HTML5 semántico, un único `css/estilos.css` y un único `js/sitio.js`, sin frameworks ni build. Todo el contenido está en el HTML de la primera respuesta del servidor.
- **Páginas duplicadas HTML + Markdown.** Cada página de contenido existe como HTML (para personas) y como `.md` (para máquinas) con el mismo texto. El `.md` se descubre por `<link rel="alternate" type="text/markdown">`, por un enlace visible al pie del contenido y por [`llms.txt`](public_html/llms.txt).
- **Página del servicio en React.** `/diseno-de-iluminacion/` es una app de Vite + React que se renderiza solo en el navegador. Su HTML servido contiene únicamente el encabezado, el pie y un contenedor vacío, más el enlace a su versión Markdown (`diseno-de-iluminacion.md`).
- **Carrito de interfaz.** Lo crea `sitio.js` y guarda en `localStorage` solo códigos y cantidades. No tiene backend y no hace peticiones de red.
- **Descubrimiento y datos estructurados.** `robots.txt` permisivo, `sitemap.xml`, `llms.txt` y JSON-LD escrito a mano (`Store`, `WebPage`, `BreadcrumbList`, `ItemList` de `Product`, `Service`, `ContactPage`).
- **Accesibilidad y diseño.** Contraste AA, foco visible y navegación por teclado. Modo oscuro, `prefers-reduced-motion` y diseño responsive mobile-first. Paleta derivada del logo y sin fuentes ni scripts de terceros.

## Estructura

```
public_html/                  se publica (raíz del dominio)
├── index.html  index.md
├── quienes-somos/  quienes-somos.md
├── catalogo/  catalogo.md
├── envios/  envios.md
├── bases-y-condiciones/  bases-y-condiciones.md
├── contacto/  contacto.md
├── diseno-de-iluminacion/    generado por el build de React (no editar a mano)
├── css/estilos.css
├── js/sitio.js
├── imagenes/                 logo, isotipo, fachada, interior, promoción de panel
├── 404.html  llms.txt  robots.txt  sitemap.xml  .htaccess
servicio-react/               código fuente de la app del servicio (no se publica)
interno/                      documentación interna (no se publica)
├── catalogo-maestro.md       fuente única de precios, códigos y valores
├── CONTROL.md                control de pares HTML/MD
└── DOCUMENTACION.md          decisiones, imágenes, versiones y verificación
```

## Ver el sitio en local

Las rutas son absolutas (`/css/…`, `/imagenes/…`), así que hay que servir la carpeta `public_html` con un servidor local. Abrir los archivos con doble clic no funciona.

```bash
npx serve public_html -l 4321
```

Después abrí `http://localhost:4321/`. El `.htaccess` (redirecciones, headers y tipos MIME) solo se aplica en el servidor real. Las fotos de productos se cargan desde Unsplash, Pexels y Wikimedia Commons, así que hace falta conexión.

## Reconstruir la app del servicio

Requisitos: Node 24 y npm 11. Las versiones exactas están fijadas en `package.json` y `package-lock.json`.

```bash
cd servicio-react
npm ci
npm run build
```

El build escribe en `public_html/diseno-de-iluminacion/` y vacía esa carpeta antes de compilar. Los datos del servicio están en `servicio-react/src/datos.js`. Commiteá el código fuente y el compilado juntos.

## Publicar

Subí a Hostinger **solo el contenido de `public_html/`**; `servicio-react/` e `interno/` nunca se suben. Después del despliegue, revisá la lista de la sección 9 de [`interno/DOCUMENTACION.md`](interno/DOCUMENTACION.md):

- `Content-Type` de los `.md` y de `llms.txt`;
- redirecciones de http a https y de www a la raíz;
- respuesta 404 de `/interno/` y `/servicio-react/`;
- validación del JSON-LD;
- prueba manual del carrito.

## Cómo modificar contenido

1. **Datos primero.** Todo precio, código o valor corporativo sale de [`interno/catalogo-maestro.md`](interno/catalogo-maestro.md): cambialo ahí y después copialo sin variaciones a las tablas HTML y MD, al JSON-LD, a la home y a los atributos `data-*`.
2. **Pares siempre juntos.** Al cambiar una página, editá el `.html` y el `.md` en el mismo commit, con el mismo texto. La única diferencia de texto admitida es el código de referencia (`LN-…-H` / `LN-…-M`). Actualizá también la fecha y la paridad en `interno/CONTROL.md`.
3. **Página nueva.** Creá los dos archivos con códigos distintos y agregá:
   - `alternate`, canonical y enlace visible al `.md`;
   - la línea en `llms.txt` y la URL en `sitemap.xml`;
   - el enlace en la navegación;
   - la fila en `CONTROL.md`.
4. **Nada oculto.** No uses `display:none`, `visibility:hidden` ni trucos de posicionamiento con contenido informativo.
5. **Sin terceros.** No agregues scripts, fuentes ni CDN externos; las únicas excepciones son las imágenes de productos.
6. **Datos del servicio en la app y en su `.md`.** Precios y planes del servicio de diseño viven en la app React (`servicio-react/src/datos.js`) y en `public_html/diseno-de-iluminacion.md`: si cambian, actualizá los dos. No los copies a otras páginas estáticas ni al JSON-LD.
7. **Promociones.** Los precios de lista y los de la promoción vigente están en el maestro (sección 3.5); el `data-precio` y el `price` del JSON-LD llevan el precio promocional.

## Versionado

Semántico (`mayor.menor.parche`), con un tag de Git por versión. El registro y los criterios están en [`interno/DOCUMENTACION.md`](interno/DOCUMENTACION.md). Versión actual: **1.1.0**.

## Créditos

Las fotos de productos se usan bajo licencias Unsplash, Pexels, CC0, CC BY y CC BY-SA. El detalle por imagen está en la sección "Créditos de las fotografías" del catálogo y en `interno/DOCUMENTACION.md`. Logo e imágenes del local: © Luminarias Norte.

© 2026 Luminarias Norte. Todos los derechos reservados.
