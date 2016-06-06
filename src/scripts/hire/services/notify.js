angular.module('qui.hire')
  .factory('Notify', [
    '$http',
    '$q',
    'APP',
    'User',
    function Notify($http, $q, APP, User) {
      const notifyService = {};

      notifyService.get = (params) => $http
        .get(
          `${APP.qnotifyServer}/users/${User.userinfo.id}/notifications`,
          { params, ignoreAuthModule: true }
        );

      notifyService.count = () => $http
        .get(
          `${APP.qnotifyServer}/users/${User.userinfo.id}/notifications/count`,
          { ignoreAuthModule: true }
        );

      notifyService.read = (mongoId) => $http
        .post(
          `${APP.qnotifyServer}/notifications/${mongoId}/read`,
          { ignoreAuthModule: true }
        );

      notifyService.unread = (mongoId) => $http
        .post(
          `${APP.qnotifyServer}/notifications/${mongoId}/unread`,
          { ignoreAuthModule: true }
        );

      notifyService.readAll = () => $http
        .post(
          `${APP.qnotifyServer}/users/${User.userinfo.id}/notifications/read`,
          { ignoreAuthModule: true }
        );

      return notifyService;
    },
  ]);
