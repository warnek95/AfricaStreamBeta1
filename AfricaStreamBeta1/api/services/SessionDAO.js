/**
* SessionDAO.js
*
* @description :: TODO: You might write a short summary of how this DAO works and what it represents here.
*/
var mysql      = require('mysql');
var connection = mysql.createConnection(sails.config.connections.mysqlconnect);
connection.connect();
module.exports = {

	findUserById: function(id, next){
		var query = "SELECT * " +
					"FROM Users " +
					"WHERE Id = " + id;
		User.query(query, function userFound(err,user){
			if (err) return next(err);
			return next(user);
		});
	},
	findUserByPseudo: function(pseudo, next){
		var query = "SELECT * " +
					"FROM Users " +
					"WHERE Pseudo = " + connection.escape(pseudo);
		User.query(query, function userFound(err,user){
			if (err) return next(err);
			return next(user[0]);
		});
	},
	userOnline: function(user, next){
		var query = "UPDATE Users " +
					"SET Online = " +user.online + ' ' +
					"WHERE Id = " + user.Id;
		User.query(query, function userUpdated(err){
			if (err) return next(err);
			return next();
		});
	},
	userOffline: function(user, next){
		var query = "UPDATE Users " +
					"SET Online = 0 " +
					"WHERE Id = " + user.Id;
		User.query(query, function userUpdated(err){
			if (err) return next(err);
			return next();
		});
	},
};

