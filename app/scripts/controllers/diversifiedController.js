angular.module('markoApp').controller('DiversifiedPortfolioCtrl', function ($rootScope, $scope, $route) {
    $rootScope.activeTab = $route.current.activeTab;
    setHeights();
})
