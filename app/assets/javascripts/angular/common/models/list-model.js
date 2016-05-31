(function(){
'use strict';

angular
  .module('secondLead.common')

  .factory('ListModel',['$http','Restangular', 'store', function ($http, Restangular, store){
    var currentUser = store.get('user');
    return {

      getAll: function (userID){
        return Restangular.one('users', userID).getList('lists')
      },

      currentUserLists: function (userID){
        return Restangular.one('users', userID).getList('lists').$object
      },

      faveList: function (userID){
        return $http.get('/fave_list', { params: {user_id: userID}}).then(function(result){
          return result.data
        })
      },

      getOne: function (userID, listID){
        return Restangular.one('users', userID).one('lists', listID).get()
      },

      create: function (listParams){
        return Restangular.one('users', currentUser.id).all('lists').post(listParams)
      },

      update: function (listID, listParams){
        return Restangular.one('users', currentUser.id).one('lists', listID).put(listParams)
      },

      delete: function (listID){
        return Restangular.one('users', currentUser.id).one('lists', listID).remove()
      }

    };

  }])

})();
