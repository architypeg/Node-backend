const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const errorController = require('./controllers/error')
const sequelize = require('./util/database')
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');


const app= express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
    .then((user) =>{
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use('/', errorController.get404)

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

// sequelize.sync({force: true})
sequelize.sync()
.then((result) => {
    return User.findByPk(1);
    // console.log(result);
}).then(user => {
    if(!user){
        User.create({name: 'ARCHITWA', email:'test@test.com'});
    }
    return Promise.resolve(user)
})
.then(user => {
    // console.log(user);
    app.listen(3000);
})
.catch((err)=> console.log(err));




/* So notes along.. whole nodejs runs using a event driven architecture where
 if something happens this should execute. When there are listeners like in
 the server case here. So the core no de application is managed by the event
 loop. This is because the whole node process uses only one single thread. */