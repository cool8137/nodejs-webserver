const express = require('express');
const hbs = require('hbs');
const fs = require('fs'); // file system

var app = express();

// partials
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');
// using middleware function, to reach from public folder

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });

  next();// won't exit until next() is called
  // for more info expressjs.com req
});

// always display maintenance on all site
app.use((req,res,next) => {
  res.render('maintenance.hbs',{
    pageTitle: 'Maintenance Page',
    // currentYear: new Date().getFullYear()
  });

  // next();// won't exit until next() is called
  // for more info expressjs.com req
});

// put this after maintenance use, so that maintenance is displayed even in static html
app.use(express.static(__dirname + '/public'));



// partials data year
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

//
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//
app.get('/', (req, res) => {
  // send direct html text
  // res.send('<h1>Hello Express!</h1>');
  // send json
  // res.send({
  //   name: 'Prashidha',
  //   likes: [
  //     'Keyboard',
  //     'Physics'
  //   ]
  // })
  // render hbs template
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to home page',
    // currentYear: new Date().getFullYear()
  })
});

app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs',{
    pageTitle: 'About Page',
    // currentYear: new Date().getFullYear()
  });
});

// /bad
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Something went wrong!'
  });
});

// app.get('/maintenance', (req, res) => {
//   // res.send('About Page');
//   res.render('maintenance.hbs',{
//     pageTitle: 'Maintenance Page',
//     // currentYear: new Date().getFullYear()
//   });
// });

app.listen(3000, () => {
  console.log('Server is up on port 3000!!');
});



// npm init
// npm install express --save
// npm istall hbs --save
// nodemon server.js -e js,hbs

// git init
// git status
// git add package.json
