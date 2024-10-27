document.addEventListener("DOMContentLoaded", () => {
  const modifyLinks = document.querySelectorAll(".modify-product");

  modifyLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const productId = this.dataset.id;
      const productTitle = this.dataset.title;
      const productDescription = this.dataset.description;
      const productCode = this.dataset.code;
      const productPrice = this.dataset.price;
      const productStatus = this.dataset.status;
      const productStock = this.dataset.stock;
      const productCategory = this.dataset.category;
      const productSupplier = this.dataset.supplier;
      const productPhoto = this.dataset.photo;

      Swal.fire({
        title: "Modificar Producto",
        html: `
            <label for="swal-input-title">Título:</label>
            <input id="swal-input-title" class="swal2-input" value="${productTitle}">
            <label for="swal-input-description">Descripción:</label>
            <input id="swal-input-description" class="swal2-input" value="${productDescription}">
            <label for="swal-input-code">Código:</label>
            <input id="swal-input-code" class="swal2-input" value="${productCode}">
            <label for="swal-input-price">Precio:</label>
            <input id="swal-input-price" class="swal2-input" value="${productPrice}">
            <label for="swal-input-status">Estado:</label>
            <select id="swal-input-status" class="swal2-input">
              <option value="available" ${
                productStatus === "available" ? "selected" : ""
              }>Disponible</option>
              <option value="unavailable" ${
                productStatus === "unavailable" ? "selected" : ""
              }>No Disponible</option>
            </select>
            <label for="swal-input-stock">Stock:</label>
            <input id="swal-input-stock" class="swal2-input" value="${productStock}">
            <label for="swal-input-category">Categoría:</label>
            <input id="swal-input-category" class="swal2-input" value="${productCategory}">
            <label for="swal-input-supplier">Proveedor:</label>
            <input id="swal-input-supplier" class="swal2-input" value="${productSupplier}">
            <label for="swal-input-photo">Foto:</label>
            <input id="swal-input-photo" class="swal2-input" value="${productPhoto}">
          `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
          const title = document.getElementById("swal-input-title").value;
          const description = document.getElementById(
            "swal-input-description"
          ).value;
          const code = document.getElementById("swal-input-code").value;
          const price = document.getElementById("swal-input-price").value;
          const status = document.getElementById("swal-input-status").value;
          const stock = document.getElementById("swal-input-stock").value;
          const category = document.getElementById("swal-input-category").value;
          const supplier = document.getElementById("swal-input-supplier").value;
          const photo = document.getElementById("swal-input-photo").value;

          if (
            !title ||
            !description ||
            !code ||
            !price ||
            !status ||
            !stock ||
            !category ||
            !supplier
          ) {
            Swal.showValidationMessage("Por favor, completa todos los campos");
          }
          return {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            supplier,
            photo,
          };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Realiza la actualización del producto
          fetch(`/api/products/${productId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(result.value), // Envía todos los campos
          })
            .then((response) => {
              if (response.ok) {
                Swal.fire(
                  "Producto actualizado!",
                  "Los cambios se han guardado.",
                  "success"
                ).then(() => {
                  location.reload(); // Recarga la página para mostrar los cambios
                });
              } else {
                Swal.fire(
                  "Error",
                  "No se pudo actualizar el producto",
                  "error"
                );
              }
            })
            .catch((error) => {
              Swal.fire(
                "Error",
                "Hubo un problema al intentar actualizar el producto.",
                "error"
              );
            });
        }
      });
    });
  });
});
