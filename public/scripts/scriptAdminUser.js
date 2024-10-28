document.addEventListener("DOMContentLoaded", () => {
  const deleteLinks = document.querySelectorAll(".delete-user");

  deleteLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const userId = this.dataset.id; 

      // Muestra confirmar la eliminación
      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás deshacer esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          fetch(`/api/users/${userId}`, {
            method: "DELETE",
          })
            .then((response) => {
              if (response.ok) {
                Swal.fire(
                  "Eliminado!",
                  "El usuario ha sido eliminado.",
                  "success"
                ).then(() => {
                  location.reload(); 
                });
              } else {
                Swal.fire("Error!", "No se pudo eliminar el usuario.", "error");
              }
            })
            .catch((error) => {
              Swal.fire(
                "Error!",
                "Hubo un problema al intentar eliminar el usuario.",
                "error"
              );
            });
        }
      });
    });
  });
});
