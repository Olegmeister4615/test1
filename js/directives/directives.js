angular.module('app').directive('closeEditing',function(){
    //директива закрывает редактирование номера в карточке
    //если нажать ESC
    var KEYS={
        ESCAPE:27
    }
    return{
        restrict:'A',
        scope:{
            isEditing:'='
        },
        link:function(scope,element,attrs){
            console.log('directive runing');
            element.on('keyup',function(e){
                if(_.isEqual(e.keyCode, KEYS.ESCAPE)){
                    scope.isEditing=false;
                    scope.$apply();
                }
            })
        }
    };
});