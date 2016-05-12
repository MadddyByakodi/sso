angular.module('qui.hire')
  .controller('ChangeStateController', [
    '$uibModalInstance',
    'User',
    'CURRENCY',
    'applicant',
    'state_id',
    'ChangeState',
    'moment',
    'Users',
    function ChangeStateCtrl(
      $uibModalInstance, User, CURRENCY, applicant, stateId, ChangeState, moment, Users
    ) {
      const vm = this;
      vm.states = User.states;
      vm.applicant = applicant;
      vm.stateId = stateId;
      vm.currency = CURRENCY;
      vm.today = new Date();
      vm.exData = {
        scheduled_on_time: moment()
          .startOf('day')
          .set('hour', 10)
          .toDate(),
      };

      vm.Users = {
        all: '',
        getAll: () => Users.getAll({ q: '' })
          .then(r => (vm.Users.all = r.data.items.filter(u => u.id !== User.userinfo.id))),
      };

      vm.setScheduledOn = function scheduledOnTimeChange() {
        const hour = moment(vm.exData.scheduled_on_time).get('hour');
        const minute = moment(vm.exData.scheduled_on_time).get('minute');
        vm.data.scheduled_on = moment(vm.exData.scheduled_on_date)
          .set('hour', hour)
          .set('minute', minute)
          .toDate();
      };

      vm.ok = function ok() {
        vm.data.CtcVisibilities = [];
        if (vm.Users.all && !vm.data.is_visible) {
          vm.data.CtcVisibilities = vm.Users.all
            .filter(u => u.checkbox)
            .map(u => ({ user_id: u.id }));
        }

        ChangeState.set(applicant.id, vm.data)
          .then(() => $uibModalInstance.close(vm.data))
          .catch(res => (vm.changeStateError = res.error));
      };

      vm.cancel = function cancel() {
        $uibModalInstance.dismiss('cancel');
      };
    },
  ]);
