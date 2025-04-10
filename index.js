const express = require('express');
const pool = require('./bd'); // pool, no connection
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/api/prueba', (req, res) => {
    res.send('API funcionando de manera correcta');
});

// Ruta prueba 2
app.get('/api/prueba2', (req, res) => {
    res.status(200).json({
        message: 'LA API RESPONDE CORRECTAMENTE',
        port: PORT,
        status: 'exitoso'
    });
});

// Obtener todos los registros de la tabla 'persona'
app.get('/api/obtener', async (req, res) => {
    const query = 'SELECT * FROM persona';

    try {
        const result = await client.query(query);
        res.status(200).json({
            success: true,
            message: "Datos de la tabla",
            data: result.rows
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al recuperar datos",
            details: error.message
        });
    }
});

// Guardar los registro en la tabla 'persona'
app.post('/api/guardar', async (req, res) => {
    const { cedula, nombre, edad, profesion } = req.body;

    const query = 'INSERT INTO persona (cedula, nombre, edad, profesion) VALUES ($1, $2, $3, $4)';
    const values = [cedula, nombre, edad, profesion];

    try {
        await pool.query(query, values);
        res.status(201).json({ cedula, nombre, edad, profesion });
    } catch (error) {
        res.status(500).json({
            message: 'ERROR CREANDO EL USUARIO',
            error: error.message
        });
    }
});

// Actualizar un registro de la tabla 'persona' por cédula
app.put('/api/actualizar/:cedula', async (req, res) => {
    const { cedula } = req.params;
    const { nombre, edad, profesion } = req.body;

    const query = 'UPDATE persona SET nombre = $1, edad = $2, profesion = $3 WHERE cedula = $4';
    const values = [nombre, edad, profesion, cedula];

    try {
        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: `No existe un registro con la cédula ${cedula}`
            });
        } else {
            res.status(200).json({
                success: true,
                message: `Registro actualizado correctamente para la cédula ${cedula}`
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el registro',
            error: error.message
        });
    }
});

// Eliminar registro por cédula
app.delete('/api/eliminar/:cedula', async (req, res) => {
    const { cedula } = req.params;
    const query = 'DELETE FROM persona WHERE cedula = $1';

    try {
        const result = await pool.query(query, [cedula]);

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: `No existe el registro con cédula ${cedula}`
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Dato eliminado de la tabla'
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar el registro',
            error: error.message
        });
    }
});

// Conección por el puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

