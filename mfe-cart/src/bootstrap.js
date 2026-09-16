export function mount(el) {
  el.innerHTML = `
    <div style="border:2px solid #2196F3;padding:16px;border-radius:8px;">
      <h2 style="margin-top:0;">🛒 Cart <small>(Micro Frontend #2 — port 3006)</small></h2>
      <ul id="cart-items" style="padding-left:20px;"></ul>
      <p><strong>Total: ₹<span id="cart-total">0</span></strong></p>
    </div>
  `;

  let total = 0;
  const list = el.querySelector("#cart-items");
  const totalEl = el.querySelector("#cart-total");

  // This micro frontend knows NOTHING about the Products app's code.
  // It only listens for a plain browser event.
  window.addEventListener("add-to-cart", (e) => {
    const product = e.detail;
    const li = document.createElement("li");
    li.textContent = `${product.name} — ₹${product.price}`;
    list.appendChild(li);

    total += product.price;
    totalEl.textContent = total;
  });
}

const standaloneRoot = document.getElementById("root");
if (standaloneRoot) {
  mount(standaloneRoot);
}
