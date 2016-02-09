angular.module('qui')
  .controller('AddFollowerController', [
    '$uibModalInstance',
    'FollowerData',
    'ApplicantId',
    'Followers',
    function AddFollowerCtrl($uibModalInstance, FollowerData, ApplicantId, Followers) {
      const vm = this;
      vm.FollowerData = FollowerData;
      vm.ApplicantId = ApplicantId;
      vm.newEmails = [];
      vm.addNewFollower = function addNewFollower() {
        const curVal = vm.emailTobeAdded;

        const found = vm.FollowerData.some(function alreadyExist(el) {
          return el.email_id === curVal;
        });

        const foundNew = vm.newEmails.some(function alreadyAdded(el) {
          return el === curVal;
        });

        if (!found || !foundNew) vm.newEmails.push(curVal);
      };

      vm.ok = function ok() {
        Followers
          .create(vm.newEmails, vm.ApplicantId)
          .then(function addedFollower() {
            $uibModalInstance.close(true);
          });
      };

      vm.cancel = function cancel() {
        $uibModalInstance.dismiss('cancel');
      };
    },
  ]);
