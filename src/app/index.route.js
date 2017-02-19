(function() {
  'use strict';

  angular
    .module('tally')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm',
        authenticate: false
      })

      .state('login', {
        url: '/login',
        templateUrl: 'app/auth/auth.html',
        controller: 'AuthController',
        controllerAs: 'vm'
      })

      .state('register', {
        url: '/register',
        templateUrl: 'app/auth/auth.html',
        controller: 'AuthController',
        controllerAs: 'vm'
      })

      .state('rooms', {
        url: '/rooms',
        templateUrl: 'app/room/list/roomList.html',
        controller: 'RoomListController',
        controllerAs: 'vm',
        authenticate: true
      })

      // empty view
      .state('room', {
        url: '/room',
        templateUrl: 'app/room/room.html',
        authenticate: true
      })

      .state('room.create', {
        url: '/create',
        templateUrl: 'app/room/create/roomCreate.html',
        controller: 'RoomCreateController',
        controllerAs: 'vm',
        authenticate: true
      })

      .state('room.update', {
        url: '/:roomID/update',
        templateUrl: 'app/room/create/roomCreate.html',
        controller: 'RoomCreateController',
        controllerAs: 'vm',
        params: {
          roomID: null,
          room: null
        },
        authenticate: true
      })

      .state('room.detail', {
        url: '/:roomID/details',
        templateUrl: 'app/room/details/roomDetail.html',
        controller: 'RoomDetailController',
        controllerAs: 'vm',
        authenticate: true
      })

      .state('room.presentation', {
        url: '/presentation/:presID',
        templateUrl: 'app/presentation/details/presentationDetail.html',
        controller: 'PresentationDetailController',
        controllerAs: 'vm',
        authenticate: true
      })

      .state('room.presentationcreate', {
        url: '/:roomID/presentation/p/create',
        templateUrl: 'app/presentation/create/presentationCreate.html',
        controller: 'PresentationCreateController',
        controllerAs: 'vm',
        authenticate: true
      })

      .state('presentation', {
        url: '/presentation',
        templateUrl: 'app/presentation/presentation.html',
        authenticate: true
      })

      .state('presentation.create', {
        url: '/create',
        templateUrl: 'app/presentation/create/presentationCreate.html',
        controller: 'PresentationCreateController',
        controllerAs: 'vm',
        authenticate: true
      })

      // .state('presentation.detail', {
      //   url: '/:presID/details',
      //   templateUrl: 'app/presentation/details/presentationDetail.html',
      //   controller: 'PresentationDetailController',
      //   controllerAs: 'vm',
      //   authenticate: true
      // })

      .state('presentation.poll', {
        url: '/:presID/:pollNum',
        templateUrl: 'app/presentation/details/presentationDetail.html',
        controller: 'PresentationDetailController',
        controllerAs: 'vm',
        authenticate: true,
        params: {
          presID: null,
          pollNum: null
        },
      })

    $urlRouterProvider.otherwise('/');
  }

})();
