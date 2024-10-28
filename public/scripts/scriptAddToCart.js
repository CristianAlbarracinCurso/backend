document.querySelectorAll(".purchase-form").forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const productId = form.getAttribute("data-product-id");
    const quantity = form.querySelector('input[name="quantity"]').value;

    const purchaseData = {
      user_id: userId,
      product_id: productId,
      quantity: parseInt(quantity),
    };

    try {
      const response = await fetch("/api/carts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(purchaseData),
      });

      const data = await response.json();
      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Producto comprado con éxito",
          confirmButtonText: "Aceptar",
        });
        await updateCartCount(userId); // Llama a la función para actualizar el contador
      } else {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error en la compra: " + data.message,
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al realizar la compra.",
        confirmButtonText: "Aceptar",
      });
    }
  });
});

// Función para actualizar el contador del carrito
async function updateCartCount(userId) {
  try {
    const response = await fetch(`/api/carts/total/${userId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const cartCounter = document.getElementById("cart-counter");
    if (
      data.response &&
      data.response.totalItems !== undefined &&
      !isNaN(data.response.totalItems)
    ) {
      cartCounter.innerText = data.response.totalItems; // Actualiza el contador
    } else {
      console.warn("totalItems no está definido o no es un número");
    }
  } catch (error) {
    console.error("Error fetching cart total:", error);
  }
}
