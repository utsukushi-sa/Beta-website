document.addEventListener("DOMContentLoaded", () => {
  // Winkelmand aanmaken (1x)
  if (!document.getElementById("cart")) {
    const cart = document.createElement("div");
    cart.id = "cart";
    cart.innerHTML = `
      <h2>Winkelmandje</h2>
      <ul id="cart-items"></ul>
      <p id="cart-total">Totaal: € 0,00</p>`;
    document.body.appendChild(cart);
  }

  const cart = document.getElementById("cart");
  const cartItems = document.getElementById("cart-items");
  const totalElem = document.getElementById("cart-total");

  // Winkelmand laden uit localStorage
  let winkelmand = JSON.parse(localStorage.getItem("winkelmand")) || [];
  updateCartDisplay();

  // Voeg plusknoppen toe aan elk product
  document.querySelectorAll(".property").forEach(property => {
    const plusBtn = document.createElement("button");
    plusBtn.textContent = "+";
    plusBtn.classList.add("plus-btn");
    property.appendChild(plusBtn);

    plusBtn.addEventListener("click", () => {
      const name = property.querySelector("h2").textContent.trim();
      const priceText = property.querySelector(".price").textContent.trim();
      const price = parseFloat(priceText.replace("€", "").replace(",", "."));

      winkelmand.push({ name, price, priceText });
      saveCart();
      updateCartDisplay();
    });
  });

  // Klik op verwijderen
  document.addEventListener("click", e => {
    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.dataset.index;
      winkelmand.splice(index, 1);
      saveCart();
      updateCartDisplay();
    }
  });

  // Winkelmand bijwerken
  function updateCartDisplay() {
    cartItems.innerHTML = "";
    let total = 0;

    winkelmand.forEach((item, i) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} - ${item.priceText}
        <button class="remove-btn" data-index="${i}">x</button>`;
      cartItems.appendChild(li);
      total += item.price;
    });

    totalElem.textContent = `Totaal: € ${total.toFixed(2).replace(".", ",")}`;
    cart.style.display = winkelmand.length ? "block" : "none";
  }

  // Opslaan in localStorage
  function saveCart() {
    localStorage.setItem("winkelmand", JSON.stringify(winkelmand));
  }
});
