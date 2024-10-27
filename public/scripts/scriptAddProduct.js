document.addEventListener("DOMContentLoaded", () => {
  const addProductForm = document.getElementById("addProductForm");

  addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Validación de campos
    const title = addProductForm.title.value;
    const description = addProductForm.description.value;
    const code = addProductForm.code.value;
    const price = parseFloat(addProductForm.price.value); 
    const stock = parseInt(addProductForm.stock.value, 10); 
    const category = addProductForm.category.value;

    if (!title || !code || !description || !stock || !price || !category) {
      Swal.fire("Error", "Todos los campos son obligatorios", "error");
      return;
    }

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        code,
        description,
        stock,
        price,
        category,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      Swal.fire(
        "Producto agregado",
        "El producto se ha añadido correctamente.",
        "success"
      );
      // Opcional: puedes redirigir o recargar la página aquí
      addProductForm.reset(); // Limpiar el formulario
    } else {
      Swal.fire("Error", "No se pudo agregar el producto", "error");
    }
  });
});
