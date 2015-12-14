angular.module('qui')
  .controller('ChangeStateController', [
    '$uibModalInstance',
    'User',
    'CURRENCY',
    'applicant',
    'state_id',
    'ChangeState',
    'moment',
    function JobsCtrl($uibModalInstance, User, CURRENCY, applicant, stateId, ChangeState, moment) {
      const vm = this;
      vm.states = User.states;
      vm.applicant = applicant;
      vm.stateId = stateId;
      vm.currency = CURRENCY;
      vm.today = new Date();

      vm.setScheduledOn = function scheduledOnTimeChange() {
        const hour = moment(vm.exData.scheduled_on_time).get('hour');
        const minute = moment(vm.exData.scheduled_on_time).get('minute');
        vm.data.scheduled_on = moment(vm.exData.scheduled_on_date)
          .set('hour', hour)
          .set('minute', minute)
          .set('second', 0)
          .set('millisecond', 0);
      };

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
