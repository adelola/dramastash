angular.module('secondLead')
  .directive('feedItem', [ 'UserModel', function (UserModel){
  	return {
  	  restrict: 'A',
  	  templateUrl:'feed-item.html',
  	  scope: {
  	  	activity: "="
  	  },
  	  replace: false,
  	  link: function (scope, element, attributes){
        var name = scope.activity.parameters.username
        
        scope.message = "";
        scope.userId = scope.activity.owner_id;
        scope.userName = name.substring(0,1).toUpperCase()+name.substring(1);
        scope.listName = scope.activity.parameters.list;
        scope.listId = scope.activity.trackable_id

        function parseActivity () {
  	  	  if (scope.activity.trackable_type === "List"){
            scope.message = " created a list, "
          }



  	  	};

        parseActivity();
  	  }



  	};

  }])