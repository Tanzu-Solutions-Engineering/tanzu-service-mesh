var util = require('util')

const users = process.env.USERS_HOST 
const catalog = process.env.CATALOG_HOST
const cart = process.env.CART_HOST
const order = process.env.ORDER_HOST
const users_port = process.env.USERS_PORT || 80
const catalog_port = process.env.CATALOG_PORT || 80
const cart_port = process.env.CART_PORT || 80
const order_port = process.env.ORDER_PORT || 80

module.exports = {
    usersUrl: util.format("http://%s:%d", users, users_port),
    catalogUrl: util.format("http://%s:%d", catalog, catalog_port),
    cartUrl: util.format("http://%s:%d", cart, cart_port),
    orderUrl: util.format("http://%s:%d", order, order_port)
}