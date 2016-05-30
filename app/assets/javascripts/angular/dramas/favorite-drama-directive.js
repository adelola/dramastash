angular.module('secondLead')
  .directive('addDrama', ['DramaModel', '$mdToast', function (DramaModel, $mdToast) {
  	return {
  	  restrict: 'E',
  	  template:'<button><i class="fa fa-heart" ng-click="toggleFave(favList, drama)"></i></button>',
  	  scope: {
  	  	drama: "=",
  	  	favList: "=",
  	  	user: "@"
  	  },
	  link: function (scope, element, attrs) {
	  	scope.toggleFave = function (list, drama) {
	  	  DramaModel.add(scope.user, list, drama).then(function(response){
          $mdToast.show($mdToast.simple().textContent(response.message).position('right').hideDelay(2000));
        });
	  	  scope.selectedList = "";
	  	};
	  }
	}
}])
