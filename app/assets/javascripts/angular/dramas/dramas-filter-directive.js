angular.module('secondLead')
  .directive('dramasFilter', ['DramaModel', '$httpParamSerializer', '$location', function (DramaModel, $httpParamSerializer, $location) {
  	return {
  	  restrict: 'E',
  	  templateUrl:'filter-bar.html',
  	  scope: {
        items: "=",
        totalDramas: "=",
        selectedGenres: "=",
        selectedCountry: "="
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
      scope.page = 1;

      scope.filter = function () {
        event.preventDefault();
        genre_items = $httpParamSerializer({ genre: scope.selectedGenres });
        country_items = $httpParamSerializer({ country: scope.selectedCountry });
        $location.url('/dramas?&'+genre_items+'&'+country_items+'&page=' + scope.page);
      };
	  }
	}
}])
