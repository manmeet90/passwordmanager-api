var express = require('express')
passwordRouter = express.Router();
const PasswordController = require('../controllers/passwordController');
const utils = require('../utils');

const passwordController = new PasswordController();

passwordRouter.get('/',(req,res) => {
    passwordController.getAllPasswords()
    .then((data) => {
        res.json(utils.prepareSuccessResponse(data));
    }, err => {
        res.status(500);
        res.json(utils.prepareErrorResponse(err));
    });
});

passwordRouter.post('/',(req,res) => {
    passwordController.addUpdatePassword(req.body.id, req.body.title, req.body.password)
    .then((data) => {
        res.json(utils.prepareSuccessResponse(data));
    }, err => {
        res.status(500);
        res.json(utils.prepareErrorResponse(err));
    });
});

passwordRouter.delete('/:id',(req,res) => {
    passwordController.deletePassword(req.params.id)
    .then((data) => {
        res.json(utils.prepareSuccessResponse(data));
    }, err => {
        res.status(500);
        res.json(utils.prepareErrorResponse(err));
    });
});

module.exports = passwordRouter;