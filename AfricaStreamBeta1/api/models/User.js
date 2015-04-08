/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName: 'Users',
  schema: true,
  connection: 'mysqlconnect',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
  	Pseudo: {
  		type: 'string',
  		required: true
  	},
  	LastName: {
  		type: 'string',
  		required: true
  	},
  	Name: {
  		type: 'string',
  		required: true
  	},
  	Email: {
  		type: 'string',
  		email: true,
  		required: true,
  		unique: true
  	},
    Password: {
  		type: 'string'
  	},
    Online: {
      type: 'boolean',
      defaultsTo: false
    },
    Admin: {
      type: 'boolean',
      defaultsTo: false
    },
    toJSON: function() {
  		var obj = this.toObject();
  		delete obj.mdp;
  		delete obj.mdp2;
  		delete obj.encryptedPassword;
  		delete obj._csrf;
  		return obj;
  	}
  },
  beforeCreate: function (values, next) {
    var emailv = false;
    var pseudov = false;
    var query = "SELECT Email ," +
                " Pseudo" +
                " FROM Users " ;       
    User.query(query, function foundUser(err, user){
     if (!values.mdp || (values.mdp != values.mdp2)) {
       return next({err: ["Password doesn't match password confirmation."]});
     };

    for (var i = user.length - 1; i >= 0; i--) {
      if (user[i].Email == values.Email) emailv = true;
      if (user[i].Pseudo == values.Pseudo) pseudov = true;
    };

    if(emailv ){
      return next({err: ["Email does already exist."]});
    };
    if(pseudov ){
      return next({err: ["Pseudo does already exist."]});
    };
     require('bcrypt').hash(values.mdp, 10, function passwordEncrypted(err, encryptedPassword) {
       if (err) return next(err);
       values.Password = encryptedPassword;
      next();
     });
    });
  }
};

