import Swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.querySelector("#eliminar-proyecto");
if (btnEliminar) {
  btnEliminar.addEventListener("click", (e) => {
    const urlProyecto = e.target.dataset.proyectoUrl;
    //console.log(urlProyecto);

    Swal.fire({
      title: "Deseas eliminar este proyecto?",
      text: "Un proyecto eliminado no se puede recuperar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar",
    })
      .then((result) => {
        if (result.isConfirmed) {
          // enviar a peticion axios
          const url = `${location.origin}/proyectos/${urlProyecto}`;
          axios.delete(url, { params: { urlProyecto } })
            .then(function (respuesta) {
              console.log(respuesta);
              Swal.fire("proyecto eliminado", respuesta.data, "success");
            });
        }
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      })
      .catch(() => {
        console.log(respuesta);
        Swal.fire({
          type: "error",
          title: "Hubo un error",
          text: "No se pudo elimnar el proyecto",
        });
      });
  });
}

export default btnEliminar;
