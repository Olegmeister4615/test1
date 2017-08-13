angular.module('app').controller('cardCtrl', function($scope,listFactory){
    this.clickPhone= function(event){
        angular.element(event.currentTarget).parent().toggleClass('open');
              
    };
    //создание телефона в карточке
    this.addPhone = function(contact){
        listFactory.addPhone(contact,this.newPhone);
        this.newPhone={};
    }
    //удаление телефонав карточке
    this.removePhone=function(contact,phone){
        listFactory.removePhone(contact,phone);
    }
});