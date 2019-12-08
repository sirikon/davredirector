const http = require('http');

const hostname = '0.0.0.0';
const port = 80;

const redirects = {
    '/.well-known/caldav': 'https://caldav.fastmail.com/dav/calendars',
    '/remote.php/caldav': 'https://caldav.fastmail.com/dav/calendars',
    '/.well-known/carddav': 'https://carddav.fastmail.com/dav/addressbooks',
    '/remote.php/carddav': 'https://carddav.fastmail.com/dav/addressbooks'
}

const server = http.createServer((req, res) => {
    console.log(req.url);

    let redirected = false;
    Object.keys(redirects).forEach(r => {
        if (req.url.indexOf(r) >= 0) {
            redirected = true;
            res.statusCode = 302;
            res.setHeader('Location', redirects[r]);
            res.end();
        }
    })

    if (!redirected) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Holi');
    }
});

server.listen(port, hostname, () => {
    console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM detected. Shutting down.');
    process.exit();
});
