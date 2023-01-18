class Interfaz {
  constructor({ elementoHtml }) {
    this.elementoHtml = elementoHtml;
  }

  agregarElemento(elemento) {
    this.elementoHtml.append(elemento.producto);
  }

  eliminarElemento(elemento) {
    elemento.remove();
  }
}

class Producto {
  constructor({ nombre, precio, img, tipo }) {
    this.nombre = nombre;
    this.precio = parseFloat(precio);
    this.img = img;
    this.producto;
    this.tipo = tipo;
  }

  crearProducto() {
    const productoHtml = document.createElement("div");
    productoHtml.innerHTML = `
        <img src="${this.img}" alt="Imagen del producto" class="card-img"/>
        <div class="card-body">
          <h4 class="card-title"> ${this.nombre}.</h4>
          <p class="card-price">Precio: ${this.precio} ARS</p>
        </div>
    `;
    productoHtml.classList = "card";

    this.producto = productoHtml;
  }
}

const UI = new Interfaz({
  elementoHtml: document.getElementById("UI"),
});

let productos = [
  {
    nombre: "Arvejas",
    precio: 100,
    img: "img/arvejas.jpg",
    tipo: "comida enlatada",
  },
  {
    nombre: "Fideos",
    precio: 140,
    img: "img/fideos.jpg",
    tipo: "alimento no perecedero",
  },
  {
    nombre: "Pan Rallado",
    precio: 80,
    img: "img/pan-rallado.jpg",
    tipo: "alimento no perecedero",
  },
  {
    nombre: "Polenta",
    precio: 120,
    img: "img/polenta.jpg",
    tipo: "alimento no perecedero",
  },
  {
    nombre: "Arroz",
    precio: 120,
    img: "img/arroz.jpg",
    tipo: "alimento no perecedero",
  },
  {
    nombre: "Porotos",
    precio: 110.5,
    img: "img/porotos.jpg",
    tipo: "comida enlatada",
  },
  {
    nombre: "Pure de Tomate",
    precio: 80.25,
    img: "img/pure-de-tomate.jpg",
    tipo: "comida enlatada",
  },
  { nombre: "Manteca", precio: 230, img: "img/manteca.jpg", tipo: "lacteo" },
  {
    nombre: "Queso rallado",
    precio: 110.5,
    img: "img/queso-rallado.jpg",
    tipo: "lacteo",
  },
  { nombre: "Leche", precio: 180, img: "img/leche.jpg", tipo: "lacteo" },
  { nombre: "Mayonesa", precio: 105, img: "img/mayonesa.jpg" },
  {
    nombre: "Galletitas Trio",
    precio: 78.9,
    img: "img/galletitas.jpg",
    tipo: "snack",
  },
  { nombre: "Zucaritas", precio: 95, img: "img/zucaritas.jpg", tipo: "snack" },
];

let productosOriginales = productos;

const checkboxAlimentos = document.getElementById("alimentos-no-perecederos");
const checkboxComidaEnlatada = document.getElementById("comida-enlatada");
const checkboxSnack = document.getElementById("snacks");
const checkboxLacteos = document.getElementById("lacteos");

const options = document.querySelector("select");
const botonEnviar = document.getElementById("boton-enviar");

function mostrarProductos(arr) {
  arr.forEach((producto) => {
    const nuevoProducto = new Producto(producto);

    nuevoProducto.crearProducto();

    UI.agregarElemento(nuevoProducto);
  });
}

mostrarProductos(productos);

botonEnviar.addEventListener("click", () => {
  let productosHtml = document.querySelectorAll(".card");

  productosHtml.forEach((producto) => {
    producto.remove();
  });
  let productosFiltrados = [];

  //filtrar productos por checkboxes

  if (checkboxAlimentos.checked) {
    let filtroProvisional = productos.filter((producto) => {
      return producto.tipo === "alimento no perecedero";
    });

    productosFiltrados = productosFiltrados.concat(filtroProvisional);
  }

  if (checkboxComidaEnlatada.checked) {
    let filtroProvisional = productos.filter((producto) => {
      return producto.tipo === "comida enlatada";
    });

    productosFiltrados = productosFiltrados.concat(filtroProvisional);
  }

  if (checkboxSnack.checked) {
    let filtroProvisional = productos.filter((producto) => {
      return producto.tipo === "snack";
    });

    productosFiltrados = productosFiltrados.concat(filtroProvisional);
  }

  if (checkboxLacteos.checked) {
    let filtroProvisional = productos.filter((producto) => {
      return producto.tipo === "lacteo";
    });

    productosFiltrados = productosFiltrados.concat(filtroProvisional);
  }

  // Ordernarlos por dropdown

  switch (options.value) {
    case "A-Z":
      productosFiltrados.sort((a, b) => {
        return a.nombre > b.nombre;
      });

      productos.sort((a, b) => {
        return a.nombre > b.nombre;
      });

      break;

    case "Z-A":
      productosFiltrados.sort((a, b) => {
        return b.nombre > a.nombre;
      });

      productos.sort((a, b) => {
        return b.nombre > a.nombre;
      });

      break;

    case "Precio: Mayor a menor":
      productosFiltrados.sort((a, b) => {
        return a.precio < b.precio;
      });

      productos.sort((a, b) => {
        return a.precio < b.precio;
      });

      break;

    case "Precio: Menor a mayor":
      productosFiltrados.sort((a, b) => {
        return a.precio > b.precio;
      });

      productos.sort((a, b) => {
        return a.precio > b.precio;
      });

      break;

    default:
      break;
  }

  if (productosFiltrados.length === 0) {
    mostrarProductos(productos);
  } else {
    mostrarProductos(productosFiltrados);
  }
});

// Busqueda de producto

const inputBusqueda = document.getElementById("busqueda");
const btnBusqueda = document.getElementById("boton-busqueda");

const divBusqueda = new Interfaz({
  elementoHtml: document.querySelector(".div-busqueda"),
});

function buscarProducto(nombre) {
  productoEncontrado = productos.find((producto) => {
    return producto.nombre.toLocaleLowerCase() === nombre.toLocaleLowerCase();
  });

  return productoEncontrado;
}

function crearAlerta(texto) {
  let msjAlerta = {
    producto: document.createElement("p"),
  };
  msjAlerta.producto.classList = "msj-alerta";
  msjAlerta.producto.innerHTML = `${texto}`;

  return msjAlerta;
}

function eliminarAlerta(className) {
  let alerta = document.querySelector(className);
  if (document.contains(alerta)) {
    alerta.remove();
  }
}

btnBusqueda.addEventListener("click", () => {
  nombreProducto = inputBusqueda.value;

  if (nombreProducto === "") {
    eliminarAlerta(".msj-alerta");

    let msjAlerta = crearAlerta("Debe ingresar un valor");

    divBusqueda.agregarElemento(msjAlerta);
  } else {
    if (buscarProducto(nombreProducto) === undefined) {
      eliminarAlerta(".msj-alerta");

      let alerta = crearAlerta("No hay resultados");

      divBusqueda.agregarElemento(alerta);
    } else {
      let productosHtml = document.querySelectorAll(".card");

      productosHtml.forEach((producto) => {
        producto.remove();
      });

      let producto = new Producto(buscarProducto(nombreProducto));
      producto.crearProducto();

      UI.agregarElemento(producto);
    }
  }
});
