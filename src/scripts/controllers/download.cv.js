angular.module('qui')
  .controller('DownloadCVController', [
    '$uibModalInstance',
    'ApplicantIds',
    'APP',
    '$window',
    'Session',
    function JobsCtrl($uibModalInstance, ApplicantIds, APP, $window, Session) {
      const vm = this;
      vm.concat = 'true'; // download cv type default to with CTC

      if (!angular.isArray(ApplicantIds)) return;
      const token = Session.getAccessToken();
      if (ApplicantIds.length === 1) {
        vm.downloadUrl =
          `${APP.apiServer}/quarc/applicant/${ApplicantIds[0]}/download?access_token=${token}`;
      }

      if (ApplicantIds.length > 1) {
        vm.downloadUrl =
          `${APP.apiServer}/quarc/applicant/download?access_token=${token}&id=${ApplicantIds.join(',')}`;
      }

      vm.ok = function ok() {
        $uibModalInstance.close(vm.concat);
      };

      vm.cancel = function cancel() {
        $uibModalInstance.dismiss('cancel');
      };
    },
  ]);
