const http = require('http');
const { insertarCancion, consultarCanciones, editarCancion, eliminarCancion } = require('./consultas');
const fs = require('fs');
const url = require('url');

http.createServer(async (req, res) => {
    if (req.url == '/' && req.method === 'GET') {
        res.setHeader('Content-Type', 'text/html');
        const html = fs.readFileSync('index.html', 'utf8');
        res.end(html)
    }

    if (req.url == '/cancion' && req.method === 'POST') {
        let body = "";
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            const datos = Object.values(JSON.parse(body));
            const respuesta = await insertarCancion(datos);
            //res.statusCode = 201;
            res.end(JSON.stringify(respuesta))
        })
    }

    if (req.url == '/canciones' && req.method === 'GET') {
        const cancioncitas = await consultarCanciones();
        res.statusCode = 200;
        res.end(JSON.stringify(cancioncitas))
    }

    if (req.url == '/cancion' && req.method === 'PUT') {
        let body = "";
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            const cancion = Object.values(JSON.parse(body));
            const respuesta = await editarCancion(cancion);
            res.statusCode = 200;
            res.end('Canción editada!', JSON.stringify(respuesta));
        })
    }

    if (req.url.startsWith('/cancion') && req.method === 'DELETE'){
        const { id } = url.parse(req.url, true).query;
        const respuesta = await eliminarCancion(id);
        res.end(JSON.stringify(respuesta));
    }

}).listen(3000)