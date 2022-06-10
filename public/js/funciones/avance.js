import Swal from "sweetalert2";

export const actulizarAvance = ()=>{
    // sellecionar la tares existentes
    const tareas = document.querySelectorAll('li.tarea');
    if(tareas.length){
        // seleccionar las tareas completadas
        const tareaCompletas = document.querySelectorAll('i.completo')
        // calcular el avance
        const avance = Math.round((tareaCompletas.length / tareas.length) * 100);
   
        // mostar el avance
        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = avance+'%';
        if(avance===100){
            Swal.fire(
                'Proyecto Completo',
                'Felicidades, Has completados tus tareas',
                'success'
            )
        }
    }

    
}