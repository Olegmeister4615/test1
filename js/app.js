angular.module('app',[])

.run(function($rootScope, sessionFactory){
    sessionFactory.newSession($rootScope);
})
/*

.run(function($rootScope, sessionFactory){
$rootScope.sessionId='loh';
$rootScope.sessionId=sessionFactory.newSession();
$rootScope.$watch('sessionId',function(newVal,old,$rootScope){
    $rootScope.sessionId=newVal;
    $rootScope.$digest();
})
setInterval(function($rootScope){
    console.log($rootScope.sessionId);
}, 1000);

})
*/