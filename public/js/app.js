import axios from "axios";
import Swal from "sweetalert2";

document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelector(".lista-conocimientos");

  // Limpiar las alertas
  let alertas = document.querySelector(".alertas");
  if (alertas) limpiarAlertas();

  if (skills) {
    skills.addEventListener("click", agregarSkills);

    // llamar funcion cuando estamos en editar
    skillSeleccionados();
  }

  const vacantesListado = document.querySelector(".panel-administracion");
  if (vacantesListado)
    vacantesListado.addEventListener("click", accionesListado);
});

const skills = new Set();

const agregarSkills = (e) => {
  if (e.target.tagName === "LI") {
    if (e.target.classList.contains("activo")) {
      //quitar del set y la clase
      skills.delete(e.target.textContent);
      e.target.classList.remove("activo");
    } else {
      //agregarlo al set y la clase activo
      skills.add(e.target.textContent);
      e.target.classList.add("activo");
    }
  }
  const skillsArray = [...skills];
  document.querySelector("#skills").value = skillsArray;
};

const skillSeleccionados = () => {
  const seleccionadas = Array.from(
    document.querySelectorAll(".lista-conocimientos .activo")
  );

  seleccionadas.forEach((seleccionada) => {
    skills.add(seleccionada.textContent);
  });
  // inyectar en el hidden
  const skillsArray = [...skill];
  document.querySelector("#skills").value = skillsArray;

  // console.log(seleccionadas);
};

const limpiarAlertas = () => {
  const alertas = document.querySelector(".alertas");
  const interval = setInterval(() => {
    if (alertas.children.length > 0) {
      alertas.removeChild(alertas.children[0]);
    } else if (alertas.children.length === 0) {
      alertas.parentElement.removeChild(alertas);
      clearInterval(interval);
    }
  }, 2000);
};

// eliminar vacantes
const accionesListado = (e) => {
  e.preventDefault();
  console.log(e.target);

  if(e.target.dataset.eliminar){
    console.log(object);
  }
/** e.preventDefault();

  if (e.target.dataset.eliminar) {
    // eliminar por axios

    Swal.fire({
      title: "¿Confirmar Eliminación?",
      text: "Una vez eliminada, no se puede recuperar",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar",
      cancelButtonText: "No, Cancelar",
    }).then((result) => {
      if (result.value) {
        // enviar la peticion con axios
        const url = `${location.origin}/vacantes/eliminar/${e.target.dataset.eliminar}`;
        // Axios para eliminar el registro
        axios.delete(url, { params: { url } }).then((respuesta) => {
          if (respuesta.status === 200) {
            Swal.fire("Eliminado!", respuesta.data, "success");
            // TODO eliminar del dom
            // console.log()
            e.target.parentElement.parentElement.parentElement.removeChild(
              e.target.parentElement.parentElement
            );
          }
        });
      }
    });
  } else {
    axios.delete(url, { params: { url } }).then((respuesta) => {
      console.log(respuesta);
    });

    window.location.href = e.target.href;
  } */
};
