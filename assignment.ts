const http = require('http');

const server = http.createServer((req, res) => {
  const { url, method } = req;
  if (url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.write('' +
      '<html>' +
        '<head>' +
          '<title>Welcome home</title>' +
        '</head>' +
        '<body>' +
          '<h1>Hello there!</h1>' +
          '<form action="/create-user" method="POST">' +
            '<input type="text" name="createUser" />' +
            '<button type="submit">Create</button>' +
          '</form>' +
        '</body>' +
      '</html>'
    );
    return res.end();
  }
  if (url === '/users') {
    res.setHeader('Content-Type', 'text/html');
    res.write('' +
      '<html>' +
        '<head>' +
          '<title>Welcome home</title>' +
        '</head>' +
        '<body>' +
          '<ul>' +
            '<li>User 1</li>' +
            '<li>User 2</li>' +
            '<li>User 3</li>' +
          '</ul>' +
        '</body>' +
      '</html>'
    );
    return res.end();
  }
  if (url === '/create-user' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      console.log(message);
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('' +
    '<html>' +
      '<head>' +
        '<title>Page not found!</title>' +
      '</head>' +
      '<body>' +
        '<h1>404 - Page not found</h1>' +
      '</body>' +
    '</html>'
  );
  return res.end();
});

server.listen(3001);
