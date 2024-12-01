const express = require('express');
const app = express();
const fs = require('fs')

app.use(express.json())

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})

//Ruta para agregar nueva canción
app.post('/canciones', (req, res) => {
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'))
    canciones.push(cancion)

    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('Canción agregada con exito')
})

//Ruta para obtener las canciones agregadas
app.get('/canciones', (req, res) => {
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'))
    res.json(canciones)
})

//Ruta para editar canción
app.put('/canciones/:id', (req, res) => {
    const { id } = req.params
    const cancion = req.body
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'))
    const index = canciones.findIndex(c => c.id == id)
    canciones[index] = cancion
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('Canción modificada con éxito')
})

//Ruta para eliminar canción
app.delete('/canciones/:id', (req, res) => {
    const { id } = req.params
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf8'))
    const index = canciones.findIndex(c => c.id == id)
    canciones.splice(index, 1)
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send('Canción eliminada con éxito')
})

//Inicializar el servidor y hacer que escuche en el puerto especificado
app.listen(3000, console.log('Servidor escuchando en http://localhost:3000'))