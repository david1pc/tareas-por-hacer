const argv = require('./config/yargs').argv
const { crearTarea, getListado, actualizarTarea, eliminarTarea } = require('./model/por-hacer')

let comando = argv._[0].toLowerCase()

switch (comando) {
    case 'crear':

        crearTarea(argv.descripcion)

        break;
    case 'listar':

        getListado()

        break;
    case 'actualizar':

        actualizarTarea(argv.descripcion)

        break;

    case 'eliminar':

        eliminarTarea(argv.descripcion)

        break;
    default:
        console.log('Comando no reconocido')
        break;
}