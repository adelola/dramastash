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


        function parseActivity () {
          if (scope.activity.trackable_type === "List"){
            scope.message = " created ";
            scope.listId = scope.activity.trackable_id;
            scope.listName = scope.activity.parameters.list;

          } else if (scope.activity.trackable_type === "Review"){
            scope.message = " reviewed ";
            scope.dramaName = scope.activity.parameters.drama.name;
            scope.dramaId = scope.activity.parameters.drama.id;

          } else if (scope.activity.trackable_type === "Rating") {
            scope.message = " gave ";
            scope.dramaName = scope.activity.parameters.drama.name;
            scope.dramaId = scope.activity.parameters.drama.id;
            scope.rating = scope.activity.parameters.rating+" hearts"
          }
  	  	};

        // console.log(scope.activity.trackable_type);
        parseActivity();
  	  }



  	};

  }])