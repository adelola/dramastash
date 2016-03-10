(function(){
'use strict';

angular
  .module('secondLead.common')

  .factory('ActivityModel',['$http', function ($http) {
    function extract (result){
      return result.data;
    }
    
    return {
      getAll: function (userId) {
        return $http.get('/activities', {params: {id: userId}}).then(extract);
      }
    }
    
    }]);
})();
