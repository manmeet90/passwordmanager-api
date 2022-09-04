var express = require('express')
const authRouter = express.Router();
const LoginController = require('../controllers/authController');
const utils = require('../utils');

const loginController = new LoginController();

authRouter.post('/login',(req,res) => {
    loginController.login(req.body.username, req.body.password)
    .then((data) => {
        res.json(utils.prepareSuccessResponse(data));
    }, err => {
        res.status(500);
        res.json(utils.prepareErrorResponse(err));
    });
});

authRouter.get('/logout', (req, res) => {
    loginController.logout()
    .then((data) => {
        res.json(utils.prepareSuccessResponse(data));
    }, err => {
        res.status(500);
        res.json(utils.prepareErrorResponse(err));
    });
})

module.exports = authRouter;