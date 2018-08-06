class ResetLoginModalController {
  /* @ngInject */
  constructor($uibModalInstance, previousLoginDetails) {
    this.$uibModalInstance = $uibModalInstance;
    this.previousLoginDetails = previousLoginDetails;
  }

  $onInit() {

  }
}

export default ResetLoginModalController;
