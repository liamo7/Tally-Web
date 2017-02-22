(function() {
  'use strict';

  angular
    .module('tally')
    .controller('RoomCreateController', RoomCreateController);

  /** @ngInject */
  function RoomCreateController($scope, $stateParams, firebaseService, $firebaseArray, authenticationService) {
    var vm = this;

    $scope.creation = $stateParams.roomID === undefined;
    $scope.name = '';
    $scope.code = '';

    vm.createdRoom = null;
    vm.roomKey = null;

    if(!$scope.creation) {
      showDetails();
    }

    function showDetails() {
      console.log($stateParams.room);
      $scope.name = $stateParams.room.name;
      $scope.code = $stateParams.room.code;
      $scope.studentList = $stateParams.room.studentList;
    }

    vm.onSubmitButtonClicked = function() {
      if($scope.creation) {
        createRoom();
      } else {
        updateRoom();
      }
    }

    function updateRoom() {
      vm.updatedRoom = $stateParams.room;

      vm.updatedRoom.id = $stateParams.roomID;

      vm.updatedRoom.name = $scope.name;
      vm.updatedRoom.code = $scope.code;
      vm.updatedRoom.studentList = handleStudentList();

      if(vm.updatedRoom.studentList != null) {
        enrollUsersInRoom(vm.updatedRoom);
      }
    }

    function handleStudentList() {
      // update the student list
      var strippedList = '';
      console.log($scope.studentList);
      if($scope.studentList != undefined) {
        // TODO validate that they are infact email addresses that are split
        strippedList = $scope.studentList.split(/[\s,;]+/);
        return strippedList;
      }
      return null;
    }

    function createRoom() {

      var userID = authenticationService.getCurrentUser().uid;

        vm.createdRoom = {
          name: $scope.name,
          code: $scope.code,
          creator: userID,
          dateCreated: Date.now(),
          dateLastModified: Date.now()
        };

        vm.createdRoom.studentList = handleStudentList();

        console.log(vm.createdRoom);

        // pushes new entry to 'rooms' and returns the generated key
        vm.roomKey = firebaseService.getRoomRef().push(vm.createdRoom).key;
        vm.createdRoom.id = vm.roomKey;
        firebaseService.getUserCreatedRoomRef().child('/' + userID).child('/' + vm.roomKey).set(vm.createdRoom);

        if(vm.createdRoom.studentList != null) {
          enrollUsersInRoom(vm.createdRoom);
        }

    }

    function enrollUsersInRoom(room) {
      validateUserList(room.studentList).then(function(validUsers) {
        enrollUsers(validUsers, room);
      });
    }

    function validateUserList(studentList) {
      var validUsers = [];
      return firebaseService.getUserRef().once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var email = childSnapshot.child('/email').val();
          if(studentList.indexOf(email) > -1) {
            validUsers.push(childSnapshot.key);
          }
        });
        return validUsers;
      });
    }

    function enrollUsers(validUsers, room) {
      for(var i=0; i<validUsers.length; i++) {
        enrollUser(validUsers[i], room);
      }
    }

    function enrollUser(user, room) {
      delete room.$$hashkey;
      console.log(room);
      console.log(user);
      firebaseService.getUserRoomRef()
        .child('/' + user)
        .child('/' + room.id)
        .update(room);

        console.log("Update");
    }

    function validate() {
      if($scope.name === '' || $scope.code === '') {
        // TODO toast
        return false;
      }
      return true;
    }
  }
})();
