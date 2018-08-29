class DuplicateCheckController {
  /* @ngInject */
  constructor($http, Session, $stateParams) {
    this.$http = $http;
    this.Session = Session;
    this.$stateParams = $stateParams;
  }

  $onInit() {
    this.user = this.Session.read('userinfo');
    this.duplicateCount = 0;
    this.data = {};
    this.list = [];
    this.ui = { lazyLoad: true, loading: false };
    this.params = {
      start: 0,
      rows: 10,
      fl: ['id', 'name', 'number', 'email'].join(','),
    };

    this.count();
    this.getTableData();
  }

  count() {
    this
      .$http
      .get('/clientDuplicateApplicant/count')
      .then(({ data }) => (this.duplicateCount = data));
  }

  getTableData(refresh) {
    if (refresh) {
      this.params.start = 0;
      this.ui.lazyLoad = true;
      this.list = [];
    }

    if (!this.ui.lazyLoad) return;
    this.ui = { lazyLoad: false, loading: true };

    this
      .$http
      .get('/clientDuplicateApplicant', { params: this.params })
      .then(({ data }) => {
        if (this.list.length) this.list = this.list.concat(data);
        else this.list = data;

        this.params.start = this.params.start + this.params.rows;
        this.ui.loading = false;
        this.ui.lazyLoad = angular
          .equals(this.list.length, this.params.start);
      })
      .catch(() => {
        if (!!refresh) this.list = [];
        this.ui.lazyLoad = false;
      });
  }

  uploadExcel() {
    this
      .$http
      .post('/clientDuplicateApplicant', this.data)
      .then(({ data: { url, failed, total } }) => {
        this.error = '';
        this.file = { url, failed, total };
        this.count();
      })
      .catch(({ data }) => (this.error = data.message
        || 'Something went wrong, please contact Quezx.com.'));
  }
}

export default DuplicateCheckController;
