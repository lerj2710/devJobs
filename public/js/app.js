document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelector(".lista-conocimientos");

  if (skills) {
    skills.addEventListener("click", agregarSkills);

    // llamar funcion cuando estamos en editar
    skillSeleccionados();
  }
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
