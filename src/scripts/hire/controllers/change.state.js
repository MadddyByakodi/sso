angular.module('qui.hire')
  .controller('ChangeStateController', [
    '$uibModalInstance',
    'User',
    'CURRENCY',
    'applicant',
    'stateId',
    'jobId',
    'ChangeState',
    'moment',
    'JobFollowers',
    function ChangeStateCtrl(
      $uibModalInstance, User, CURRENCY,
      applicant, stateId, jobId,
      ChangeState, moment, JobFollowers
    ) {
      const vm = this;
      vm.states = User.states;
      vm.applicant = applicant;
      vm.stateId = stateId;
      vm.currency = CURRENCY;
      vm.exData = {
        scheduled_on_time: moment()
          .startOf('day')
          .set('hour', 10)
          .toDate(),
      };

      vm.placeholder = function placeholder(selectedStateId) {
        switch (selectedStateId) {
          case 2:
            return 'Please provide reason for rejection';
          case 10:
            return 'Please provide CTC details and joining date in the above fields';
          case 19:
            return 'Please provide Interview type (TI/PI/VI) & suggested times';
          case 5:
          case 8:
          case 17:
            return 'Please call the candidate once if you are directly scheduling for interview';
          default:
            return 'Please Comment something ...';
        }
      };

      vm.JobFollowers = {
        all: '',
        getAll: () => JobFollowers.getAll(jobId)
          .then(r => (
            vm.JobFollowers.all = r.data.filter(f => f.user.id !== User.userinfo.id)
          )),
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
        if (vm.JobFollowers.all && !vm.data.is_visible) {
          vm.data.CtcVisibilities = vm.JobFollowers.all
            .filter(u => u.checkbox)
            .map(f => ({ user_id: f.user.id }));
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
