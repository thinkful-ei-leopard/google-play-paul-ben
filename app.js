const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res)=>{
  const { search = "", genres, sort} = req.query;
  let results = apps
    .filter(apps =>
      apps
        .genres
        .toLowercase()
        .includes(search.toLowercase()));
  res
    .json(results);
});

app.listen(8000, ()=>{
  console.log('Server started on port 8000');
});