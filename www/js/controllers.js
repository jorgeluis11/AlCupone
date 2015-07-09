angular.module('starter.controllers', [])
.directive('link', [function () {
  return {
    restrict: 'A',
    scope:{},
    link: function (scope, element, attrs) {
      element.on('click',function(){
      window.open(attrs.url, '_system', 'location=yes');      
      });
    }
  };
}])

.controller('AppCtrl', ['$scope','$http','$ionicModal', '$timeout','$q',function($scope,$http, $ionicModal, $timeout, $q) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.settingsList = [];
  $scope.list = []
  $scope.noMoreItemsAvailable = false;

   //[
  //   { text: "gustazos", checked: true },
  //   { text: "groopanda", checked: true },
  //   { text: "oferta", checked: true },
  //   { text: "ofertones", checked: true },
  //   { text: "groupon", checked: true },
  //   { text: "peroquedescuentos", checked: true },
  //   { text: "kokigo", checked: true },
  //   { text: "prgoza", checked: true },
  //   { text: "puertoricolike", checked: true }
  // ];

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
  $scope.firstLoaded  = false;
  $scope.changePerspective = function(){
    $scope.perspective = !$scope.perspective;
  };

  $scope.loadMore = function() {
        $scope.list = ""
        for(list in $scope.settingsList){
          if ($scope.settingsList[list].checked === true) 
            $scope.list += $scope.settingsList[list].text+",";
        }

        console.log($scope.groupons)
        $http.get("https://gruponaso.herokuapp.com/",{
        // timeout: canceler.promise,
         params:{
            start:$scope.groupons.end,
            index:$scope.groupons.index,
            list:$scope.list
          }
          }).success(function(data)
          {
            for (var i = 0;  i < data.items.length; i++) {
              $scope.groupons.items.push(data.items[i]);
            };
            
            if (data.index ===$scope.groupons.index) 
             { 
              $scope.groupons.start = data.start ;
              $scope.groupons.end = data.start + 6 ;

             }else
             { 
              $scope.groupons.start = data.start;
              $scope.groupons.end = data.start + 6 ;
             }
            $scope.groupons.index = data.index;

            // $scope.noMoreItemsAvailable = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
          });
        // $scope.$broadcast('scroll.infiniteScrollComplete');


          // $http.get('/more-items').success(function(items) {
    //   useItems(items);
    //   $scope.$broadcast('scroll.infiniteScrollComplete');
    // });
  };

  // $scope.$on('$stateChangeSuccess', function() {
  //   $scope.loadMore();
  // });

  $scope.getList = function(){
    $scope.groupons = []
    $scope.list = ""
    for(list in $scope.settingsList){
      if ($scope.settingsList[list].checked === true) {
        $scope.list += $scope.settingsList[list].text+",";
      };
    }

        // var canceler = $q.defer();
        // canceler.resolve();  // Aborts the $http request if it isn't finished.

        $http.get("https://gruponaso.herokuapp.com/",{
        // timeout: canceler.promise,
         params:{
            start:0,
            index:0,
            list:$scope.list
          }
          }).success(function(data)
          {

            $scope.groupons = data;
            // $scope.noMoreItemsAvailable = false;
          });
  }

  // if ($scope.list === "") {
  //   $scope.list = ",";
  // };

$http.get("https://gruponaso.herokuapp.com/pages").success(function(data)
    {
      data.pages=shuffle(data.pages)
      $scope.list = data.pages;
      var dic = []
      for (var i = 0; i < data.pages.length; i++) {
        dic.push({text: data.pages[i], checked: true})
      };

        $scope.settingsList = dic;
        

        $http.get("https://gruponaso.herokuapp.com/",{
         params:{
            start:0,
            index:0,
            list:$scope.list.toString()
          }
          }).success(function(data)
          {
            $scope.groupons = data;
            $scope.firstLoaded = true;
            $scope.noMoreItemsAvailable = true;
          });
    });
    
   
  

  function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

    // $scope.getList();
}])

// .controller('GrouponsCtrl', ['$scope','$http', function($scope, $http) {
 

// }])

.controller('PlaylistCtrl', function($scope, $stateParams) {
})
