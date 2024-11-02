// Data used for api, random famous quotes

const quotes = [
  {id: 1, text: 'To be or not to be', author: 'Shakespeare'},
  {id: 2, text: 'I think, therefore I am', author: 'Descartes'},
  {id: 3, text: 'I have a dream', author: 'Martin Luther King'},
  {id: 4, text: 'Tonights the night', author: 'Dexter Morgan'},
];

const getItems = (res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(quotes));
};

const postItem = (req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    const quote = JSON.parse(body);
    quotes.push(quote);
    res.writeHead(201, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(quote));
  });
};

const deleteItem = (id, res) => {
  const index = quotes.findIndex((quote) => quote.id === parseInt(id));
  if (index > -1) {
    quotes.splice(index, 1);
    res.writeHead(204, {'Content-Type': 'application/json'});
    res.end();
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({error: '404', message: 'not found'}));
  }
};

const updateItem = (id, req, res) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    const quote = JSON.parse(body);
    const index = quotes.findIndex((quote) => quote.id === parseInt(id));
    if (index > -1) {
      quotes[index] = quote;
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(quote));
    } else {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({error: '404', message: 'not found'}));
    }
  });
};

export {getItems, postItem, deleteItem, updateItem};
