const express = require('express');
const morgan = require('morgan');
const apps = require('./playstore.js');

const app = express();

app.use(morgan('common'));

app.get('/apps', (req, res)=>{
  const {Genres = '', sort} = req.query;
  console.log(Genres);
  if (sort) {
    if (!['App', 'Rating'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of title or rank');
    }
  }
  let results = apps
    .filter(app =>{
      return app
        .Genres
        .toLowerCase()
        .includes(Genres.toLowerCase());});
  console.log(results);
  console.log(sort);
  if (sort) {
    if(Object.keys(apps[0]).includes(sort)){
      results
        .sort((a, b) => {
          return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        });
      return res
        .json(results);
    } else{ return res
      .status(400)
      .send(`'${sort}' parameter is invalid`);
    }
  } else{
    return res.json(results);
  }
});
app.listen(8000, ()=>{
  console.log('Server started on port 8000');
});