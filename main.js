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
  constructor({ nombre, precio, img }) {
    this.nombre = nombre;
    this.precio = parseFloat(precio);
    this.img = img;
    this.producto;
    this.boton = document.createElement("button");
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

const productos = [
  { nombre: "Arvejas", precio: 100, img: "img/arvejas.jpg" },
  { nombre: "Fideos", precio: 140, img: "img/fideos.jpg" },
  { nombre: "Pan Rallado", precio: 80, img: "img/pan-rallado.jpg" },
  { nombre: "Polenta", precio: 120, img: "img/polenta.jpg" },
  { nombre: "Arroz", precio: 120, img: "img/arroz.jpg" },
  { nombre: "Porotos", precio: 110.5, img: "img/porotos.jpg" },
  { nombre: "Pure de Tomate", precio: 80.25, img: "img/pure-de-tomate.jpg" },
  { nombre: "Manteca", precio: 230, img: "img/manteca.jpg" },
  { nombre: "Queso rallado", precio: 110.5, img: "img/queso-rallado.jpg" },
  { nombre: "Leche", precio: 180, img: "img/leche.jpg" },
  { nombre: "Mayonesa", precio: 105, img: "img/mayonesa.jpg" },
];

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

  if (options.value !== "Filtrar") {
    productosHtml.forEach((producto) => {
      producto.remove();
    });
  }

  switch (options.value) {
    case "A-Z":
      productos.sort((a, b) => {
        return a.nombre > b.nombre;
      });

      mostrarProductos(productos);
      break;

    case "Z-A":
      productos.sort((a, b) => {
        return a.nombre < b.nombre;
      });

      mostrarProductos(productos);

      break;
    case "Precio: Mayor a menor":
      productos.sort((a, b) => {
        return a.precio < b.precio;
      });

      mostrarProductos(productos);

      break;

    case "Precio: Menor a mayor":
      productos.sort((a, b) => {
        return a.precio > b.precio;
      });

      mostrarProductos(productos);

      break;
    default:
      break;
  }
});
