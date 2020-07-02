const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const profileRoute = require('./routes/profileRoute');
const postsRoute = require('./routes/postsRoute');
const usersRoute = require('./routes/usersRoute');

const app = express();
const port = process.env.PORT || 5050;
const db = require('./config/keys').mongoURI;

// default route
app.get('/', (req, res) => {
	res.send('Hello World!');
});

// use router
app.use('/api/profile', profileRoute);
app.use('/api/posts', postsRoute);
app.use('/api/users', usersRoute);

// logging
app.use(morgan('dev'));

// connect to database & listen on port
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected to database.');
		app.listen(port, () => {
			console.log(`Webapp listening on port ${port}!`);
		});
	})
	.catch((error) => console.log(error));
