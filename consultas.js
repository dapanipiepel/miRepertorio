const { Pool } = require('pg');
const config = {
    user: 'postgres',
    host: 'localhost',
    password: 'postgres',
    database: 'repertorio',
    port: 5432,
};
const pool = new Pool(config);

const insertarCancion = async (datos) => {
    console.log(datos);
    const consulta = {
        text: 'INSERT INTO repertorio values (DEFAULT, $1, $2, $3) RETURNING *',
        values: datos,
        rowMode: 'array',
    };
    try {
        const result = await pool.query(consulta);
        console.log(result.rows[0]);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const consultarCanciones = async () => {
    try {
        const result = await pool.query('SELECT * FROM repertorio');
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
}

const editarCancion = async (datos) => {
    const consulta = {
        text: `UPDATE repertorio SET
        id = default,
        cancion = $1,
        artista = $2,
        tono = $3
        WHERE cancion = $1 RETURNING *`,
        values: datos,
    };
    try {
        const result = await pool.query(consulta);
        console.log(result.rows[0]);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

const eliminarCancion = async (id) => {
    try {
        const result = await pool.query(
            `DELETE FROM repertorio WHERE id = '${id}' RETURNING *`
        );
        console.log(result.rows[0]);
        return result;
    } catch (error) {
        console.log(error.code);
        return error;
    }
}
module.exports = { insertarCancion, consultarCanciones, editarCancion, eliminarCancion }