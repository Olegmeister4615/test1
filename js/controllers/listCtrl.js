angular.module('app').controller('listCtrl',function($scope,listFactory){
    this.newCont={};
    this.checkedArray=[];
    //событие запцскает загрузку контактов
    $scope.$on('session:geted',()=>{
        this.loadContacts($scope);
        
    });
    //загрузка в контроллер контактов
    $scope.$on('contacts:loaded',()=>{
        console.log('!!');
        this.contacts=listFactory.getContacts();
    })
    //загрузка в контроллер департаментов
    $scope.$on('deps:loaded',()=>{
        console.log('!!');
        this.deps=listFactory.getDeps();
    })
    //получение контактов с Api
    this.loadContacts= function($scope){
        
        listFactory.loadContacts($scope)
    }
    //создание контакта 
    //на основе объекта newCont из модальной формы
    this.addContact = function(){
        listFactory.addContact($scope,this.newCont);
        this.newCont={};
        angular.element(document.querySelector(".close")).trigger('click');
    }
    //обработчик чекбокса для удаления контакта
    //записывает id контакта или удаляет id из массива checkedArray
    //если массив checkedArray пуст, то блокирует кнопку "удалить"
    this.delCheckboxChange = function($event){
        var elem = angular.element($event.target)[0];
        if(elem.checked){
           this.checkedArray.push(elem.value);
        }
        else{
           var i =  _.indexOf(this.checkedArray, elem.value)
           this.checkedArray.splice(i, 1); 
        }
        console.log('checkedArray', this.checkedArray);
        var elem= angular.element(document.querySelector(".delete"));
        if(!this.checkedArray.length==0){
            elem.removeAttr('disabled');
        }
        else{
            elem.attr('disabled','true');
        }
    }
    //удаляет контакты указанные в checkedArray
    this.removeContacts=function(){
        listFactory.removeContacts(this.checkedArray);
        this.checkedArray=[];
    }


})