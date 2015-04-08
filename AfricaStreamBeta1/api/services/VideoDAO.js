/**
* VideoDAO.js
*
* @description :: TODO: You might write a short summary of how this DAO works and what it represents here.
*/
var mysql      = require('mysql');
var connection = mysql.createConnection(sails.config.connections.mysqlconnect);
connection.connect();
module.exports = {

	findLastUploaded: function(next){
		var actors = new Array();
		var videos = new Array();
    var genres = new Array();
		var query = "SELECT V.* , " +
					"P.* , " +
					"V.Link AS VideoLink ," +
					"V.Id AS VideoId ," +
          "D.Name As DirectorName ," +
          "D.Lastname As DirectorLastName " +
					"FROM Video AS V " +
					"JOIN Pictures AS P ON(P.Id_Video = V.Id) " +
          "JOIN Director AS D ON(D.Id = V.Id_Director) " +
					"WHERE P.Slide = 0 " +
					"ORDER BY V.Id DESC " +
					"LIMIT 6; \n" ;
          
		Video.query(query, function videosFound(err, videosOnly){

			if(err) return next(err);
      for (var i = 0; i < videosOnly.length; i++) {
        var query = "SELECT G.* , " +
          "VG.Id AS VideoId " +
          "FROM VideoGenre AS VG " +
          "JOIN Genres AS G ON(VG.Id_Genres = G.Id) " +
          "WHERE VG.Id = " + connection.escape(videosOnly[i].VideoId) +
          " ;";
        Video.query(query, function genresFound(err, genresOnly){
          if(err) return next(err);
          genres.push(genresOnly);
        });
      };
			for (var i = 0; i < videosOnly.length; i++) {
				var query = "SELECT A.* , " +
							"Pl.Id_Video AS VideoId " +
							"FROM Play AS Pl " +
							"JOIN Actors AS A ON(Pl.Id = A.Id) " +
							"WHERE Pl.Id_Video = " + connection.escape(videosOnly[i].VideoId) +
							" ;";
				Video.query(query, function actorsFound(err, actorsOnly){
					if(err) return next(err);

					actors.push(actorsOnly);
				});
			};

			next(videosOnly, actors , genres);
		});
	},
	findLast: function(next){
		var actors = new Array();
		var videos = new Array();
		var query = "SELECT V.* , " +
					"P.* , " +
					"V.Link AS VideoLink ," +
					"V.Id AS VideoId " +
					"FROM Video AS V " +
					"JOIN Pictures AS P ON(P.Id_Video = V.Id) " +
					"WHERE P.Slide = 0 " +
					"ORDER BY V.Id DESC " +
					"LIMIT 36; \n" ;
		Video.query(query, function videosFound(err, videosOnly){

			if(err) return next(err);
			for (var i = 0; i < videosOnly.length; i++) {
				var query = "SELECT A.* , " +
							"Pl.Id_Video AS VideoId " +
							"FROM Play AS Pl " +
							"JOIN Actors AS A ON(Pl.Id = A.Id) " +
							"WHERE Pl.Id_Video = " + connection.escape(videosOnly[i].VideoId) +
							" ;";

				Video.query(query, function videosFound(err, actorsOnly){
					if(err) return next(err);

					actors.push(actorsOnly);
				});
			};
			next(videosOnly, actors);
		});
	},
	findCaroussel: function(next){
		var query = "SELECT V.* ," +
					"P.* , " +
					"V.Link AS VideoLink ," +
					"V.Id AS VideoId " +
					"FROM Video AS V " +
					"JOIN Pictures AS P ON(P.Id_Video = V.Id) " +
					"WHERE P.Slide = 1 " +
					"ORDER BY V.Id DESC " +
					"LIMIT 3; \n" ;
		Video.query(query, function videosFound(err, videos){
			if(err) return next(err);
			next(videos);
		});
	},
	findActors: function(next){
		var query = "SELECT * " +
					"FROM Actors ;";
		Video.query(query, function actorsFound(err, actors){
			if(err) return next(err);
			next(actors);
		});
	},
	findActorByName: function(name, lastName, next){
		var query = "SELECT Id " +
					"FROM Actors " +
					"WHERE Name = " + connection.escape(name) + " AND LastName = " + connection.escape(lastName) + ";";
		Video.query(query, function actorFound(err, actor){
			if(err) return next(err);
			next(actor[0]);
		});
	},
	findTypes: function(next){
		var query = "SELECT * " +
					"FROM Types ;";
		Video.query(query, function typesFound(err, types){
			if(err) return next(err);
			next(types);
		});
	},
	findGenres: function(next){
		var query = "SELECT * " +
					"FROM Genres ;";
		Video.query(query, function genresFound(err, genres){
			if(err) return next(err);
			next(genres);
		});
	},
	create: function(req, next){
		var query = "INSERT INTO Video(Title,ReleaseDate,Description,Season,Episode,SeriesTitle,Link,Id_Types) " +
					"VALUES ("+ connection.escape(req.param('Title'))+ "," +
								connection.escape(req.param('ReleaseDate'))+ "," +
								connection.escape(req.param('Description'))+ "," +
								connection.escape(req.param('Season'))+ "," +
								connection.escape(req.param('Episode'))+ "," +
								connection.escape(req.param('SeriesTitle'))+ "," +
								connection.escape(req.param('Link').replace('watch?v=','embed/').replace('https:',''))+ "," +
								connection.escape(req.param('Type'))+ "); \n";
		Video.query(query, function videoCreated(err, video){
			if(err) return next(err);
			next(video);
		});
	},
	insertImage: function(file, video, slide, next){
		var query = "INSERT INTO Pictures(Link,Slide,Id_Video) " +
					"VALUES ("+ connection.escape(file.fd.replace('/home/dalmace/Documents/pré/Africa/assets',''))+ "," +
								connection.escape(slide)+ "," +
								connection.escape(video.insertId)+ "); \n" ;
		Video.query(query, function imageInserted(err, image){
			if(err) return next(err);
			next(image);
		});
	},
	insertActors: function(req, videoId, next){
		var j = 0;
    if( typeof(req.param('ActorsLastName')) == 'string' ){
      VideoDAO.findActorByName(req.param('ActorsName'), req.param('ActorsLastName'), function actorFound(actorId){
        if ( !actorId ) {
          VideoDAO.createActor(req.param('ActorsName'), req.param('ActorsLastName'), function actorCreated(actorId){
            var query = "INSERT INTO Play(Id,Id_Video) " +
              "VALUES ("+ connection.escape(actorId)+ "," +
              connection.escape(videoId)+ "); \n" ;
            Video.query(query, function actorInserted(err){
              if(err) return next(err);
            });
          });
        } else {
          var query = "INSERT INTO Play(Id,Id_Video) " +
            "VALUES ("+ connection.escape(actorId.Id)+ "," +
            connection.escape(videoId)+ "); \n" ;
          Video.query(query, function actorInserted(err){
            if(err) return next(err);
          });
        }
      });
    }
    else {
      for (var i = 0; i < req.param('ActorsLastName').length; i++) {
        VideoDAO.findActorByName(req.param('ActorsName')[i], req.param('ActorsLastName')[i], function actorFound(actorId) {
          if (!actorId) {
            VideoDAO.createActor(req.param('ActorsName')[j], req.param('ActorsLastName')[j], function actorCreated(actorId) {
              var query = "INSERT INTO Play(Id,Id_Video) " +
                "VALUES (" + connection.escape(actorId) + "," +
                connection.escape(videoId) + "); \n";
              Video.query(query, function actorInserted(err) {
                if (err) return next(err);
              });
            });
          } else {
            var query = "INSERT INTO Play(Id,Id_Video) " +
              "VALUES (" + connection.escape(actorId.Id) + "," +
              connection.escape(videoId) + "); \n";
            Video.query(query, function actorInserted(err) {
              if (err) return next(err);
            });
          }
          j++;
        });
      };
    }
		return next();
	},
	createActor: function(name, lastName, next){
		var query = "INSERT INTO Actors(Name,LastName) " +
					"VALUES ("+ connection.escape(name)+ "," +
								connection.escape(lastName)+ "); \n" ;
		Video.query(query, function actorCreated(err, actor){
			if(err) return next(err);
			next(actor.insertId);
		});
	},
  findGenreByWording: function(wording, next){
    var query = "SELECT Id " +
      "FROM Genres " +
      "WHERE Wording = " + connection.escape(wording) + " ;";
    Video.query(query, function genreFound(err, genreId){
      if(err) return next(err);
      next(genreId[0]);
    });
  },
	insertGenres: function(req, videoId, next) {
    var j = 0;
    if (typeof(req.param('Genres')) == 'string') {
      VideoDAO.findGenreByWording(req.param('Genres'), function genreFound(genreId) {
        if (!genreId) {
          VideoDAO.createGenre(req.param('Genres'), function genreCreated(genreId) {
            var query = "INSERT INTO VideoGenre(Id,Id_Genres) " +
              "VALUES (" + connection.escape(videoId) + "," +
              connection.escape(genreId) + "); \n";
            Video.query(query, function genreInserted(err) {
              if (err) return next(err);
            });
          });
        } else {
          var query = "INSERT INTO VideoGenre(Id,Id_Genres) " +
            "VALUES (" + connection.escape(videoId) + "," +
            connection.escape(genreId.Id) + "); \n";
          Video.query(query, function genreInserted(err) {
            if (err) return next(err);
          });
        }
      })
    }
    else {
      for (var i = 0; i < req.param('Genres').length; i++) {
        VideoDAO.findGenreByWording(req.param('Genres')[i], function genreFound(genreId) {
          if (!genreId) {
            ;
            VideoDAO.createGenre(req.param('Genres')[j], function genreCreated(genreId) {
              var query = "INSERT INTO VideoGenre(Id,Id_Genres) " +
                "VALUES (" + connection.escape(videoId) + "," +
                connection.escape(genreId) + "); \n";
              Video.query(query, function genreInserted(err) {
                if (err) return next(err);
              });
            });
          } else {
            var query = "INSERT INTO VideoGenre(Id,Id_Genres) " +
              "VALUES (" + connection.escape(videoId) + "," +
              connection.escape(genreId.Id) + "); \n";
            Video.query(query, function genreInserted(err) {
              if (err) return next(err);
            });
          }
          j++;
        });
      }
    }
    return next();
	},
	createGenre: function(wording, next){
		var query = "INSERT INTO Genres(Wording) " +
					"VALUES ("+ connection.escape(wording)+ "); \n" ;
		Video.query(query, function actorCreated(err, genre){
			if(err) return next(err);
			next(genre.insertId);
		});
	},
  findDirectorByName: function(name, lastName, next){
    var query = "SELECT Id " +
      "FROM Director " +
      "WHERE Name = " + connection.escape(name) + " AND LastName = " + connection.escape(lastName) + ";";
    Video.query(query, function directorFound(err, director){
      if(err) return next(err);
      next(director[0]);
    });
  },
  insertDirector: function(req, videoId, next){
    VideoDAO.findDirectorByName(req.param('DirectorName'), req.param('DirectorLastName'), function directorFound(directorId){
      if ( !directorId ) {
        VideoDAO.createDirector(req.param('DirectorName'), req.param('DirectorLastName'), function actorCreated(directorId){
          var query = "Update Video " +
            "SET Id_Director = "+ connection.escape(directorId)+ " " +
            "WHERE Id = " +  connection.escape(videoId)+ "; \n" ;
          Video.query(query, function directorInserted(err){
            if(err) return next(err);
          });
        });
      } else {

        var query = "Update Video " +
          "SET Id_Director = "+ connection.escape(directorId.Id)+ " " +
          "WHERE Id = " +  connection.escape(videoId)+ "; \n" ;
          Video.query(query, function directorInserted(err){
          if(err) return next(err);
        });
      }
    });
   return next();
  },
  createDirector: function(name, lastName, next){
    var query = "INSERT INTO Director(Name,LastName) " +
      "VALUES ("+ connection.escape(name)+ "," +
      connection.escape(lastName)+ "); \n" ;
    Video.query(query, function directorCreated(err, director){
      if(err) return next(err);
       next(director.insertId);
    });
  },
	findByNameAndId: function(id, title, next) {
		var actors = new Array();
		var query =  "SELECT V.* , " +
					"P.* , " +
					"V.Link AS VideoLink ," +
					"YEAR(V.ReleaseDate) AS Year ," +
					"V.Id AS VideoId " +
					"FROM Video AS V " +
					"JOIN Pictures AS P ON(P.Id_Video = V.Id) " +
					"WHERE P.Slide = 0 AND V.Id = "+ connection.escape(id)+ " AND V.Title = " + connection.escape(title)+ " " +
					"ORDER BY V.Id DESC " +
					"; \n" ;
		Video.query(query, function videoFound(err, videosOnly){
			if(err) return next(err);
				var query = "SELECT A.* , " +
							"Pl.Id_Video AS VideoId " +
							"FROM Play AS Pl " +
							"JOIN Actors AS A ON(Pl.Id = A.Id) " +
							"WHERE Pl.Id_Video = " + connection.escape(videosOnly[0].VideoId) +
							" ;";

				Video.query(query, function videosFound(err, actorsOnly){
					if(err) return next(err);

					actors.push(actorsOnly);
					next(videosOnly, actors);
				});
		});
	},
  bindActors: function(videosOnly, actorsOnly){
    var videos = new Array();
    _.each(videosOnly, function(video) {
      _.each(actorsOnly, function(actors) {
        result = _.filter(actors, function(actor) {
          return actor.VideoId === video.VideoId;
        })
        if (typeof result !== 'undefined' && result.length > 0) {
          videos.push({ video : video , actors : result});

        }
      })
    })
    return videos;
  },
  bindGenres: function(videosOnly, genresOnly){
    var videos = new Array();
    _.each(videosOnly, function(video) {
      _.each(genresOnly, function(genres) {
        result = _.filter(genres, function(genre) {
          return genre.VideoId === video.video.VideoId;
        })
        if (typeof result !== 'undefined' && result.length > 0) {
          video.genres = result;
          videos.push({ video : video });

        }
      })
    })
    return videos;
  },
  bindVideoFile: function(req, file, next){
    var query = "Update Video " +
            "SET Link = "+ connection.escape(file.fd.replace('/home/dalmace/Documents/pré/Africa/assets',''))+ "," +
            "Uploaded = 1 " +
            "WHERE Id = " +  connection.escape(req.param('VideoId'))+ "; \n" ;
    Video.query(query, function directorInserted(err){
      if(err) return next(err);
      next();
    });
  },
  findLike: function(search, next) {
    var actors = new Array();
    var videos = new Array();
    var query = "SELECT V.* , " +
          "P.* , " +
          "V.Link AS VideoLink ," +
          "V.Id AS VideoId " +
          "FROM Video AS V " +
          "JOIN Pictures AS P ON(P.Id_Video = V.Id) " +
          "WHERE P.Slide = 0 " +
          "AND V.Title like " +  connection.escape(search) + " " +
          "ORDER BY V.Id DESC ";

    Video.query(query, function videosFound(err, videosOnly){

      if(err) return next(err);
      for (var i = 0; i < videosOnly.length; i++) {
        var query = "SELECT A.* , " +
              "Pl.Id_Video AS VideoId " +
              "FROM Play AS Pl " +
              "JOIN Actors AS A ON(Pl.Id = A.Id) " +
              "WHERE Pl.Id_Video = " + connection.escape(videosOnly[i].VideoId) +
              " ;";

        Video.query(query, function videosFound(err, actorsOnly){
          if(err) return next(err);

          actors.push(actorsOnly);
        });
      };
      next(videosOnly, actors);
    });
  },
};

