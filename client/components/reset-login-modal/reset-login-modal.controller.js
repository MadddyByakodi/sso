class ResetLoginModalController {
  /* @ngInject */
  constructor($uibModalInstance, previousLoginDetails, GoogleAnalytics) {
    this.$uibModalInstance = $uibModalInstance;
    this.previousLoginDetails = previousLoginDetails;
    this.GoogleAnalytics = GoogleAnalytics;
  }

  $onInit() {

  }
}

export default ResetLoginModalController;
