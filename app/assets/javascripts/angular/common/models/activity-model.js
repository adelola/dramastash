(function(){
'use strict';

angular
  .module('secondLead.common')

  .factory('ActivityModel',['$http', function ($http) {
    function extract (result){
      return result.data;
    }
    
    return {
      getAll: function () {
       $http.get('/activities', {id: 1}).then(extract);
      }
    }
    
    }]);
})();
