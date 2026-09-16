// Dynamically import the Products micro frontend and mount it.
import("products/bootstrap").then(({ mount }) => {
  mount(document.getElementById("products-container"));
});

// Same for the Cart micro frontend.
import("cart/bootstrap").then(({ mount }) => {
  mount(document.getElementById("cart-container"));
});