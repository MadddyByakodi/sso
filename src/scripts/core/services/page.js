angular.module('qui.core')
  .factory('Page', [
    function Page() {
      let title = 'QuezX.com';
      return {
        title: function getTitle() {
          return title;
        },

        setTitle: function setTitle(newTitle) {
          title = `${newTitle} | QuezX`;
        },
      };
    },
  ]);
