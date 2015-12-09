angular.module('qui')
  .controller('DownloadCVController', [
    '$uibModalInstance',
    'ApplicantIds',
    function JobsCtrl($uibModalInstance, ApplicantIds) {
      const vm = this;
      vm.type = 1; // download cv type default to with CTC

      vm.ok = function ok() {
        if (!angular.isArray(ApplicantIds)) return; // expect ApplicantIds to be array

        // TO BE IMPLEMENTED IN FUTURE
        // .get function returns url to download file from
        // DownloadCV.get(ApplicantIds, vm.type).then();
        $uibModalInstance.close(vm.type);
      };

      vm.cancel = function cancel() {
        $uibModalInstance.dismiss('cancel');
      };
    },
  ]);
