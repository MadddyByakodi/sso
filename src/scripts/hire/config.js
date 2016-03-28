angular.module('qui.hire')
  .config([
    '$provide',
    function setupAngularText($provide) {
      $provide.decorator(
        'taOptions',
        [
          '$delegate',
          function setTaOptions(taOptions) {
            taOptions.toolbar = [
                ['bold', 'italics', 'underline', 'redo', 'undo', 'clear'],
                ['p', 'ul', 'ol', 'pre', 'quote'],
                ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
                ['wordcount', 'charcount'],
            ];
            return taOptions; // whatever you return will be the taOptions
          },
        ]
      );
    },
  ]);
