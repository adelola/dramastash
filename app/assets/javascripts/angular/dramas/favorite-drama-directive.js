angular.module('secondLead')
  .directive('faveDrama', ['DramaModel', 'ngToast', 'store', function (DramaModel, ngToast, store) {
  	return {
  	  restrict: 'E',
  	  template:'<button class="favorite-drama" ng-class="redHeart" ng-click="toggleFave()"><i class="fa fa-heart"></i></button>',
  	  scope: {
  	  	drama: "=",
  	  	userId: "@",
        removeItem: "&"
  	  },
	  link: function (scope, element, attrs) {
      var dramaIsFave = function(drama){
        return DramaModel.checkIfFavorite(drama.id, scope.userId).then(function (result){
          favListId = result.fav_list_id
          return result.status
        })
      };

      var initialize = function(){
        dramaIsFave(scope.drama).then(function (result){
          if(result === true){
            scope.redHeart = 'favorite-drama-active';
          }
        });
	  	};
      initialize();

      function favorite(){
        DramaModel.add(scope.userId, favListId, scope.drama.id).then(function(response){
          if(response.status === true){
            scope.redHeart = 'favorite-drama-active';
          }
            ngToast.create(response.message);
        })
      };

      function unfavorite(){
        DramaModel.delete(scope.userId, favListId, scope.drama.id).then(function(response){
          ngToast.create(response.message);
          scope.redHeart = '';
        })
      }

      scope.toggleFave = function () {
        dramaIsFave(scope.drama).then(function(result){
          if(result === true){
            unfavorite();
            scope.removeItem(scope.drama);
          } else {
            favorite();
          }
        })
	  	};

	  }
	}
}])
