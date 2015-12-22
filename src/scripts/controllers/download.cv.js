angular.module('qui')
  .controller('DownloadCVController', [
    '$uibModalInstance',
    'ApplicantIds',
    'DownloadCV',
    function JobsCtrl($uibModalInstance, ApplicantIds, DownloadCV) {
      const vm = this;
      vm.concat = 'true'; // download cv type default to with CTC

      vm.ok = function ok() {
        if (!angular.isArray(ApplicantIds)) return;

        if (ApplicantIds.length === 1) {
          DownloadCV.getOne(ApplicantIds[0], {concat: vm.concat})
            .then(function downloadStarted() {
              $uibModalInstance.close(vm.concat);
            });
        }

        if (ApplicantIds.length > 1) {
          DownloadCV.get({id: ApplicantIds.join(','), concat: vm.concat})
            .then(function downloadStarted() {
              $uibModalInstance.close(vm.concat);
            });
        }
      };

      vm.cancel = function cancel() {
        $uibModalInstance.dismiss('cancel');
      };
    },
  ]);
