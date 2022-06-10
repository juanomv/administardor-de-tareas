import axios from "axios";
import Swal from "sweetalert2";
import {actulizarAvance} from '../funciones/avance';
const tareas = document.querySelector(".listado-pendientes");
if (tareas) {
  tareas.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-check-circle")) {
      const icono = e.target;
      const idTarea = icono.parentElement.parentElement.dataset.tarea;
      console.log(idTarea);
      // hacer un reques /tareas/:id
      const url = `${location.origin}/tareas/${idTarea}`;
      axios.patch(url, { idTarea }).then(function (respuesta) {
        if (respuesta.status === 200) {
          icono.classList.toggle("completo");
          actulizarAvance();
        }
      });
    }

    if (e.target.classList.contains("fa-trash")) {
      const tareaHtml = e.target.parentElement.parentElement,
        idtarea = tareaHtml.dataset.tarea;
      Swal.fire({
        title: "Deseas eliminar este tarea?",
        text: "Un tarea eliminado no se puede recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar",
        cancelButtonText: "No, Cancelar",
      }).then((resul) => {
            if (resul.value) {
                const url = `${location.origin}/tareas/${idtarea}`;
                axios.delete(url,{params:{idtarea}})
                    .then(function(respuesta) {
                        console.log(respuesta);
                        if (respuesta.status === 200) {
                        
                            //eliminar el nodo
                            tareaHtml.parentElement.removeChild(tareaHtml);
                            Swal.fire(
                                'Tarea Elimindada',
                                respuesta.data,
                                'success'
                            )
                            actulizarAvance();
                        }
                    });
                    
            }
      });
    }
  });
}

export default tareas;
