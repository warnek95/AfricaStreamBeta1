/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function (req, res, next) {
		Post.create({
		  Wording: req.param('Wording'),
		  Id_Video: req.param('Id_Video'),
		  Poster: req.session.User.Name
		})
		.exec(function(err, post) {
			if (err) next(err);
			res.redirect('/');
		});


	},
};

