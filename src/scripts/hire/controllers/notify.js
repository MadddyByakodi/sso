angular.module('qui.hire')
  .controller('NotifyController', [
    'Notify',
    'Page',
    'moment',
    '$state',
    function NotifyCtrl(Notify, Page, moment, $state) {
      const vm = this;
      Page.setTitle('Notifications');
      vm.notes = []; // collection of notifications
      vm.ui = { lazyLoad: true, loading: false }; // ui states
      vm.params = { offset: 0, limit: 20 };

      vm.read = (note, appNotifyData) => Notify.read(note._id).then(() => {
        const notification = note;
        const notifyData = appNotifyData;
        notification.read = true;
        notifyData.count--;
      });

      vm.unread = (note, appNotifyData) => Notify.unread(note._id).then(() => {
        const notification = note;
        const notifyData = appNotifyData;
        notification.read = false;
        notifyData.count++;
      });

      vm.readAll = () => Notify.readAll().then(() => $state.reload());

      vm.load = function load() {
        if (!vm.ui.lazyLoad) return; // if no more jobs to get
        vm.ui = { lazyLoad: false, loading: true };

        Notify
          .get(vm.params)
          .then(result => {
            angular.forEach(result.data, data => {
              const note = data;
              note.timeago = moment(note.create_at).fromNow();
              vm.notes.push(note);
            });

            // data has been loaded
            vm.ui.loading = false;

            // check for returned results count and set lazy loadLoad false if less
            vm.ui.lazyLoad = angular.equals(result.data.length, vm.params.limit);

            // increment offset for next loading of results
            return (vm.params.offset = vm.params.offset + vm.params.limit);
          });
      };

      vm.load();
    },
  ]);
