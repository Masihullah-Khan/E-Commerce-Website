document.addEventListener("DOMContentLoaded", function () {
  const authLink = document.getElementById("auth-link");

  if (localStorage.getItem("loggedIn") === "true") {
    authLink.innerHTML = '<a href="#">Logout</a>';

    authLink.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("loggedIn");
      alert("👋 Logged out successfully!");
      window.location.href = "index.html";
    });
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const cartButtons = document.querySelectorAll(".cart-btn");
  const buyButtons = document.querySelectorAll(".buy-btn");

  buyButtons.forEach(button => {
    button.addEventListener("click", function () {
      const product = button.closest(".product");
      const name = product.querySelector("h3").textContent;
      const priceText = product.querySelector("p").textContent;
      const price = priceText.replace(/[^0-9.]/g, ""); // removes $ sign
      const img = product.querySelector("img").getAttribute("src");

      const url = `checkout.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&img=${encodeURIComponent(img)}`;
      window.location.href = url;
    });
  });

});

const searchInput = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-btn");
const products = document.querySelectorAll(".product");
const productSection = document.querySelector("#products");

// Clear any old message
function removeMessage() {
  const oldMsg = document.querySelector("#no-result-msg");
  if (oldMsg) {
    oldMsg.remove();
  }
}

searchBtn.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase().trim();
  let found = false;

  removeMessage(); // always clear before new search

  products.forEach(product => {
    const name = product.dataset.name.toLowerCase();
    if (name.includes(query)) {
      product.style.display = "inline-block";
      found = true;
    } else {
      product.style.display = "none";
    }
  });

  if (!found) {
    const msg = document.createElement("p");
    msg.id = "no-result-msg";
    msg.textContent = "Product not found!";
    msg.style.color = "red";
    msg.style.fontSize = "18px";
    msg.style.fontWeight = "bold";
    msg.style.marginTop = "30px";
    msg.style.textAlign = "center";

    productSection.appendChild(msg);
  }
});


// Cart Logic

const cartBtns = document.querySelectorAll(".cart-btn");
cartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // ✅ Check login first
    if (localStorage.getItem("loggedIn") !== "true") {
      alert("🚫 Please login to add this product in your cart.");
      return; // ❌ Don't continue if not logged in
    }

    const product = btn.closest(".product");
    const name = product.querySelector("h3").textContent;
    const price = product.querySelector("p").textContent;
    const img = product.querySelector("img").src;

    const item = { name, price, img };

    // Get existing session data
    let cart = sessionStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];

    // Add new item
    cart.push(item);

    // Save back to sessionStorage
    sessionStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} added to cart!`);
  });
});
