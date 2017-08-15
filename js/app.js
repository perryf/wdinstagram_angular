"use strict";

(function(){
  angular.module("wdinstagram", [
    'ui.router',
    'ngResource'
  ])
  .config([
    '$stateProvider',
    RouterFunction
  ])
  .controller('InstagramIndexController', [
    'Instagram',
    InstagramIndexControllerFunction
  ])
  .controller('InstagramShowController', [
    'Instagram',
    '$state',
    InstagramShowControllerFunction
  ])
  .controller('InstagramNewController',[
    'Instagram',
    '$state',
    InstagramNewControllerFunction
  ])
  .controller('InstagramEditController', [
    'Instagram',
    '$state',
    InstagramEditControllerFunction
  ])
  .factory('Instagram', [
    '$resource',
    instagramService
  ])

  function instagramService ($resource) {
    return $resource('http://localhost:3000/entries/:id', {}, {
      update: {
        method: 'PUT'
      }
    })
  }

  function RouterFunction ($stateProvider) {
    $stateProvider
    .state('instagramIndex', {
      url: '/instagram',
      templateUrl: 'js/ng-views/index.html',
      controller: 'InstagramIndexController',
      controllerAs: 'vm'
    })
    .state('instagramNew', {
      url: '/instagram/new',
      templateUrl: 'js/ng-views/new.html',
      controller: 'InstagramNewController',
      controllerAs: 'vm'
    })
    .state('instagramEdit', {
      url: '/instagram/:id/edit',
      templateUrl: 'js/ng-views/edit.html',
      controller: 'InstagramEditController',
      controllerAs: 'vm'
    })
    .state('instagramShow', {
      url: '/instagram/:id',
      templateUrl: 'js/ng-views/show.html',
      controller: 'InstagramShowController',
      controllerAs: 'vm'
    })
  }

  function InstagramIndexControllerFunction (Instagram) {
    this.grams = Instagram.query()
  }

  function InstagramNewControllerFunction (Instagram, $state) {
    this.gram = new Instagram()
    this.create = function () {
      this.gram.$save(() => {
        $state.go('instagramIndex')
      })
    }
  }

  function InstagramShowControllerFunction (Instagram, $state) {
    this.gram = Instagram.get({id: $state.params.id})
  }

  function InstagramEditControllerFunction (Instagram, $state) {
    this.gram = Instagram.get({id: $state.params.id})
    this.update = function () {
      this.gram.$update({id: $state.params.id}, (gram) => {
        $state.go('instagramShow', {id: gram.id})
      })
    }
    this.destroy = function () {
      this.gram.$delete({id: $state.params.id}, (gram) => {
        $state.go('instagramIndex', {id: gram.id})
      })
    }
  }
})();
