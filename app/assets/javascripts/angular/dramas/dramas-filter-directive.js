angular.module('secondLead')
  .directive('dramasFilter', ['DramaModel', '$httpParamSerializer', '$location', function (DramaModel, $httpParamSerializer, $location) {
  	return {
  	  restrict: 'E',
  	  templateUrl:'filter-bar.html',
  	  scope: {
        items: "=",
        totalDramas: "="
  	  },
	  link: function (scope, element, attrs) {
      scope.genreItems = [
        {name: "Action", value: "Action & Adventure", ticked: false},
        {name: "Comedy", value: "Comedy", ticked: false},
        {name: "Historical", value: "Historical", ticked: false},
        {name: "Idol", value: "Idol Drama", ticked: false},
        {name: "Melodrama", value: "Melodrama", ticked: false},
        {name: "Mystery", value: "Crime & Mystery", ticked: false},
        {name: "Supernatural", value: "SciFi & Fantasy", ticked: false},
        {name: "Thriller", value: "Action / Thriller", ticked: false}
      ];

      scope.countryItem = [
        {name: "China", ticked: false},
        {name: "Hong Kong", ticked: false},
        {name: "Japan", ticked: false},
        {name: "Korea", ticked: false},
        {name: "Taiwan", ticked: false}
      ];

      scope.selectedGenres = [];
      scope.selectedCountry = [];

      function extract (thing){
        var collection = [];
        for(i=0; i < thing.length; i++){
          collection.push(thing[i]["name"]);
        }
        return collection
      }

      scope.filter = function () {
        event.preventDefault();
        var page = 1;
        var genre = extract(scope.selectedGenres).toString();
        var country = extract(scope.selectedCountry).toString();
        $location.url('/dramas').search({genre: genre, country: country, page: page});
      };

	  }
	}
}])
