(function(){
'use strict';

angular
  .module('secondLead.common')

  .factory('FavoriteModel',['$http', 'Restangular', 'store', function ($http, Restangular, store){
    var currentUser = store.get('user');
    function extract (result){
      return result.data;
    }
    return {

      checkFave: function (dramaID){
        return $http.post('/users/' + currentUser.id + '/lists/check_fave', {params: {drama_id: dramaID}}).then(extract);
      },

      create: function (dramaID, listID){
          return Restangular.one("users", currentUser.id).one("lists", listID).all("dramas").post({id: dramaID})
      },

      delete: function (dramaID, listID){
        return Restangular.one("users", currentUser.id).one("lists", listID).one("dramas", dramaID).remove()
      }

    };

  }])

})();
