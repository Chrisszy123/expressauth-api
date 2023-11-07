import express from 'express'
import indexRouter from './routes/index'
require('dotenv').config()
const {auth} = require('express-openid-connect')
const app = express()

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
  };

app.set("views", "views")
app.set("view engine", "ejs")
//
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.use(auth(config))
app.use('/', indexRouter)

app.listen(3000, () => {
    console.log('app is listening on port 3000')
})