angular.module('qui.hire')
  .controller('ApplicantCommentsController', [
    'ApplicantComments',
    '$stateParams',
    'User',
    '$scope',
    '$timeout',
    function ApplicantCommentsController(ApplicantComments, $stateParams, User, $scope, $timeout) {
      const vm = this;
      vm.data = [];
      vm.ui = { scrollToBottom: false };

      function scrollToBottom() {
        // require to scroll after ui update
        vm.ui.scrollToBottom = false;
        $timeout(() => vm.ui.scrollToBottom = true, 0);
      }

      vm.loadApplicantComments = function loadApplicantComments() {
        ApplicantComments
          .get($stateParams.applicantId)
          .then(function gotJobComment(result) {
            vm.data = result;

            // data has been loaded
            scrollToBottom();
          });
      };

      $scope.$on('ApplicantStateChangeSuccess', (ev, data) => {
        const comment = data;
        comment.created_at = new Date().toISOString();
        comment.body = comment.comments;
        comment.user = { name: User.userinfo.name };
        vm.data.push(comment);
        scrollToBottom();
      });

      vm.insert = function insertComment() {
        const comment = vm.post.comment;
        ApplicantComments
          .set($stateParams.applicantId, { comment: comment })
          .then(function insertedComment() {
            vm.post.comment = '';
            vm.data.push({
              user: { name: User.userinfo.name },
              body: comment,
              created_at: new Date().toISOString(),
            });

            // data has been loaded
            scrollToBottom();
          });
      };

      vm.loadApplicantComments();
    },
  ]);
