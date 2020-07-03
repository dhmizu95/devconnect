const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');

const profileRoute = require('./routes/profileRoute');
const postsRoute = require('./routes/postsRoute');
const usersRoute = require('./routes/usersRoute');

const { mongoURI } = require('./config/keys');
const { configPassport } = require('./config/passport');

const app = express();
const port = process.env.PORT || 5050;

// use 3rd party packages
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Passport configure
configPassport(passport);

// use router
app.use('/api/profile', profileRoute);
app.use('/api/posts', postsRoute);
app.use('/api/users', usersRoute);

// connect to database & listen on port
mongoose
	.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to database.');
		app.listen(port, () => {
			console.log(`Webapp listening on port ${port}!`);
		});
	})
	.catch((error) => console.log(error));
