import controller from './reset-login-modal.controller';
import template from './reset-login-modal.pug';

class ResetLoginModalService {
  /* @ngInject */
  constructor($uibModal) {
    this.$uibModal = $uibModal;
  }

  open(previousLoginDetails) {
    return this
      .$uibModal
      .open({
        size: 'md',
        animation: true,
        template,
        controller,
        controllerAs: '$ctrl',
        resolve: {
          previousLoginDetails,
        },
      })
      .result;
  }
}

export default ResetLoginModalService;
