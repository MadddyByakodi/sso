angular.module('qui')
  .controller('ApplicantCommentsController', [
    'ApplicantComments',
    '$stateParams',
    'User',
    function ApplicantCommentsController(ApplicantComments, $stateParams, User) {
      const vm = this;
      vm.loadApplicantComments = function loadApplicantComments() {
        vm.ui = {loading: true, scrollToBottom: false};
        ApplicantComments
          .get($stateParams.applicantId)
          .then(function gotJobComment(result) {
            vm.data = result.data;

            // data has been loaded
            vm.ui = {loading: false, scrollToBottom: true};
          });
      };

      vm.insert = function insertComment() {
        const comment = vm.post.comment;
        vm.ui = {loading: true, scrollToBottom: false};
        ApplicantComments
          .set($stateParams.applicantId, {comment: comment})
          .then(function insertedComment() {
            vm.post.comment = '';
            vm.data.push({
              name: User.userinfo.name,
              comment: comment,
              created_on: new Date().toISOString(),
            });

            // data has been loaded
            vm.ui = {loading: false, scrollToBottom: true};
          });
      };

      vm.loadApplicantComments();
    },
  ]);
