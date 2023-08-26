require('dotenv').config()
const data = require('../data')
const registerController = require('../controllers/registerController')
const authController = require('../controllers/authController')
const accountController = require('../controllers/accountController')
const productController = require('../controllers/productController')
const cartController = require('../controllers/cartController')
const loginLimiter = require('../middleware/loginLimiter')
const verifyJWT = require('../middleware/verifyJWT')
function route(app) {
    //manage account
    app.put('/account/update', accountController.updateAccout);
    app.post('/account', verifyJWT, accountController.accessAccount);

    //manage product
    app.get('/products/:id', productController.getProduct)
    app.get('/products', productController.getAllProduct)
    app.post('/account/addProduct', productController.addProduct)
    
    // manage the cart
    app.post('/products/addCart', verifyJWT, cartController.addProduct)
    app.post('/cart', verifyJWT, cartController.getProduct)
    app.post('/cart/delete', verifyJWT, cartController.deleteProduct)
    app.post('/cart/update', verifyJWT, cartController.updateProduct)

    // authorization
    app.post('/register', registerController)
    app.post('/signin', loginLimiter, authController.login)
    app.post('/refresh', authController.refresh)
    app.get('/logout', authController.logout)


    //search
    app.post('/search', (req, res) => {
        const products = data.Products
        const result = products.filter(item => item.name.includes(req.body.search))
        res.send(result)
    })
}

module.exports = route