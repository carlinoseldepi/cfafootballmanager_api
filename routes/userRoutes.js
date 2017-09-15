'use strict';
module.exports = function(app) {
    var UserCtrl = require('./../controllers/userController');

    // todoList Routes
    app.route('/users')
        .get(UserCtrl.findAll)
        .post(UserCtrl.create);

    app.route('/users/:id')
        .get(UserCtrl.findById)
        .put(UserCtrl.update)
        .delete(UserCtrl.delete);
};