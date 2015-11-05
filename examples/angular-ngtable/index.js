var app = angular.module('SearchPage', ['ngTable']);

app.service('JSONtoQueryString', function() {
  return function(json) {
    var querystring = '';
    for (key in json) {
      querystring += key + '=' + json[key] + '&';
    }

    return querystring.slice(0, querystring.length - 1);
  };
});

(function() {

  app.controller('searchController', function(
    $scope, $http, $location, JSONtoQueryString, NgTableParams
  ) {
    $scope.search = $location.search().search;
    $scope.list = [];

    this.tableParams = new NgTableParams({
      page: 1, // show first page
      count: 10, // count per page
    });
    var _this = this;

    // To simplify ui, we are going to make pages start at 1 instead of 0
    $scope.initList = function() {
      $location.search('search', $scope.search);

      var p = $http.get(
        'http://api.vip.supplyhub.com:19000/products?' +
        JSONtoQueryString({search:$scope.search})
      );
      p.then(function(response) {
        console.log('initializing ngtable');
        _this.tableParams.settings({
          dataset: response.data.map(function(item) {
            return {
              upc: item.product.upc,
              productName: item.product.name,
              brandName: item.brand.name,
              description: item.product.invoiceDescription,
              specifiction: item.product.specificationSheetUrl,
            };
          }),
        });
        console.log(response.data);
      });

      p.catch(function(response) {
        $scope.error = 'We could not find what you were looking for';
      });
    };

    if ($scope.search) $scope.initList();
  });
})();

(function() {
  'use strict';

  angular.module('SearchPage').run(configureDefaults);
  configureDefaults.$inject = ['ngTableDefaults'];

  function configureDefaults(ngTableDefaults) {
    ngTableDefaults.params.count = 5;
    ngTableDefaults.settings.counts = [];
  }
})();
