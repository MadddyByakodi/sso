angular.module('qui.hire')
  .directive('candidateStats', [
    function candidateStats() {
      return {
        restrict: 'EA',
        templateUrl: '/html/hire.candidate-stats.html',
        controllerAs: 'Stat',
        controller: [
          'APP',
          '$http',
          function Stat(APP, $http) {
            const vm = this;
            vm.own = { start: 0, rows: 10, docs: [], numFound: 0, q: '' };
            vm.following = { start: 0, rows: 10, docs: [], numFound: 0, q: '' };

            vm.getOwned = () => $http
              .get(
                `${APP.apiServer}/user/stats/candidate`,
                { params: { start: vm.own.start, rows: vm.own.rows, q: vm.own.q } }
              )
              .then(res => {
                vm.own.docs = res.data.docs;
                vm.own.numFound = res.data.numFound;
                vm.own.start = res.data.start;
              });

            function next(model, cb) {
              if (model.start + model.rows > model.numFound) return;
              const params = model;
              params.start += params.rows;
              cb();
            }

            function prev(model, cb) {
              if (model.start - model.rows < 0) return;
              const params = model;
              params.start -= params.rows;
              cb();
            }

            vm.own.prev = () => prev(vm.own, vm.getOwned);
            vm.own.next = () => next(vm.own, vm.getOwned);
            vm.following.prev = () => prev(vm.following, vm.getFollowing);
            vm.following.next = () => next(vm.following, vm.getFollowing);
            vm.getFollowing = () => $http
              .get(
                `${APP.apiServer}/user/stats/candidate`, {
                  params: {
                    following: true, start: vm.following.start,
                    rows: vm.following.rows, q: vm.following.q,
                  },
                }
              )
              .then(res => {
                vm.following.docs = res.data.docs;
                vm.following.numFound = res.data.numFound;
                vm.following.start = res.data.start;
              });

            vm.getOwned();
            vm.getFollowing();
          },
        ],
      };
    },
  ]);
