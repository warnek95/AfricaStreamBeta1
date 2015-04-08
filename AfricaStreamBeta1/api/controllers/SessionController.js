/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function(req, res, next) {
		if (!req.param('pseudo') || !req.param('mdp')) {
			res.redirect('/session/new');
			return;
		}
		SessionDAO.findUserByPseudo(req.param('pseudo'), function (user){
      if(user) {
        require('bcrypt').compare(req.param('mdp'), user.Password, function (err, valid) {
          if (err) return next(err);
          if (!valid) {
            res.redirect('/');
            return;
          }

          req.session.authenticated = true;
          req.session.User = user;
          user.online = 1;
          SessionDAO.userOnline(user, function () {
            res.redirect('/');
          });
        });
      }
      else {
        res.redirect('/');
      }
		});
	},
	destroy: function(req, res, next) {
		SessionDAO.findUserByPseudo(req.session.User.Pseudo, function foundUser(user){
			user.online = 0;
			if (user) {
				SessionDAO.userOffline(user, function (){
					req.session.destroy();

					res.redirect('/');
				});
			} else {
				req.session.destroy();
				res.redirect('/');
			}

		});
	}
};

