(function(){
'use strict';

angular
  .module('secondLead',
  	['angular-jwt',
    'angular-storage',
    'angularUtils.directives.dirPagination',
    'gridster',
    'restangular',
    'secondLead.common',
  	'templates',
    'ui.bootstrap',
    'ui.router',
    'xeditable',
    'ngToast',
    'ngAnimate',
    'isteven-multi-select',
    'angularUtils.directives.dirDisqus' ])

  .config(['$httpProvider', 'jwtInterceptorProvider', function Config ($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = ['config', 'store', function(config, store) {
    // Skips authentication for any requests ending in .html
    if (config.url.substr(config.url.length - 5) == '.html') {
      return null;
    }
      return store.get('jwt');;
    }];

    $httpProvider.interceptors.push('jwtInterceptor');
  }])

  .config(['ngToastProvider', function(ngToastProvider) {
    ngToastProvider.configure({
      additionalClasses: 'ds-toast-animation'
    });
  }])

  .run(['jwtHelper','$rootScope', '$state', 'store', function (jwtHelper, $rootScope, $state, store){
    $rootScope.$on('$stateChangeStart', ['event', 'toState', 'toParams', function (event, toState, toParams){
      var requiresLogin = toState.data.requiresLogin;
      if (requiresLogin === true) {
        if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
          event.preventDefault();
          $state.go('login');
        }
      }
    }]);
  }])

  .config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }])

  .config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url:'/',
        templateUrl: 'index.html',
        data: { requiresLogin: false },
        controller:'IndexCtrl',
        controllerAs: 'index',
        resolve: {
          lists: ['ListModel','Restangular', function (ListModel,Restangular){
            return ListModel.getFeatured();
          }]
        }
      })

      .state('register', {
        url:'/register',
        templateUrl: 'register.html',
        data: { requiresLogin: false },
        controller:'RegisterCtrl',
        controllerAs: 'register'
      })

      .state('login', {
        url:'/login',
        data: { requiresLogin: false },
        templateUrl: 'login.html',
        controller:'LoginCtrl',
        controllerAs: 'login'
      })

      .state('dramas', {
        url:'/dramas?=:genre&=:country&=:page',
        data: { requiresLogin: false },
        templateUrl: 'dramas-index.html',
        controller:'DramasCtrl',
        controllerAs: 'dramas',
        resolve: {
          dramas: ['DramaModel','Restangular','$stateParams', function (DramaModel,Restangular,$stateParams){
            return DramaModel.getDramas($stateParams.genre,$stateParams.country,$stateParams.page);
          }],
          page: ['$stateParams', function($stateParams){
            return $stateParams.page;
          }]
        }
      })

      .state('drama', {
        url:'/dramas/:dramaID',
        data: { requiresLogin: false },
        templateUrl: 'drama-show.html',
        controller:'DramaCtrl',
        controllerAs: 'drama',
        resolve: {
          drama: ['$stateParams','DramaModel','Restangular', function ($stateParams,DramaModel,Restangular){
            return DramaModel.getOne($stateParams.dramaID);
          }]
        }
      })

      .state('search-results', {
        url:'/search/?=:query',
        data: { requiresLogin: false },
        templateUrl: 'search-results.html',
        controller:'SearchCtrl',
        controllerAs: 'search',
        resolve: {
          dramas: ['SearchService', function (SearchService){
              return SearchService.getDramas();
          }],
          casts: ['SearchService', function (SearchService){
              return SearchService.getCasts();
          }],
          users: ['SearchService', function (SearchService){
              return SearchService.getUsers();
          }]
        }
      })


      .state('casts', {
        url:'/casts',
        data: { requiresLogin: false },
        templateUrl: 'casts-index.html',
        controller:'CastsCtrl',
        controllerAs: 'casts'
      })

      .state('cast', {
        url:'/casts/:castID',
        data: { requiresLogin: false },
        templateUrl: 'cast-show.html',
        controller:'CastCtrl',
        controllerAs: 'cast',
        resolve: {
          cast: ['$stateParams','CastModel','Restangular', function ($stateParams,CastModel,Restangular){
              return CastModel.getOne($stateParams.castID);
          }]
        }
      })

      .state('user', {
        url:'/users/:userID',
        data: { requiresLogin: true },
        templateUrl: 'user-show.html',
        controller:'UserCtrl',
        controllerAs: 'user',
        resolve: {
          user: ['$stateParams','UserModel','Restangular', function ($stateParams,UserModel,Restangular){
              return UserModel.getOne($stateParams.userID);
          }]
        }
      })

        .state('user.lists', {     //Nested under user
          url:'/stashes',
          data: { requiresLogin: true },
          templateUrl: 'lists-index.html',
          controller:'ListsCtrl',
          controllerAs: 'lists',
          resolve: {
            lists: ['user', function (user){
              return user["lists"];
            }],
            fav_list: ['user', function (user){
              return user["fav_list"];
            }],
            fav_dramas: ['user', function (user){
              return user["fav_dramas"];
            }]
          }
        })

        .state('user.list', {       //Nested under user
          url:'/stashes/:listID',
          data: { requiresLogin: true },
          templateUrl: 'list-show.html',
          controller:'ListCtrl',
          controllerAs: 'list',
          resolve: {
            list: ['$stateParams','ListModel','Restangular', function ($stateParams,ListModel,Restangular){
                return ListModel.getOne($stateParams.userID, $stateParams.listID);
            }]
          }
      })
        .state('user.fav_list', {       //Nested under user
          url:'/top5',
          data: { requiresLogin: true },
          templateUrl: 'fav-list-show.html',
          controller:'FavListCtrl',
          controllerAs: 'faves',
          resolve: {
            fav_list: ['user', function (user){
              return user["fav_list"];
            }],
            fav_dramas: ['user', function (user){
              return user["fav_dramas"];
            }]
          }
        })

  }])


  .run(['editableOptions',function (editableOptions){
    editableOptions.theme = 'bs2';
  }]);

})();
