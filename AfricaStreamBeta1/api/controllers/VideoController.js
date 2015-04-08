/**
 * VideoController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
 var Q = require('q');
module.exports = {
	index: function(req, res, next){
		var videos = new Array();
		var videos2 = new Array();
		var videos4 = new Array();
		var videos5 = new Array();
		VideoDAO.findLastUploaded(function foundVideos(videosOnly, actorsOnly , genreOnly){
			VideoDAO.findLast(function foundVideos(videosOnly2, actorsOnly2){
				VideoDAO.findCaroussel(function foundVideos(videosOnly3){
          videos = VideoDAO.bindActors(videosOnly, actorsOnly);
          videos = VideoDAO.bindGenres(videos, genreOnly);
					videos2 = VideoDAO.bindActors(videosOnly2, actorsOnly2);
					res.view({
							videosRecente: videos,
							videos: videos2,
							videoCaroussel: videosOnly3,
							videosPopulaire: videos4,
							videosRecomm:videos5
					});
				});
			});
		});
	},
	new: function (req, res, next) {
			VideoDAO.findTypes(function foundTypes(types){
				if(!types) return next('There is no types');
				res.view({
					types: types
				});
			});
	},
	create: function (req, res, next) {
		var uploadPath = '../../assets/images';
		req.file('Pictures').upload({ dirname: uploadPath },function fileUploaded(err, files) {
			if (err) return next(err);
			VideoDAO.create(req, function videoCreated (video){
				VideoDAO.insertImage(files[0], video, false, function imageInserted (image1){
					VideoDAO.insertImage(files[1], video, true, function imageInserted (image2){
						VideoDAO.insertActors(req, video.insertId, function actorInserted(){
							VideoDAO.insertGenres(req, video.insertId, function genreInserted(){
				                VideoDAO.insertDirector(req, video.insertId, function directorInserted(){
				                 	res.view('video/addVideo',{
				                 		VideoId : video.insertId
				                 	});
				                });
							});
						});
					});
				});
			});
		});
	},
	show: function (req, res, next) {
		var video2;
		var videos2 = new Array();
		VideoDAO.findByNameAndId(req.query.vi, req.query.vn, function foundVideo(video, actorsOnly){
			Post.find({ Id_Video: video[0].VideoId })
				.exec(function(err, posts) {
				
			VideoDAO.findLast(function foundVideos(videosOnly2, actorsOnly2){
				_.each(actorsOnly, function(actors) {
				    result = _.filter(actors, function(actor) {
				      return actor.VideoId === video[0].VideoId;
				    })
				    if (typeof result !== 'undefined' && result.length > 0) {
				      video2 = { video : video , actors : result, comments : posts};
				    }
				})
				_.each(videosOnly2, function(video) {
					_.each(actorsOnly2, function(actors) {
					    result = _.filter(actors, function(actor) {
					      return actor.VideoId === video.VideoId;
					    })
					    if (typeof result !== 'undefined' && result.length > 0) {
					      videos2.push({ video : video , actors : result});
					    }
					})
				})
				res.view({
					video : video2,
					videosRecomm:videos2
				});
				})
			})
		})
	},
	fileBind: function (req, res, next) {
		var uploadPath = '../../assets/videos';
		req.file('VideoFile').upload({ maxBytes: Number.MAX_VALUE, dirname: uploadPath },function fileUploaded(err, files) {
			VideoDAO.bindVideoFile(req, files[0], function() {
				res.redirect('/');
			});
		});
	},
	search: function (req, res, next) {
		var str1 = '%';
		var str2 = req.param('Search');
		var str3 = str1.concat(str2.concat(str1));
          // .param('Search')

		VideoDAO.findLike(str3, function(videos) {
			res.json(videos);
		})
	},
};

