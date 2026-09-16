// This function is what the shell app will call to render this
// micro frontend into a container element.
export function mount(el) {
  el.innerHTML = `
    <div style="border:2px solid #4CAF50;padding:16px;border-radius:8px;">
      <h2 style="margin-top:0;">🛍️ Products <small>(Micro Frontend #1 — port 3005)</small></h2>
      <div id="product-list"></div>
    </div>
  `;

  const products = [
    { id: 1, name: "T-Shirt", price: 20 },
    { id: 2, name: "Sneakers", price: 60 },
    { id: 3, name: "Cap", price: 15 },
  ];

  const list = el.querySelector("#product-list");

  products.forEach((p) => {
    const row = document.createElement("div");
    row.style.cssText =
      "display:flex;justify-content:space-between;align-items:center;margin:8px 0;";
    row.innerHTML = `<span>${p.name} — ₹${p.price}</span>`;

    const btn = document.createElement("button");
    btn.textContent = "Add to Cart";
    btn.onclick = () => {
      // Talk to the Cart micro frontend without importing it directly.
      // Any other app listening on the window can react to this.
      window.dispatchEvent(new CustomEvent("add-to-cart", { detail: p }));
    };

    row.appendChild(btn);
    list.appendChild(row);
  });
}

// If this app is opened directly (standalone, not inside the shell),
// mount itself into the page automatically.
const standaloneRoot = document.getElementById("root");
if (standaloneRoot) {
  mount(standaloneRoot);
}
