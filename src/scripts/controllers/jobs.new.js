angular.module('qui')
  .controller('NewJobController', [
    'Regions',
    'Degrees',
    'Institutes',
    'Industries',
    'Employers',
    'Skills',
    'Funcs',
    'moment',
    'Jobs',
    function JobsManageCtrl(Regions, Degrees, Institutes, Industries, Employers, Skills, Funcs, moment, Jobs) {
      const vm = this;
      vm.data = {
        days_per_week: '5',
        email: '',
        start_work_time: '9:00 AM',
        end_work_time: '5:00 PM',
        job_nature: '1',
        preferred_genders: 'No Preference',
        direct_line_up: '0',
        whitelist: '0',
        func_id: '0',
        JobSkills: [],
        JobsDegrees: [],
        JobsInstitutes: [],
        JobsIndustries: [],
        JobsEmployers: [],
      };

      vm.ui = {
        days_per_week: [1, 2, 3, 4, 5, 6, 7],
        start_work_time: (function intervalGenerator() {
          const interval = [];
          for (let i = 0; i < 48; i++) {
            interval.push(moment().startOf('day').add(7, 'hour').add(i * 30, 'minute').format('h:mm A'));
          }

          return interval;
        })(),

        end_work_time: (function intervalGenerator() {
          const interval = [];
          for (let i = 0; i < 48; i++) {
            interval.push(moment().startOf('day').add(15, 'hour').add(i * 30, 'minute').format('h:mm A'));
          }

          return interval;
        })(),
      };
      vm.Regions = {
        select: function selectRegion($item) {
          vm.data.region_id = $item.id;
        },

        get: function getRegions(search) {
          return Regions
            .get({region: search})
            .then(function gotRegions(response) {
              return response.data.map(function iterate(value) {
                return value;
              });
            });
        },

        noResults: false,
        loadingRegions: false,
      };

      vm.Degrees = {
        select: function selectDegree($item) {
          vm.Degrees.model = '';
          vm.data.JobsDegrees.push({
            degree_id: $item.id,
            degree: $item.degree,
          });
        },

        get: function getDegrees(search) {
          return Degrees
            .get({degree: search})
            .then(function gotDegrees(response) {
              return response.data.map(function iterate(value) {
                return value;
              });
            });
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
            .get({institute: search})
            .then(function gotInstitutes(response) {
              return response.data.map(function iterate(value) {
                return value;
              });
            });
        },

        noResults: false,
        loadingRegions: false,
      };

      vm.Industries = {
        select: function selectIndustry($item) {
          vm.Industries.model = '';
          vm.data.JobsIndustries.push({
            industry_id: $item.id,
            name: $item.name,
          });
        },

        get: function getIndustries(search) {
          return Industries
            .get({industry: search})
            .then(function gotIndustries(response) {
              return response.data.map(function iterate(value) {
                return value;
              });
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
            .get({employer: search})
            .then(function gotEmployer(response) {
              return response.data.map(function iterate(value) {
                return value;
              });
            });
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
            .get({skill: search})
            .then(function gotSkill(response) {
              return response.data.map(function iterate(value) {
                return value;
              });
            });
        },

        noResults: false,
        loadingRegions: false,
      };

      Funcs
        .get({func: ''})
        .then(function gotFuncs(response) {
          vm.Funcs = response.data;
        });

      vm.create = function createJob() {
        Jobs
          .create(vm.data)
          .then(function jobCreated() {
            // job Saved handle next action
            // alert('posted');
          });
      };
    },
  ]);
