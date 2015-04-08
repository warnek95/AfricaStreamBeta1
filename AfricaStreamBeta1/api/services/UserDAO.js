/**
* UserDAO.js
*
* @description :: TODO: You might write a short summary of how this DAO works and what it represents here.
*/
var mysql      = require('mysql');
var connection = mysql.createConnection(sails.config.connections.mysqlconnect);
connection.connect();
module.exports = {

	find: function(id, next){
	var query = "SELECT * " +
				"FROM Users " +
				"WHERE Id = " + connection.escape(id) + " ; \n";
		User.query(query, function userFound(err, user){
			if(err) return next(err);
			next(user);
		});
	},
	update: function(req, next){
		var query = "UPDATE Users " +
				"SET Name =" + connection.escape(req.param('name')) + "," +
				" Lastname =" + connection.escape(req.param('lastname')) + "," +
				" Email =" + connection.escape(req.param('email')) +  "," +
				" Pseudo =" + connection.escape(req.param('pseudo')) +  "," +
				" Password =" + connection.escape(req.param('email')) +  "," +
				"WHERE Id = " + connection.escape(req.param('id')) + " ; \n";
		User.query(query, function userUpdated(err){
			if(err) return res.redirect('/user/edit/' + req.param('id'));
		});
	},
	destroy: function(id, next){
		var query = "DELETE FROM Users " +
					"WHERE Id = " + connection.escape(id) + " ; \n";
		User.query(query, function userDestroyed(err, user){
			if(err) return next(err);
			 next(user);
		});
	}
	
};

