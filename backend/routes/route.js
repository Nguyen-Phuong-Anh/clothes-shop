require('dotenv').config()
const registerController = require('../controllers/registerController')
const authController = require('../controllers/authController')
const accountController = require('../controllers/accountController')
const productController = require('../controllers/productController')
const cartController = require('../controllers/cartController')
const orderController = require('../controllers/orderController')
const loginLimiter = require('../middleware/loginLimiter')
const verifyJWT = require('../middleware/verifyJWT')

function route(app) {
    //manage account
    app.put('/account/update', accountController.updateAccount);
    app.post('/account/getAddress', verifyJWT, accountController.getShippingAddress);
    app.post('/account', verifyJWT, accountController.accessAccount);
    app.post('/set_ava', verifyJWT, accountController.addAvatar);

    //manage product
    app.get('/products/:id', productController.getProduct)
    app.put('/manage_product/:id', productController.updateProduct)
    app.post('/manage_product/:id', productController.deleteProduct)
    app.get('/products', productController.getAllProduct)
    app.post('/account/addProduct', productController.addProduct)
    
    // manage the cart
    app.post('/products/addCart', verifyJWT, cartController.addProduct)
    app.post('/cart', verifyJWT, cartController.getProduct)
    app.post('/cart/delete', verifyJWT, cartController.deleteProduct)
    app.post('/cart/finish_order', verifyJWT, cartController.finishOrder)
    app.post('/cart/update', verifyJWT, cartController.updateProduct)

    // authorization
    app.post('/register', registerController)
    app.post('/signin', loginLimiter, authController.login)
    app.post('/refresh', authController.refresh)
    app.get('/logout', authController.logout)

    // manage order
    app.post('/order/createOrder', orderController.createOrder)
    app.post('/order/getOrder', orderController.getOrder)
    app.get('/order/getAllOrder', orderController.getAllOrder)
    app.get('/order/getDetailOrder/:id', orderController.getDetailOrder)
    app.post('/order/getOrderAddr', orderController.getOrderAddr)

    //search
    app.get('/search/:search', productController.searchProduct)
}

module.exports = route