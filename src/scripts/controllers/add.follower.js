angular.module('qui')
  .controller('AddFollowerController', [
    '$uibModalInstance',
    'FollowerData',
    'ApplicantId',
    'APP',
    '$window',
    'Session',
    'Followers',
    function JobsCtrl($uibModalInstance, FollowerData, ApplicantId, APP, $window, Session, Followers) {
      const vm = this;
     /* vm.concat = 'true'; // download cv type default to with CTC

      if (!angular.isArray(ApplicantIds)) return;
      const token = Session.getAccessToken();*/
     /* if (ApplicantIds.length === 1) {
        vm.downloadUrl =
          `${APP.apiServer}/quarc/applicant/${ApplicantIds[0]}/download?access_token=${token}`;
      }

      if (ApplicantIds.length > 1) {
        vm.downloadUrl =
          `${APP.apiServer}/quarc/applicant/download?access_token=${token}&id=${ApplicantIds.join(',')}`;
      }*/
      vm.FollowerData=FollowerData;
      vm.ApplicantId=ApplicantId;
      vm.newEmails = [];
      vm.addNewFollower =  function addNewFollower(){
        var curVal =  vm.emailTobeAdded;

        var found = vm.FollowerData.some(function (el) {
          return el.email_id === curVal;
        });

        var foundNew = vm.newEmails.some(function (el) {
          return el === curVal;
        });
        if (!found || !foundNew) { vm.newEmails.push(curVal); alert ("added")} else{
          alert("Already exists");

        }
      };
      vm.ok = function ok() {
        Followers
          .create(vm.newEmails, vm.ApplicantId)
          .then(function addedFollower(fresult) {
            // vm.data.follower = fresult.data;
            // console.log( vm.data);
            $uibModalInstance.close(true);
          });

      };

      vm.cancel = function cancel() {
        $uibModalInstance.dismiss('cancel');
      };
    },
  ]);
