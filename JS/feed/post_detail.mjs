/*function getJacketIdFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("id"));
  return urlParams.get("id");
}

function getJacketTitleFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("title"));
  return urlParams.get("title");
}

//FUNCTION TO FETCH ITEM DETAIL USING ITEM ID AND TITLE-------------------------

async function fetchJacketDetail() {

  const itemId = getJacketIdFromQuery();
  const itemTitle = getJacketTitleFromQuery();

  if (!itemId) {
    return;
  }

  const response = await fetch(`https://api.noroff.dev/api/v1/rainy-days/${itemId}`);
  const jacketDetail = await response.json();
  const titleContainer = document.querySelector(".jacketTitle");
  const jacketDetailContainer = document.querySelector(".product_container");


  //jacketDetailContainer.innerHTML += `<h2>${jacketDetail.id}: ${jacketDetail.setup}<h2>
  // <p>${jacketDetail}</p>


  jacketDetailContainer.innerHTML =
    `<div class="product_container">
    <div class="image_container">
    <img src="${jacketDetail.image}" alt ="brown jacket" class="image_container"/>
    </div>
    <div class="product_detail">
      <p class="jacketId">Product Id: ${jacketDetail.id}</p>
      <h2 class="jacketTitle">${jacketDetail.title}<h2>
          <h5 class="gender">Gender: ${jacketDetail.gender}<h5>
          <h5 class="season">Season : Autumn/Spring</h5>
          <h6 class="price">Price: ${jacketDetail.price}kr<h6>
          <h5 class="basecolor">Color: ${jacketDetail.baseColor}<h5>
          <div class="color">
          <span></span>
            <span></span>
           <span></span>
           <span></span>
           <span></span>
            </div>
              <select class="sizes">Sizes: ${jacketDetail.sizes}
               <option>Select Size</option>
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
             
              <h5 class = "quantity">Quantity</h5>
              <input type="number" value="1">
              <button class="btn_addToCart">
              <a href="cart_summery.html" class="btn">Add To Cart</a>
            </button>
            <button class="btn_checkOut">
              <a href="checkout.html" class="btn">Buy Now</a>
            </button>
            <h3 class="description">${jacketDetail.description}</h3>
    </div>
  </div>
  </div>
  
`;

}

fetchJacketDetail();
*/