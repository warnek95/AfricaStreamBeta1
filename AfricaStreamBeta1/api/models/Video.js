/**
* Video.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName: 'Video',
  schema: true,
  connection: 'mysqlconnect',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
  	Title: {
  		type: 'string',
  		required: true
  	},
  	ReleaseDate: {
  		type: 'date',
  		required: true
  	},
  	Description: {
  		type: 'string',
  		required: true
  	},
  	Season: {
  		type: 'integer',
      defaultsTo: false
  	},
    Episode: {
  		type: 'integer',
      defaultsTo: false
  	},
    SeriesTitle: {
      type: 'string',
      defaultsTo: false//to search
    },
    Link: {
      type: 'string',
  		required: true
    },
    Pictures: {
    },
    Actors: {
      type: 'array'
    },
    Genres: {
      type: 'array'
    },
    Type: {
      type: 'integer',
      required: true
    },
    DirectorName: {
      type: 'string'
    },
    DirectorLastName: {
      type: 'string'
    },
    toJSON: function() {
  		var obj = this.toObject();
  		delete obj._csrf;
  		return obj;
  	}
  }
};

