angular.module('qui.hire')
  .run([
    '$http',
    '$log',
    'Session',
    function webNotify($http, $log, Session) {
      if (!Session.isAuthenticated()) return;

      if ('serviceWorker' in navigator) {
        const webNofify = Session.read('webNofify') || {};
        const user = Session.read('userinfo');
        $log.info('Service Worker is supported');

        navigator.serviceWorker
          .register('sw.js')
          .then(() => navigator.serviceWorker.ready)
          .then(reg => {
            if (!webNofify.isSubscribed) subscribe(reg, user.id);
          })
          .catch(err => $log.error(':^(', err));
      }

      function subscribe(reg, userId) {
        reg.pushManager.subscribe({ userVisibleOnly: true })
        .then(sub => {
          const subIdArray = sub.endpoint.split('/');
          const subId = subIdArray[subIdArray.length - 1];
          return $http.post(
            'https://qnotify.quezx.com/api/subscriptions',
            { user_id: userId, subscription_id: subId }
          );
        })
        .then(res => Session.create('webNofify', { subscription: res.data, isSubscribed: true }))
        .catch(err => {
          $log.error(err);
          if (err.status === 409) {
            Session.create('webNofify', { subscription: err.responseText, isSubscribed: true });
          }
        });
      }
    },
  ]);
