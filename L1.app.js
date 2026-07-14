const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const errorController = require('./controllers/error')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


const app= express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use('/', errorController.get404)

app.listen(3000);


/* So notes along.. whole nodejs runs using a event driven architecture where
 if something happens this should execute. When there are listeners like in
 the server case here. So the core no de application is managed by the event
 loop. This is because the whole node process uses only one single thread. */