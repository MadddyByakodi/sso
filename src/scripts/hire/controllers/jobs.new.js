angular.module('qui.hire')
  .controller('NewJobController', [
    '$q',
    '$timeout',
    'Page',
    '$state',
    'Regions',
    'Degrees',
    'Institutes',
    'Industries',
    'Employers',
    'Skills',
    'Funcs',
    'moment',
    'Jobs',
    '$uibModal',
    function NewJobCtrl(
      $q, $timeout, Page, $state, Regions, Degrees, Institutes, Industries, Employers, Skills,
      Funcs, moment, Jobs, $uibModal
    ) {
      const vm = this;
      vm.buckets = ['Pending Feedback', 'Shortlisted', 'Rejected', 'All', 'Interview'];
      const title = $state.params.jobId ? 'Edit Position' : 'Post New Position';
      Page.setTitle(title);
      vm.data = {
        days_per_week: 5,
        email: '',
        new_job: 1,
        start_work_time: '9:00 AM',
        end_work_time: '5:00 PM',
        job_nature: '1',
        preferred_genders: 'No Preference',
        direct_line_up: 0,
        whitelist: 0,
        JobSkills: [],
        JobsDegrees: [],
        JobsInstitutes: [],
        JobsIndustries: [],
        JobsEmployers: [],
      };

      function generateInterval(startHour) {
        const interval = [];
        for (let i = 0; i < 48; i++) {
          interval.push(moment()
            .startOf('day')
            .add(startHour, 'hour')
            .add(i * 30, 'minute')
            .format('h:mm A')
          );
        }

        return interval;
      }

      vm.ui = {
        days_per_week: [1, 2, 3, 4, 5, 6, 7],
        start_work_time: generateInterval(7),
        end_work_time: generateInterval(15),
      };
      vm.Regions = {
        select: function selectRegion($item) {
          vm.data.region_id = $item.id;
        },

        get: function getRegions(search) {
          return Regions
            .get({ q: search })
            .then(res => res.items);
        },

        noResults: false,
        loadingRegions: false,
      };

      vm.Degrees = {
        select: function selectDegree($item) {
          vm.Degrees.model = '';
          vm.data.JobsDegrees.push({
            degree_id: $item.id,
            name: $item.name,
          });
        },

        get: function getDegrees(search) {
          return Degrees
            .get({ q: search })
            .then(res => res
              .items
              .filter(item => !vm.data
                .JobsDegrees
                .find(x => item.id === x.degree_id)
              )
            );
        },

        noResults: false,
        loadingRegions: false,
      };

      vm.Institutes = {
        select: function selectInstitute($item) {
          vm.Institutes.model = '';
          vm.data.JobsInstitutes.push({
            institute_id: $item.id,
            name: $item.name,
          });
        },

        get: function getInstitutes(search) {
          return Institutes
            .get({ q: search })
            .then(res => res
              .items
              .filter(item => !vm.data
                .JobsInstitutes
                .find(x => item.id === x.institute_id)
              )
            );
        },

        noResults: false,
        loadingRegions: false,
      };

      vm.Industries = {
        select: function selectIndustry(industryId) {
          if (industryId === 0) return;

          // Removes industry from list
          angular.forEach(vm.Industries.list, (value, key) => {
            if (value.id === industryId) {
              const $item = vm.Industries.list.splice(key, 1)[0];
              vm.data.JobsIndustries.push({
                industry_id: $item.id,
                name: $item.name,
              });
            }
          });

          vm.Industries.model = '0';
        },

        addToList: function addToList(item) {
          vm.Industries.list.push({
            id: item.industry_id,
            name: item.name,
          });
        },

        noResults: false,
        loadingRegions: false,
      };

      vm.Employers = {
        select: function selectEmployer($item) {
          vm.Employers.model = '';
          vm.data.JobsEmployers.push({
            employer_id: $item.id,
            name: $item.name,
          });
        },

        get: function getEmployer(search) {
          return Employers
            .get({ q: search })
            .then(res => res
              .items
              .filter(item => !vm.data
                .JobsEmployers
                .find(x => item.id === x.employer_id)
              )
            );
        },

        noResults: false,
        loadingRegions: false,
      };

      vm.Skills = {
        selectRequired: function selectSkill($item) {
          vm.Skills.modelRequired = '';
          vm.data.JobSkills.push({
            skill_id: $item.id,
            isRequired: 1,
            name: $item.name,
          });
        },

        selectOptional: function selectSkill($item) {
          vm.Skills.modelOptional = '';
          vm.data.JobSkills.push({
            skill_id: $item.id,
            isRequired: 0,
            name: $item.name,
          });
        },

        get: function getSkill(search) {
          return Skills
            .get({ q: search })
            .then(res => res
              .items
              .filter(item => !vm.data
                .JobSkills
                .find(x => item.id === x.skill_id)
              )
            );
        },

        create: function createSkill(skill, required) {
          return Skills
            .create({ name: skill })
            .then(response => {
              const $item = {
                id: response.id,
                name: response.name,
              };

              if (required) {
                return vm.Skills.selectRequired($item);
              }

              return vm.Skills.selectOptional($item);
            });
        },

        noResults: false,
        loadingRegions: false,
      };

      vm.confirmDirectLineUp = function confirmDirectLineUp() {
        const modalInstance = $uibModal.open({
          controller: [
            '$uibModalInstance',
            '$scope',
            function ConfirmDirectLineUpCtrl($uibModalInstance, $scope) {
              const viewModel = $scope;
              viewModel.directLineup = function directLineup(data) {
                $uibModalInstance.close(data);
              };
            },
          ],
          size: 'sm',
          backdrop: 'static',
          templateUrl: 'html/modal.confirm-direct-line-up.html',
        });

        modalInstance.result.then(data => (vm.data.direct_line_up = data));
      };

      $q.all([
        Funcs.get({ q: '', rows: 20 }),
        Industries.get({ q: '', rows: 30 }),
        Jobs.payment(),
      ])
      .then(([func, industry, payment]) => {
        if (payment.status === 204) vm.agreementExpired = true;
        vm.Funcs = func.items;
        vm.Industries.list = industry.items;
        vm.Payment = payment.data;
        vm.Payment.min = Math.min(...(vm.Payment.items || []).map(x => x.start_range)) || 0;
        vm.Payment.max = Math.max(...(vm.Payment.items || []).map(x => x.end_range)) || 10000;

        // Load Data to edit JD
        if ($state.params.jobId) {
          Jobs
          .getByIdRaw($state.params.jobId)
          .then(response => {
            const res = response;
            const industries = res.data.JobsIndustries;
            res.data.JobsIndustries = []; // clean industries as array

            vm.Regions.model = res.data.region; // set region model value
            delete res.data.region; // remove region from response

            vm.data = res.data;

            // Add industries
            industries.map(i => vm.Industries.select(i.industry_id));
          });
        }
      });

      vm.create = function createJob() {
        const saveJob = $state.params.jobId ?
          Jobs.update($state.params.jobId, vm.data) :
          Jobs.create(vm.data);

        saveJob
          .then(res => {
            // Wait for solr to index data
            $timeout(() => {
              $state.go('app.jobs.view', { jobId: res.data.id });
            }, 1000);
          });
      };
    },
  ]);
