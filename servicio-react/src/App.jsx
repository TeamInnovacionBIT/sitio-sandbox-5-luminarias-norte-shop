import { useId, useMemo, useState } from 'react';
import { motion, MotionConfig, useReducedMotion } from 'motion/react';
import { ambientes, comparativa, condiciones, contacto, etapas, planes, preguntas, resenas, servicio } from './datos.js';

const pesos = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0, minimumFractionDigits: 0 });

// Entradas suaves: solo desplazamiento y opacidad parcial; nunca modifican texto.
const entrada = {
  initial: { y: 22, opacity: 0.35 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, margin: '0px 0px -10% 0px' },
  transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] },
};

function Hero() {
  const reducir = useReducedMotion();
  return (
    <section className="srv-hero" aria-labelledby="srv-titulo">
      <div className="contenedor srv-hero__grilla">
        <motion.div {...entrada}>
          <p className="etiqueta">Servicio destacado de Luminarias Norte</p>
          <h1 id="srv-titulo">{servicio.nombre}</h1>
          <p className="srv-hero__bajada">
            Diseñamos la luz de tu casa, tu local o tu oficina ambiente por ambiente: dónde va cada luminaria, qué temperatura de color conviene y cuánta luz necesita cada tarea. Vos elegís el plan; nosotros te entregamos un proyecto listo para instalar.
          </p>
          <div className="hero__acciones">
            <a className="boton boton--primario" href="#planes">Ver planes y precios</a>
            <a className="boton boton--secundario" href="/contacto/">Consultar por mi proyecto</a>
          </div>
        </motion.div>
        <div className="srv-lampara" aria-hidden="true">
          <svg viewBox="0 0 240 260" focusable="false">
            <defs>
              <radialGradient id="srv-halo" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ffe27a" stopOpacity="0.95" />
                <stop offset="55%" stopColor="#f5c400" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#f5c400" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="srv-cono" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffd84d" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#ffd84d" stopOpacity="0" />
              </linearGradient>
            </defs>
            <line x1="120" y1="0" x2="120" y2="70" stroke="currentColor" strokeWidth="3" />
            <motion.polygon
              points="92,118 148,118 220,258 20,258"
              fill="url(#srv-cono)"
              animate={reducir ? undefined : { opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              cx="120" cy="112" r="70" fill="url(#srv-halo)"
              animate={reducir ? undefined : { scale: [0.92, 1.06, 0.92] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '120px 112px' }}
            />
            <path d="M84 118 Q120 58 156 118 Z" fill="#17140e" />
            <circle cx="120" cy="120" r="9" fill="#fff6cc" />
          </svg>
        </div>
      </div>
    </section>
  );
}

function QueEs() {
  return (
    <section className="seccion contenedor" aria-labelledby="srv-que-es">
      <motion.div className="srv-dos-columnas" {...entrada}>
        <div>
          <h2 id="srv-que-es">Qué es el servicio</h2>
          <p>Es un proyecto de iluminación hecho a medida por nuestro equipo de diseño. Partimos de cómo vivís o trabajás en cada espacio, de la luz natural que recibe y de los materiales, y definimos la iluminación completa antes de comprar una sola lámpara.</p>
          <p>El resultado es un conjunto de planos, listas y renders que tu electricista puede seguir paso a paso, con productos concretos de nuestro catálogo o equivalentes.</p>
        </div>
        <dl className="srv-beneficios">
          <div><dt>Confort</dt><dd>Cada tarea tiene su luz: cocinar, leer, trabajar o descansar.</dd></div>
          <div><dt>Eficiencia</dt><dd>Menos luminarias mejor ubicadas y LED de bajo consumo.</dd></div>
          <div><dt>Carácter</dt><dd>Escenas y acentos que destacan lo que más te gusta de tu espacio.</dd></div>
          <div><dt>Certeza</dt><dd>Ves el resultado en renders antes de comprar e instalar.</dd></div>
        </dl>
      </motion.div>
    </section>
  );
}

function Proceso() {
  return (
    <section className="seccion seccion--alterna" aria-labelledby="srv-proceso">
      <div className="contenedor">
        <h2 id="srv-proceso">Cómo trabajamos, paso a paso</h2>
        <ol className="srv-etapas">
          {etapas.map((e, i) => (
            <motion.li key={e.titulo} {...entrada} transition={{ ...entrada.transition, delay: i * 0.05 }}>
              <span className="srv-etapas__numero" aria-hidden="true">{i + 1}</span>
              <h3>{e.titulo}</h3>
              <p className="srv-etapas__plazo">{e.plazo}</p>
              <p>{e.texto}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Planes() {
  return (
    <section className="seccion contenedor" id="planes" aria-labelledby="srv-planes">
      <h2 id="srv-planes">Planes y precios</h2>
      <p className="seccion__intro">Tres planes con alcance, plazos y entregables definidos. Precios finales en pesos argentinos con IVA incluido.</p>
      <div className="srv-planes">
        {planes.map((p) => (
          <motion.article key={p.id} className={'srv-plan' + (p.destacado ? ' srv-plan--destacado' : '')} aria-labelledby={'plan-' + p.id} {...entrada} whileHover={{ y: -4 }}>
            {p.destacado && <p className="srv-plan__sello">El más elegido</p>}
            <h3 id={'plan-' + p.id}>{p.nombre}</h3>
            <p className="srv-plan__bajada">{p.bajada}</p>
            <p className="srv-plan__precio">{pesos.format(p.precio)} <span>IVA incluido</span></p>
            <dl className="srv-plan__datos">
              <div><dt>Alcance</dt><dd>{p.ambientes}</dd></div>
              <div><dt>Visitas</dt><dd>{p.visitas}</dd></div>
              <div><dt>Plazo de entrega</dt><dd>{p.plazo}</dd></div>
              <div><dt>Ajustes</dt><dd>{p.ajustes}</dd></div>
              <div><dt>Garantía</dt><dd>{p.garantia}</dd></div>
              <div><dt>Forma de pago</dt><dd>{p.pago}</dd></div>
            </dl>
            <h4>Entregables</h4>
            <ul>{p.entregables.map((e) => <li key={e}>{e}</li>)}</ul>
            <a className="boton boton--primario" href="/contacto/">Consultar por el {p.nombre}</a>
          </motion.article>
        ))}
      </div>

      <div className="tabla-contenedor" tabIndex={0} role="region" aria-label="Comparativa de planes">
        <table>
          <caption>Comparativa de los planes de diseño de iluminación para interiores</caption>
          <thead>
            <tr>
              <th scope="col">Concepto</th>
              {planes.map((p) => <th scope="col" key={p.id}>{p.nombre}</th>)}
            </tr>
          </thead>
          <tbody>
            {comparativa.map((fila) => (
              <tr key={fila.concepto}>
                <th scope="row">{fila.concepto}</th>
                {fila.valores.map((v, i) => <td key={i}>{v}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>Condiciones de todos los planes</h3>
      <ul className="srv-condiciones">{condiciones.map((c) => <li key={c}>{c}</li>)}</ul>
    </section>
  );
}

// Conversión aproximada de temperatura de color (K) a RGB.
function kelvinARgb(k) {
  const t = k / 100;
  let r, g, b;
  if (t <= 66) { r = 255; g = 99.4708025861 * Math.log(t) - 161.1195681661; }
  else { r = 329.698727446 * Math.pow(t - 60, -0.1332047592); g = 288.1221695283 * Math.pow(t - 60, -0.0755148492); }
  if (t >= 66) b = 255; else if (t <= 19) b = 0; else b = 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  const c = (v) => Math.round(Math.min(255, Math.max(0, v)));
  return [c(r), c(g), c(b)];
}

function atmosfera(k) {
  if (k <= 3000) return { nombre: 'Cálida', texto: 'Luz acogedora, parecida a la de una lámpara incandescente. Invita a descansar y a la sobremesa: ideal para dormitorios, livings y comedores.' };
  if (k <= 3500) return { nombre: 'Cálida neutra', texto: 'Mantiene la calidez pero gana nitidez. Funciona muy bien en cocinas integradas, baños y locales que buscan un clima amable.' };
  if (k <= 4500) return { nombre: 'Neutra', texto: 'Luz equilibrada y clara, buena para concentrarse sin sentirse en una oficina. Conviene en escritorios, cocinas y talleres.' };
  if (k <= 5500) return { nombre: 'Fría', texto: 'Luz blanca y enérgica, cercana a la del mediodía. Útil en áreas de trabajo técnico, depósitos y exhibición de productos.' };
  return { nombre: 'Muy fría', texto: 'Luz azulada, de alto contraste. Se usa en exteriores, estacionamientos y cartelería; en una casa resulta impersonal.' };
}

function Simulador() {
  const [k, setK] = useState(3000);
  const id = useId();
  const [r, g, b] = useMemo(() => kelvinARgb(k), [k]);
  const luz = `rgb(${r} ${g} ${b})`;
  const at = atmosfera(k);
  return (
    <section className="seccion seccion--alterna" aria-labelledby="srv-simulador">
      <div className="contenedor srv-simulador">
        <div>
          <h2 id="srv-simulador">Simulador de temperatura de color</h2>
          <p>Mové el control para ver cómo cambia el clima de un living según la temperatura de color de la luz.</p>
          <label htmlFor={id} className="srv-simulador__etiqueta">Temperatura de color: <output htmlFor={id}>{k} K</output></label>
          <input
            id={id}
            type="range"
            min="2700"
            max="6500"
            step="100"
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
            aria-valuetext={`${k} kelvin, luz ${at.nombre.toLowerCase()}`}
            className="srv-rango"
          />
          <div className="srv-rango__extremos" aria-hidden="true"><span>2700 K</span><span>6500 K</span></div>
          <div className="srv-atmosfera" aria-live="polite">
            <h3>Atmósfera: {at.nombre}</h3>
            <p>{at.texto}</p>
          </div>
        </div>
        <figure className="srv-escena">
          <svg viewBox="0 0 400 270" role="img" aria-labelledby={id + '-desc'}>
            <title id={id + '-desc'}>{`Living dibujado con una lámpara colgante encendida a ${k} K`}</title>
            <defs>
              <radialGradient id={id + '-luz'} cx="50%" cy="22%" r="75%">
                <stop offset="0%" stopColor={luz} stopOpacity="0.95" />
                <stop offset="60%" stopColor={luz} stopOpacity="0.35" />
                <stop offset="100%" stopColor={luz} stopOpacity="0.08" />
              </radialGradient>
            </defs>
            <rect x="0" y="0" width="400" height="200" fill="#d9d4cb" />
            <rect x="0" y="200" width="400" height="70" fill="#8a6a4a" />
            <rect x="34" y="40" width="90" height="100" fill="#2a3346" stroke="#efe9dd" strokeWidth="6" />
            <line x1="79" y1="40" x2="79" y2="140" stroke="#efe9dd" strokeWidth="4" />
            <rect x="250" y="70" width="90" height="62" fill="#b58a5c" stroke="#5a3e24" strokeWidth="4" />
            <rect x="140" y="170" width="190" height="52" rx="10" fill="#4f6b5d" />
            <rect x="130" y="156" width="210" height="26" rx="10" fill="#5d7c6c" />
            <rect x="150" y="222" width="12" height="16" fill="#3a2a1a" /><rect x="308" y="222" width="12" height="16" fill="#3a2a1a" />
            <rect x="60" y="214" width="70" height="8" rx="3" fill="#3a2a1a" />
            <line x1="200" y1="0" x2="200" y2="52" stroke="#222" strokeWidth="2" />
            <path d="M178 70 Q200 40 222 70 Z" fill="#1c1a16" />
            <rect x="0" y="0" width="400" height="270" fill={`url(#${id}-luz)`} style={{ mixBlendMode: 'multiply' }} />
            <circle cx="200" cy="72" r="7" fill={luz} />
            <ellipse cx="200" cy="74" rx="34" ry="14" fill={luz} opacity="0.55" />
          </svg>
        </figure>
      </div>
    </section>
  );
}

function Ambientes() {
  return (
    <section className="seccion contenedor" aria-labelledby="srv-ambientes">
      <h2 id="srv-ambientes">Ambientes que diseñamos</h2>
      <div className="grilla grilla--3">
        {ambientes.map((a) => (
          <motion.article key={a.nombre} className="tarjeta" {...entrada}>
            <h3>{a.nombre}</h3>
            <p className="srv-kelvin">Temperatura sugerida: {a.kelvin}</p>
            <p>{a.texto}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Resenas() {
  return (
    <section className="seccion seccion--alterna" aria-labelledby="srv-resenas">
      <div className="contenedor">
        <h2 id="srv-resenas">Lo que dicen quienes nos contrataron</h2>
        <div className="grilla grilla--2">
          {resenas.map((r) => (
            <motion.article key={r.nombre} className="tarjeta resena" {...entrada}>
              <p className="resena__valoracion">Valoración: {r.valoracion} de 5</p>
              <blockquote><p>{r.texto}</p></blockquote>
              <p><cite>{r.nombre}</cite></p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pregunta({ item, abierta, alternar, indice }) {
  const base = useId();
  return (
    <div className="srv-faq__item">
      <h3>
        <button type="button" aria-expanded={abierta} aria-controls={base + '-r'} id={base + '-b'} onClick={() => alternar(indice)}>
          <span>{item.p}</span>
          <span className="srv-faq__icono" aria-hidden="true">{abierta ? '−' : '+'}</span>
        </button>
      </h3>
      <div id={base + '-r'} role="region" aria-labelledby={base + '-b'} hidden={!abierta}>
        <p>{item.r}</p>
      </div>
    </div>
  );
}

function Preguntas() {
  const [abierta, setAbierta] = useState(0);
  return (
    <section className="seccion contenedor" aria-labelledby="srv-faq">
      <h2 id="srv-faq">Preguntas frecuentes</h2>
      <div className="srv-faq">
        {preguntas.map((q, i) => (
          <Pregunta key={q.p} item={q} indice={i} abierta={abierta === i} alternar={(n) => setAbierta(abierta === n ? -1 : n)} />
        ))}
      </div>
    </section>
  );
}

function Consulta() {
  return (
    <section className="seccion contenedor" aria-labelledby="srv-consulta">
      <motion.div className="destacado-servicio" {...entrada}>
        <div>
          <p className="etiqueta">Empecemos por tu proyecto</p>
          <h2 id="srv-consulta">Consultanos sin compromiso</h2>
          <p>Contanos qué ambientes querés iluminar y te recomendamos el plan adecuado. {contacto.respuesta}</p>
          <address className="srv-contacto">
            <p>Correo: <a href={'mailto:' + contacto.correo}>{contacto.correo}</a></p>
            <p>Teléfono: <a href={contacto.telefonoEnlace}>{contacto.telefono}</a></p>
            <p>Horarios de atención: {contacto.horarios}</p>
          </address>
        </div>
        <p><a className="boton boton--primario" href="/contacto/">Ir a la página de contacto</a></p>
      </motion.div>
      <div className="pie-contenido">
        <p>Referencia: LN-SERVICIO-R</p>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <nav className="migas contenedor" aria-label="Migas de pan">
        <ol>
          <li><a href="/">Inicio</a></li>
          <li><span aria-current="page">{servicio.nombre}</span></li>
        </ol>
      </nav>
      <Hero />
      <QueEs />
      <Proceso />
      <Planes />
      <Simulador />
      <Ambientes />
      <Resenas />
      <Preguntas />
      <Consulta />
    </MotionConfig>
  );
}
