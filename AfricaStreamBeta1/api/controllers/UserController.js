/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var Q = require('q');
var mysql      = require('mysql');
var connection = mysql.createConnection(sails.config.connections.mysqlconnect);
connection.connect();
module.exports = {
	new: function (req, res) {
			res.view();
	},
	create: function (req, res, next) {
		User.create(req.params.all(), function userCreated (err, user){
			if (err) return next(err);
			UserDAO.find(user.id, function userFound(user){
				user = user[0];
				res.redirect('/');
				return;
			});
		});
	},
	show: function (req, res, next) {
		UserDAO.find(req.param('id'), function userFound(user){
			if(!user) return next('User doesn\'t exist.');
			res.view({
				user: user
			});
		});
	},
	edit: function (req, res, next) {
		UserDAO.find(req.param('id'), function userFound(user){
			user = user[0];
			if(!user) return next('User doesn\'t exist.');
			res.view({
				user: user
			});
		});
	},
	update: function (req, res, next) {
		User.update(req, function userUpdated(){			
			res.redirect('/user/show/' + req.param('id'));
		});	
	},
	destroy: function (req, res, next) {
		UserDAO.find(req.param('id'), function userFound(user){
			if(!user) return next('User doesn\'t exist.');
			UserDAO.destroy(req.param('id'), function userDestroyed(err){
				if(err) return next(err);	
			});
			res.redirect('/session/destroy');
		});
	}
	//Promote users
};

