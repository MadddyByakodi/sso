angular.module('qui.components')
  .directive('scrollToBottom', [
    '$timeout',
    function scrollToBottom($timeout) {
      return {
        scope: {
          scrollToBottom: '=',
        },
        link: function link(scope, elm) {
          const element = elm;
          scope.$watchCollection('scrollToBottom', changed => (changed ?
            $timeout(() => (element[0].scrollTop = element[0].scrollHeight), 0) :
            null
          ));
        },
      };
    },
  ]);
