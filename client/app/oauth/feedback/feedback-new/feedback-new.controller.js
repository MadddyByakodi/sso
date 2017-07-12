class FeedbackController {
  /* @ngInject */
  constructor($http, $stateParams) {
    this.$http = $http;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    this.data = [];

    this
      .$http
      .get(`/feedbacks/${this.$stateParams.id}/options`)
      .then(({ data: { data } }) => (this.data = data
        .map(x => Object.assign(x, {
          is_other: x.name.trim().toLowerCase() === 'other',
        }))));
  }

  ok() {
    const other = this.other;
    const userId = this.$stateParams.user_id;
    const FeedbackResponses = this.data
        .filter(r => r.checked)
        .map(({ id, is_other: isOther }) => Object
          .assign({ feedback_option_id: id }, isOther && { other }));

    this
      .$http
      .post(`/feedbacks/${this.$stateParams.id}/responses`, Object
      .assign({ user_id: userId }, FeedbackResponses))
      .then(() => {
        this.success = 'Feedback was submitted successfully.';
      })
      .catch(({ data }) => (this.error = data.error_description));
  }

  isOptionSelected() {
    return this.data.some(x => x.checked);
  }
}

export default FeedbackController;
