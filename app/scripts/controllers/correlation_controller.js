angular.module('markoApp').controller('CorrelationCtrl', function ($rootScope, $scope, $route) {
    $rootScope.activeTab = $route.current.activeTab;
    console.log("hi");
    setHeights();
})