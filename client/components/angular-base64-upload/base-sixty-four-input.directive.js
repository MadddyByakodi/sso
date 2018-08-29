/* @ngInject */
function baseSixtyFourInput($window, $q) {
  const isolateScope = {
    onChange: '&',
    onAfterValidate: '&',
    parser: '&',
  };

  const FILE_READER_EVENTS = [
    'onabort', 'onerror', 'onloadstart',
    'onloadend', 'onprogress', 'onload',
  ];
  for (let i = FILE_READER_EVENTS.length - 1; i >= 0; i--) {
    const e = FILE_READER_EVENTS[i];
    isolateScope[e] = '&';
  }

  return {
    restrict: 'A',
    scope: isolateScope,
    require: '^ngModel',
    link: (data, element, attrs, model) => {
      const scope = data;
      const elem = element;
      const ngModel = model;
      if (!ngModel) return;

      let rawFiles = [];
      let fileObjects = [];

      elem.on('change', (e) => {
        if (!e.target.files.length) return;

        fileObjects = [];
        fileObjects = angular.copy(fileObjects);
        rawFiles = e.target.files;
        readFiles();
        onChange(e);
        onAfterValidate(e);
      });

      function readFiles() {
        for (let i = rawFiles.length - 1; i >= 0; i--) {
          const reader = new $window.FileReader();
          const file = rawFiles[i];
          const fileObject = {};
          const promises = [];

          fileObject.filetype = file.type;
          fileObject.filename = file.name;
          fileObject.filesize = file.size;
          rawFiles[i].deferredObj = $q.defer();
          promises.push(rawFiles[i].deferredObj.promise);
          $q.all(promises).then(setViewValue);
          attachEventHandlers(reader, file, fileObject);
          reader.readAsArrayBuffer(file);
        }
      }

      function onChange(e) {
        if (attrs.onChange) scope.onChange()(e, rawFiles);
      }

      function onAfterValidate(e) {
        if (attrs.onAfterValidate) {
          const promises = [];
          for (let i = rawFiles.length - 1; i >= 0; i--) {
            promises.push(rawFiles[i].deferredObj.promise);
          }
          $q.all(promises).then(() => {
            scope.onAfterValidate()(e, fileObjects, rawFiles);
          });
        }
      }

      function attachEventHandlers(fReader, file, fileObject) {
        const reader = fReader;
        for (let i = FILE_READER_EVENTS.length - 1; i >= 0; i--) {
          const e = FILE_READER_EVENTS[i];
          if (attrs[e] && e !== 'onload') {
            attachHandlerForEvent(e, scope[e], reader, file, fileObject);
          }
        }

        reader.onload = readerOnLoad(reader, file, fileObject);
      }

      function attachHandlerForEvent(eventName, handler, fReader, file, fileObject) {
        const reader = fReader;

        reader[eventName] = (e) => {
          handler()(e, fReader, file, rawFiles, fileObjects, fileObject);
        };
      }

      function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return $window.btoa(binary);
      }

      function readerOnLoad(fReader, file, filesObj) {
        return (e) => {
          const buffer = e.target.result;
          const fileObject = filesObj;
          let promise;

          fileObject.base64 = arrayBufferToBase64(buffer);

          if (attrs.parser) {
            promise = $q.when(scope.parser()(file, fileObject));
          } else promise = $q.when(fileObject);

          promise.then((fileObj) => {
            fileObjects.push(fileObj);
            file.deferredObj.resolve();
          });

          if (attrs.onload) {
            scope.onload()(e, fReader, file, rawFiles, fileObjects, fileObject);
          }
        };
      }

      function setViewValue() {
        const newVal = attrs.multiple ? fileObjects : fileObjects[0];
        ngModel.$setViewValue(newVal);
        maxsize(newVal);
        minsize(newVal);
        maxnum(newVal);
        minnum(newVal);
        accept(newVal);
      }

      ngModel.$isEmpty = val => (!val || (angular.isArray(val) ? val.length === 0 : !val.base64));

      scope.clearInput = () => {
        elem[0].value = '';
      };

      scope.$watch(() => (ngModel.$viewValue), (val, oldVal) => {
        if (ngModel.$isEmpty(oldVal)) return;
        if (ngModel.$isEmpty(val)) scope.clearInput();
      });

      function maxnum(val) {
        if (attrs.maxnum && attrs.multiple && val) {
          const valid = val.length <= parseInt(attrs.maxnum, 10);
          ngModel.$setValidity('maxnum', valid);
        }
        return val;
      }

      function minnum(val) {
        if (attrs.minnum && attrs.multiple && val) {
          const valid = val.length >= parseInt(attrs.minnum, 10);
          ngModel.$setValidity('minnum', valid);
        }

        return val;
      }

      function maxsize(val) {
        let valid = true;

        if (attrs.maxsize && val) {
          const max = parseFloat(attrs.maxsize) * 1000;

          if (attrs.multiple) {
            for (let i = 0; i < val.length; i++) {
              const file = val[i];
              if (file.filesize > max) {
                valid = false;
                break;
              }
            }
          } else valid = val.filesize <= max;
          ngModel.$setValidity('maxsize', valid);
        }

        return val;
      }

      function minsize(val) {
        let valid = true;
        const min = parseFloat(attrs.minsize) * 1000;

        if (attrs.minsize && val) {
          if (attrs.multiple) {
            for (let i = 0; i < val.length; i++) {
              const file = val[i];
              if (file.filesize < min) {
                valid = false;
                break;
              }
            }
          } else valid = val.filesize >= min;
          ngModel.$setValidity('minsize', valid);
        }

        return val;
      }

      function accept(val) {
        let valid = true;
        let regExp;
        let exp;
        let fileExt;
        if (attrs.accept) {
          exp = attrs.accept.trim()
            .replace(/[,\s]+/gi, '|')
            .replace(/\./g, '\\.')
            .replace(/\/\*/g, '/.*');
          regExp = new RegExp(exp);
        }

        if (attrs.accept && val) {
          if (attrs.multiple) {
            for (let i = 0; i < val.length; i++) {
              const file = val[i];
              fileExt = `.${file.filename.split('.').pop()}`;
              valid = regExp.test(file.filetype) || regExp.test(fileExt);

              if (!valid) break;
            }
          } else {
            fileExt = `.${val.filename.split('.').pop()}`;
            valid = regExp.test(val.filetype) || regExp.test(fileExt);
          }
          ngModel.$setValidity('accept', valid);
        }

        return val;
      }
    },
  };
}

export default baseSixtyFourInput;
