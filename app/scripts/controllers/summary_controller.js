angular.module('markoApp').controller('SummaryCtrl', function ($rootScope, $scope, $route) {
    $rootScope.activeTab = $route.current.activeTab;
    setHeights();
})
