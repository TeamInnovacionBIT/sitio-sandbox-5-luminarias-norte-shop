/* Luminarias Norte — sitio.js
   Escrito a mano, sin librerías ni build. Regla: el JavaScript nunca oculta ni crea contenido
   informativo de la página; solo agrega efectos decorativos y el carrito (que es interfaz). */
(function () {
  'use strict';

  var doc = document;
  var raiz = doc.documentElement;
  raiz.classList.add('js');

  var reducirMovimiento = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Sombra del encabezado ---------- */
  var encabezado = doc.querySelector('.encabezado');
  function actualizarSombra() {
    if (encabezado) encabezado.classList.toggle('con-sombra', window.scrollY > 8);
  }
  window.addEventListener('scroll', actualizarSombra, { passive: true });
  actualizarSombra();

  /* ---------- Entradas suaves (parten de un estado visible) ---------- */
  if (!reducirMovimiento && 'IntersectionObserver' in window) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('revelado');
          observador.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    doc.querySelectorAll('.revelar').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight) { el.classList.add('revelado'); } else { observador.observe(el); }
    });
  } else {
    doc.querySelectorAll('.revelar').forEach(function (el) { el.classList.add('revelado'); });
  }

  /* ---------- Carrito ---------- */
  var CLAVE = 'ln-carrito-v1';
  var MINIMO = 46500;
  var formato = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0, minimumFractionDigits: 0 });

  // Productos conocidos en esta página, leídos de los atributos data-* de las filas.
  var productos = {};
  doc.querySelectorAll('[data-sku][data-nombre][data-precio]').forEach(function (el) {
    var precio = parseInt(el.getAttribute('data-precio'), 10);
    if (!isNaN(precio)) {
      productos[el.getAttribute('data-sku')] = { nombre: el.getAttribute('data-nombre'), precio: precio };
    }
  });

  function leer() {
    try {
      var datos = JSON.parse(window.localStorage.getItem(CLAVE) || '[]');
      if (!Array.isArray(datos)) return [];
      return datos.filter(function (i) {
        return i && typeof i.sku === 'string' && /^LN-[A-Z]{3}-\d{3}$/.test(i.sku) && i.cantidad > 0;
      }).map(function (i) { return { sku: i.sku, cantidad: Math.min(99, Math.floor(i.cantidad)) }; });
    } catch (e) { return []; }
  }
  function guardar(items) {
    try { window.localStorage.setItem(CLAVE, JSON.stringify(items.map(function (i) { return { sku: i.sku, cantidad: i.cantidad }; }))); } catch (e) { /* almacenamiento no disponible */ }
  }

  var items = leer();

  function el(etiqueta, atributos, hijos) {
    var nodo = doc.createElement(etiqueta);
    if (atributos) Object.keys(atributos).forEach(function (k) {
      if (k === 'texto') nodo.textContent = atributos[k];
      else if (k === 'clase') nodo.className = atributos[k];
      else nodo.setAttribute(k, atributos[k]);
    });
    (hijos || []).forEach(function (h) { if (h) nodo.appendChild(typeof h === 'string' ? doc.createTextNode(h) : h); });
    return nodo;
  }

  function totalUnidades() { return items.reduce(function (s, i) { return s + i.cantidad; }, 0); }

  // Botón del carrito en el encabezado
  var barra = doc.querySelector('.encabezado__barra');
  if (!barra) return;
  var contador = el('span', { clase: 'boton-carrito__contador', 'aria-hidden': 'true' });
  var textoAccesible = el('span', { clase: 'boton-carrito__texto' });
  var botonCarrito = el('button', { type: 'button', clase: 'boton-carrito', 'aria-haspopup': 'dialog' });
  botonCarrito.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3.5h2.6l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1l1.6-6.8H6.2"/></svg>';
  botonCarrito.appendChild(textoAccesible);
  botonCarrito.appendChild(contador);
  barra.appendChild(botonCarrito);

  var vivo = el('p', { 'aria-live': 'polite', clase: 'carrito__aviso', style: 'margin:0' });
  vivo.setAttribute('role', 'status');

  function actualizarBoton() {
    var n = totalUnidades();
    textoAccesible.textContent = 'Carrito';
    contador.textContent = String(n);
    botonCarrito.setAttribute('aria-label', 'Carrito: ' + n + (n === 1 ? ' producto' : ' productos'));
  }

  // Diálogo
  var dialogo = el('dialog', { clase: 'carrito', 'aria-labelledby': 'carrito-titulo' });
  var titulo = el('h2', { id: 'carrito-titulo', texto: 'Tu carrito' });
  var cerrar = el('button', { type: 'button', clase: 'carrito__cerrar', 'aria-label': 'Cerrar carrito', texto: '×' });
  var cuerpo = el('div', { clase: 'carrito__cuerpo' });
  dialogo.appendChild(el('div', { clase: 'carrito__cabecera' }, [titulo, cerrar]));
  dialogo.appendChild(cuerpo);
  doc.body.appendChild(dialogo);
  cerrar.addEventListener('click', function () { dialogo.close(); });
  dialogo.addEventListener('click', function (e) { if (e.target === dialogo) dialogo.close(); });

  botonCarrito.addEventListener('click', function () {
    dibujar();
    if (typeof dialogo.showModal === 'function') dialogo.showModal(); else dialogo.setAttribute('open', '');
  });

  function subtotalConocido() {
    return items.reduce(function (s, i) { var p = productos[i.sku]; return p ? s + p.precio * i.cantidad : s; }, 0);
  }

  function cambiar(sku, cantidad) {
    items = items.map(function (i) { return i.sku === sku ? { sku: sku, cantidad: cantidad } : i; })
      .filter(function (i) { return i.cantidad > 0; });
    guardar(items); actualizarBoton(); dibujar();
  }

  function dibujar() {
    cuerpo.textContent = '';
    if (!items.length) {
      cuerpo.appendChild(el('p', { texto: 'Tu carrito está vacío. Agregá productos desde el catálogo.' }));
      cuerpo.appendChild(el('p', {}, [el('a', { href: '/catalogo/', texto: 'Ir al catálogo completo' })]));
      return;
    }
    var lista = el('ul', { clase: 'carrito__lista' });
    var desconocidos = 0;
    items.forEach(function (i) {
      var p = productos[i.sku];
      if (!p) { desconocidos += i.cantidad; return; }
      var id = 'cant-' + i.sku;
      var entrada = el('input', { type: 'number', id: id, min: '1', max: '99', inputmode: 'numeric', value: String(i.cantidad) });
      entrada.addEventListener('change', function () {
        var v = parseInt(entrada.value, 10);
        cambiar(i.sku, isNaN(v) ? i.cantidad : Math.max(1, Math.min(99, v)));
      });
      var quitar = el('button', { type: 'button', clase: 'carrito__quitar', texto: 'Quitar', 'aria-label': 'Quitar ' + p.nombre });
      quitar.addEventListener('click', function () { cambiar(i.sku, 0); vivo.textContent = p.nombre + ' se quitó del carrito.'; });
      lista.appendChild(el('li', { clase: 'carrito__item' }, [
        el('div', {}, [
          el('div', { clase: 'carrito__item-nombre', texto: p.nombre }),
          el('div', { clase: 'carrito__aviso', texto: i.sku + ' · ' + formato.format(p.precio) + ' c/u' }),
          el('div', { clase: 'carrito__controles' }, [el('label', { 'for': id, texto: 'Cantidad' }), entrada, quitar])
        ]),
        el('strong', { texto: formato.format(p.precio * i.cantidad) })
      ]));
    });
    cuerpo.appendChild(lista);
    if (desconocidos) {
      cuerpo.appendChild(el('p', { clase: 'carrito__aviso' }, [
        'Tenés ' + desconocidos + (desconocidos === 1 ? ' unidad más' : ' unidades más') + ' en el carrito. Para revisar el detalle y confirmar el pedido, abrí el ',
        el('a', { href: '/catalogo/', texto: 'catálogo completo' }), '.'
      ]));
    }
    var subtotal = subtotalConocido();
    cuerpo.appendChild(el('p', { clase: 'carrito__total' }, [el('span', { texto: 'Subtotal' }), el('span', { texto: formato.format(subtotal) })]));
    cuerpo.appendChild(el('p', { clase: 'carrito__aviso', texto: 'Precios en pesos con IVA incluido. El costo de envío se informa por correo según la zona y el peso.' }));
    cuerpo.appendChild(vivo);
    if (desconocidos) return;

    var alcanza = subtotal >= MINIMO;
    if (!alcanza) {
      cuerpo.appendChild(el('p', { clase: 'carrito__aviso carrito__aviso--error', texto: 'El monto mínimo de pedido es ' + formato.format(MINIMO) + '. Te faltan ' + formato.format(MINIMO - subtotal) + '.' }));
    }
    var form = el('form', { 'aria-label': 'Datos para la solicitud' });
    form.appendChild(el('h3', { texto: 'Datos para la solicitud' }));
    function campo(id, etiqueta, tipo, auto, ayuda) {
      var input = el('input', { id: id, name: id, type: tipo, autocomplete: auto, required: 'required' });
      var lbl = el('label', { 'for': id }, [etiqueta, input]);
      if (ayuda) { input.setAttribute('placeholder', ayuda); }
      return lbl;
    }
    form.appendChild(campo('ln-nombre', 'Nombre y apellido', 'text', 'name'));
    form.appendChild(campo('ln-correo', 'Correo electrónico', 'email', 'email'));
    form.appendChild(campo('ln-domicilio', 'Domicilio de entrega (calle, localidad y provincia)', 'text', 'street-address', 'Calle y número, localidad, provincia'));
    var enviar = el('button', { type: 'submit', clase: 'boton boton--primario', texto: 'Confirmar solicitud' });
    if (!alcanza) enviar.setAttribute('disabled', 'disabled');
    form.appendChild(enviar);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (subtotalConocido() < MINIMO || !form.checkValidity()) { form.reportValidity(); return; }
      var resumen = items.map(function (i) { var p = productos[i.sku]; return { nombre: p.nombre, sku: i.sku, cantidad: i.cantidad, total: p.precio * i.cantidad }; });
      var total = subtotalConocido();
      form.reset();
      items = []; guardar(items); actualizarBoton();
      confirmar(resumen, total);
    });
    cuerpo.appendChild(form);
  }

  function confirmar(resumen, total) {
    cuerpo.textContent = '';
    cuerpo.appendChild(el('h3', { texto: 'Solicitud registrada' }));
    cuerpo.appendChild(el('p', { texto: 'Recibimos tu solicitud. Te escribiremos por correo para coordinar el pago y el envío.' }));
    var lista = el('ul', { clase: 'carrito__lista' });
    resumen.forEach(function (r) {
      lista.appendChild(el('li', { clase: 'carrito__item' }, [el('span', { texto: r.cantidad + ' × ' + r.nombre + ' (' + r.sku + ')' }), el('strong', { texto: formato.format(r.total) })]));
    });
    cuerpo.appendChild(lista);
    cuerpo.appendChild(el('p', { clase: 'carrito__total' }, [el('span', { texto: 'Subtotal' }), el('span', { texto: formato.format(total) })]));
    var listo = el('button', { type: 'button', clase: 'boton boton--secundario', texto: 'Cerrar' });
    listo.addEventListener('click', function () { dialogo.close(); });
    cuerpo.appendChild(listo);
    listo.focus();
  }

  // Botones "Agregar al carrito" en cada fila o tarjeta con data-*
  doc.querySelectorAll('[data-sku][data-nombre][data-precio]').forEach(function (fila) {
    var sku = fila.getAttribute('data-sku');
    if (fila.getAttribute('data-disponibilidad') === 'Agotado temporalmente') return;
    var destino = fila.querySelector('.celda-precio, .tarjeta__precio') || fila;
    var boton = el('button', { type: 'button', clase: 'boton boton--primario boton--chico boton-agregar', 'aria-label': 'Agregar al carrito: ' + fila.getAttribute('data-nombre') });
    boton.textContent = 'Agregar al carrito';
    boton.addEventListener('click', function () {
      var existente = items.filter(function (i) { return i.sku === sku; })[0];
      if (existente) existente.cantidad = Math.min(99, existente.cantidad + 1);
      else items.push({ sku: sku, cantidad: 1 });
      guardar(items); actualizarBoton();
      boton.textContent = 'Agregado ✓';
      setTimeout(function () { boton.textContent = 'Agregar al carrito'; }, 1400);
    });
    if (destino.classList.contains('tarjeta__precio')) destino.insertAdjacentElement('afterend', boton);
    else destino.appendChild(el('div', {}, [boton]));
  });

  actualizarBoton();
})();
