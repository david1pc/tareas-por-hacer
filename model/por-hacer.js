const fs = require('fs')
const colors = require('colors')

let listaPorHacer = []

const guardarDB = () => {

    let data = JSON.stringify(listaPorHacer)

    fs.writeFile('./db/data.json', data, (err) => {
        if (err)
            throw new Error('No se pudo guardar', err)

        console.log('Se ha guardado la informacion')
    })

}

const cargarDB = () => {
    try {
        listaPorHacer = require('../db/data.json')
    } catch (error) {
        listaPorHacer = []
    }
}

const crearTarea = (descripcion) => {

    cargarDB()

    var porHacer = {
        descripcion,
        completado: false
    }

    listaPorHacer.push(porHacer)

    guardarDB()

    return porHacer
}

const getListado = () => {

    cargarDB()

    for (let tarea of listaPorHacer) {
        console.log('======== Por hacer =========='.green)
        console.log(tarea.descripcion)
        console.log('Estado: ', tarea.completado)
        console.log('============================='.green)
    }
}

const actualizarTarea = (descripcion, completado = true) => {
    cargarDB()

    let index = listaPorHacer.findIndex(tarea => tarea.descripcion === descripcion)

    if (index === -1) {
        throw new Error('No se encontro una tarea con la descripcion ingresada')
    }

    listaPorHacer[index].completado = completado

    guardarDB()
}

const eliminarTarea = (descripcion) => {
    cargarDB()

    let nuevaListaTareas = listaPorHacer.filter(tarea => tarea.descripcion !== descripcion)

    if (listaPorHacer.length === nuevaListaTareas.length) {
        throw new Error('No se encontro una tarea con la descripcion ingresada')
    }

    listaPorHacer = nuevaListaTareas

    guardarDB()
}


module.exports = {
    crearTarea,
    getListado,
    actualizarTarea,
    eliminarTarea
}