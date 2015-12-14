angular.module('qui')
  .controller('ChangeStateController', [
    '$uibModalInstance',
    'User',
    'CURRENCY',
    'applicant',
    'state_id',
    'ChangeState',
    function JobsCtrl($uibModalInstance, User, CURRENCY, applicant, stateId, ChangeState) {
      const vm = this;
      vm.states = User.states;
      vm.applicant = applicant;
      vm.stateId = stateId;
      vm.currency = CURRENCY;

      vm.ok = function ok() {
        ChangeState.set(applicant.id, vm.data)
          .then(function handleChangeState() {
            $uibModalInstance.close(vm.type);
          })
          .catch(function handleFailure(response) {
            vm.changeStateError = response.error;
          });
      };

      vm.cancel = function cancel() {
        $uibModalInstance.dismiss('cancel');
      };
    },
  ]);
