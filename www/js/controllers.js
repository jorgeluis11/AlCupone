angular.module('starter.controllers', [])

.controller('AppCtrl', ['$scope','$http','$ionicModal', '$timeout',function($scope,$http, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  $scope.settingsList = [
    { text: "gustazos", checked: true },
    { text: "groopanda", checked: true },
    { text: "oferta", checked: true },
    { text: "ofertones", checked: true },
    { text: "groupon", checked: true }
  ];

  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.settingsList.splice(fromIndex, 1);
    $scope.settingsList.splice(toIndex, 0, item);
    $scope.getList();
  };

  // // Create the login modal that we will use later
  // $ionicModal.fromTemplateUrl('templates/login.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.groupons = []

  $scope.list = ""
  $scope.perspective = true;

  $scope.changePerspective = function(value){
    $scope.perspective = value;
  };

  $scope.getList = function(){
    $scope.groupons = []
    $scope.list = ""

    for(list in $scope.settingsList){
    if ($scope.settingsList[list].checked === true) {
      $scope.list += $scope.settingsList[list].text+",";
    };
  }

  if ($scope.list === "") {
    $scope.list = ",";
  };

  $http.get("https://gruponaso.herokuapp.com/",{
     params:{
        start:0,
        index:0,
        list:$scope.list
      }
  })
  .success(function(data)
    {
      $scope.groupons = data;
      console.log($scope.groupons)
    });
  }

    $scope.getList();
}])

// .controller('GrouponsCtrl', ['$scope','$http', function($scope, $http) {
 

// }])

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
