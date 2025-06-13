  document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("loggedIn") !== "true") {
      alert("🚫 Please login to visit this page.");
      window.location.href = "login.html";
    }
  });

  
document.addEventListener("DOMContentLoaded", () => {
  const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
  const cartSection = document.getElementById("cart-items");

  if (cartItems.length === 0) {
    cartSection.innerHTML = "<p>Your cart is empty 🥺</p>";
    return;
  }

  cartItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="cart-product-image" />
        <div>
          <h3 class="cart-product-name">${item.name}</h3>
          <p class="cart-product-price">${item.price}</p>
          <button class="remove-btn" data-index="${index}">Remove</button>
          <button class="buy-btn" 
                  data-name="${item.name}" 
                  data-price="${item.price}" 
                  data-image="${item.img}">Buy Now</button>
        </div>
      `;
    cartSection.appendChild(div);
  });

  // Event delegation for Remove and Buy buttons
  cartSection.addEventListener("click", (e) => {
    // Remove item
    if (e.target.classList.contains("remove-btn")) {
      const indexToRemove = parseInt(e.target.getAttribute("data-index"));
      cartItems.splice(indexToRemove, 1);
      sessionStorage.setItem("cart", JSON.stringify(cartItems));
      location.reload();
    }

    // Buy Now Logic

    if (e.target.classList.contains("buy-btn")) {
      const name = e.target.getAttribute("data-name");
      let price = e.target.getAttribute("data-price");
      const img = e.target.closest(".cart-item").querySelector("img").src;
      price = price.replace(/[^\d.]/g, "");
      const url = `checkout.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&img=${encodeURIComponent(img)}`;
      window.location.href = url;
    }
  });
});
