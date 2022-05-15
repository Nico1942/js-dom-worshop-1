/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app";

const appNode = document.querySelector('#app');

// Intl - api de internacionalización
// 1. Dar formato a fechas
// 2. Dar formato a precios

const formatPrice = (price) => {

  const newPrice = new window.Intl.NumberFormat('es-UY', {
    style: "currency",
    currency: "USD",
  }).format(price);

  return newPrice;
}

//web api
// 1. Conectarnos al servidor
window
  .fetch(`${baseUrl}/api/avo`)
// 2. Procesar la respuesta y convertirla en JSON
  .then((respuesta) => respuesta.json())
// 3. JSON -> Data -> Renderizar info en browser
  .then((responseJson) => {

    const todosLosItems = [];

    responseJson.data.forEach((item) => {
      // Crear la imagen
      const imagen = document.createElement('img');
      imagen.src = `${baseUrl}${item.image}`;
      // Agregando los estilos con tailwid
      imagen.className = "w-32 p-4 h-32 m-auto";

      // Crear el titulo
      const title = document.createElement('p');
      title.textContent = item.name;
      title.className = "text-white text-l font-bold";

      // Crear el precio
      const price = document.createElement('div');
      price.textContent = formatPrice(item.price);
      price.className = "text-white";

      // Crear descripción corta
      const description = document.createElement('p');
      description.textContent = item.attributes.taste;
      description.className = "text-gray-50 text-xs";

      // Creando la card para el producto
      const card = document.createElement('div');
      card.className = "shadow-lg rounded-2xl bg-white m-auto p-2 hover:shadow-2xl";

      const cardData = document.createElement('div');
      cardData.className = "bg-green-200 m-3 p-4 rounded-lg";

      const cardShop = document.createElement('div');
      cardShop.className = "flex items-center justify-between";

      // Creando botón de compra
      const button = document.createElement('button');
      button.type = "buton";
      button.className = "w-10 h-10 text-base font-medium rounded-full text-white bg-green-500 hover:bg-pink-700";
      button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="mx-auto" fill="white" viewBox="0 0 1792 1792">                    <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">                    </path>                </svg>';


      cardShop.append(price, button);
      cardData.append(title, description, cardShop);
      card.append(imagen, cardData);


      todosLosItems.push(card);
    });

    appNode.append(...todosLosItems);
    appNode.className = "mt-10 grid grid-cols-4 gap-4";

  });


/* Mismo código pero usando fetch -> async/await:

 const url = "https://platzi-avo.vercel.app/api/avo";

//web api
async function fetchData() {
  const response = await fetch(url),
  data = await response.json(),
  allItems = [];

  data.data.forEach((item) => {
    // create image
    const image = document.createElement("img");
    // create title
    const title = document.createElement("h2");
    // create price
    const price = document.createElement("div");

    const container = document.createElement("div");
    container.append(image, title, price);

    allItems.push(container);
  });

  document.body.append(...allItems)
}

fetchData();
*/


/* Usando Document Fregment para escribir en el DOM una sola vez. :D
 *
 * fetch(url)
	.then((res) => res.json())
	.then((data) => {
		// Creamos el fragment
		let fragment = document.createDocumentFragment();

		data.data.forEach((item) => {
			let image = document.createElement('img');

			let title = document.createElement('h2');

			let price = document.createElement('span');

			const container = document.createElement('div');
			container.append(image, title, price);
			// Agregamos los nodos al fragment y no al DOM directamente
			fragment.appendChild(container);
		});
		// Solo renderizamos una sola vez el DOM
		document.body.append(fragment);
	});
*/
