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

app.service('QueryStringtoJSON', function() {
  return function(querystring) {
    if (!querystring || querystring === '') return {};
    return querystring.split('&').reduce(function(obj, param) {
      param = param.split('=');
      obj[param[0]] = param[1];
      return obj;
    }, {});
  };
});

(function() {

app.controller('searchController', function(
  $scope, $http, $location, JSONtoQueryString, QueryStringtoJSON
) {

  $scope.reset = function() {
    $scope.search = '';
    $scope.list = [];
    $scope.count = void 0;
    $scope.maxPage = void 0;
    $scope.limit = 10;
  };

  $scope.reset();

  $scope.$on('$locationChangeSuccess', function(event, newUrl) {
    console.log(newUrl);
    var params = QueryStringtoJSON(newUrl.split('?')[1]);
    if (!params.search) {
      return $scope.reset();
    }

    $scope.page = params.page;
    $scope.search = params.search;
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
  });

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
  };

  if ($location.search().search) {
    $scope.search = $location.search().search;
    $scope.initList($scope.page);
  }
});

})();
