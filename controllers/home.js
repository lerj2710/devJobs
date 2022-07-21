const mostrarTrabajo = (req, res) => {
	res.render('home', {
		nombrePagina: 'devJobs',
		tagline: 'Encuentra y Publica Trabajo para Desarrolladores Web',
        barra: true,
        boton: true
	});
};


module.exports ={
	mostrarTrabajo
}