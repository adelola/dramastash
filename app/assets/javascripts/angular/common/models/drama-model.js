(function(){
'use strict';

angular
  .module('secondLead.common')

  .factory('DramaModel',['$http','Restangular', function ($http, Restangular){
     var baseDramas = Restangular.all('dramas');
     function extract (result){
       return result.data;
     };

     return {
      // getAll: baseDramas.getList().$object,

      getDramas: function (genres, country, page){
        return $http.get('/dramas', {genres: genres, country: country, page: page}).then(extract);
      },

      getOne: function (dramaID){
        return Restangular.one('dramas', dramaID).get()
      },

      delete: function (userID, listID, dramaID){
        return Restangular.one("users", userID).one("lists", listID).one("dramas", dramaID).remove()
      },

      add: function (userID, listID, dramaID){
        return Restangular.one("users", userID).one("lists", listID).all("dramas").post({id: dramaID})

      }
    };
  }])
})();
