const express = require('express');
const hbs = require('hbs');
const fs = require('fs'); // file system

// access the port set by heroku
// it will also work locally at port 3000
const port = process.env.PORT || 3000;

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
// app.use((req,res,next) => {
//   res.render('maintenance.hbs',{
//     pageTitle: 'Maintenance Page'
//     // currentYear: new Date().getFullYear()
//   });
//
//   // next();// won't exit until next() is called
//   // for more info expressjs.com req
// });

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

app.listen(port, () => {
  console.log(`Server is up on port ${port}!!`);
});



// npm init
// npm install express --save
// npm istall hbs --save
// nodemon server.js -e js,hbs

// git init
// git status
// git add package.json
// git add public/
// git add server.js
// create file named .gitignore with path of folder to ignore, eg node_modules

// git commit -m 'Initial commit'

// check ssh Key:
// ls -al ~/.ssh
// generate key:
// ssh-keygen -t rsa -b 4096 -C 'prashidha.kharel@gmail.com'
// id_rsa should be kept in server only (private key).
// id_rsa.pub is given to third party.
// start up ssh agent
// eval "$(ssh-agent -s)"
// add this key:
// ssh-add ~/.ssh/id_rsa
// copy id_rsa.pub key:
// pbcopy < ~/.ssh/id_rsa.pub
// then paste it in github.com at creating new key option
// test connection with github
// ssh -T git@github.com
// push to github, link in github:
// git remote add origin https://github.com/cool8137/nodejs-webserver.git
// git push -u origin master

// make account in heroku.com
// toolbelt.heroku.com to download toolbelt
// then install heroku
// Then check:
// heroku help
// Then login:
// heroku login
// now ssh with heroku
// heroku keys:add
// check keys.
// heroku keys

// test connection
// ssh -v git@heroku.com

// set the port to the PORT env variable set by heroku from process
// then add the start script in package.json as
// "start": "node server.js"
// then can do npm start to also run the server
