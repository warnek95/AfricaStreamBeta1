/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName: 'Comments',
  schema: true,
  connection: 'mysqlconnect',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
  	Wording: {
  		type: 'string',
  		required: true
  	},
  	Id_Video: {
  		type: 'integer',
  		required: true
  	},
    Poster:  {
      type: 'string'
    }

  }
};

