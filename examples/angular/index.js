var search = void 0;
var products = [];

var app = angular.module('SearchPage', []);

app.service('JSONtoQueryString', function() {
  return function(json) {
    var querystring = '';
    for (key in json) {
      querystring += key + '=' + json[key] + '&';
    }

    return querystring.slice(0, querystring.length - 1);
  };
});

app.controller('searchController', function(
  $scope, $http, $location, JSONtoQueryString
) {
  $scope.search = $location.search().search;
  $scope.list = [];
  $scope.count = void 0;
  $scope.maxPage = void 0;
  $scope.limit = 10;

  // To simplify ui, we are going to make pages start at 1 instead of 0
  $scope.page = $location.search().page || 1;
  $scope.initList = function(page) {
    $location.search('search', $scope.search);
    $http.get(
      'http://api.vip.supplyhub.com:19000/products?' +
      JSONtoQueryString({count:1, search: $scope.search})
    ).success(function(response) {
      // To simplify ui, we are going to make pages start at 1 instead of 0
      $scope.maxPage = Math.ceil(response.count / $scope.limit);
      $scope.count = response.count;
    });

    $scope.setPage(page);
  };

  $scope.setPage = function(page) {
    $location.search('page', page);
    $scope.page = page;
    var p = $http.get(
      'http://api.vip.supplyhub.com:19000/products?' +
      JSONtoQueryString({
        search:$scope.search,
        limit:$scope.limit,

        // To simplify ui, we are going to make pages start at 1 instead of 0
        skip: ($scope.page - 1) * $scope.limit,
      })
    );
    p.then(function(response) {$scope.list = response.data;});

    p.catch(function(response) {
      $scope.error = 'We could not find what you were looking for';
    });

  };

  if ($scope.search) $scope.initList($scope.page);
});
