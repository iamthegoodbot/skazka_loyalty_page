(function () {

  angular.module('widgets.actions', [])

    .directive('sailplayMagicActions', function (MAGIC_CONFIG, tools, $location, $timeout, QuizService, SailPlay, SailPlayApi) {

      return {

        restrict: "E",
        replace: true,
        scope: {
          _config: '=?config'
        },
        templateUrl: '/html/core/widgets/actions.html',
        link: function (scope, elm, attrs) {

          scope._tools = MAGIC_CONFIG.tools;

          scope.action_selected = false;
          scope.action_custom_selected = false;


          // TODO : must be transfer from here!!! to single directive
          // FOR QUIZ
          scope.quiz = {
            show: false,
            data: null,
            step: 1
          };

          var _default = {
            tags: [],
            vars: {}
          };

          var _models = {
            radio: null,
            checkbox: {},
            variable: null
          };


          scope.models = angular.copy(_models);

          scope.data = angular.copy(_default);

          scope.open_quiz = function (quiz) {

            scope.quiz.step = 1;
            scope.quiz.data = angular.copy(quiz);
            scope.quiz.show = true;

            scope.models = angular.copy(_models);
            scope.data = angular.copy(_default);
            scope.data.tags.push(scope.quiz.data.tag);

          };

          scope.quiz_list = MAGIC_CONFIG && MAGIC_CONFIG.data && MAGIC_CONFIG.data.quiz;

          scope.sending = false;

          scope.getCurrentTest = function () {
            return scope.quiz.data.data[(scope.quiz.step - 1) || 0] || null;
          };

          scope.prev = function () {
            scope.quiz.step = scope.quiz.step == 1 ? scope.quiz.step : scope.quiz.step - 1;
          };

          scope.needToShowVariable = function () {
            var tag = scope.getCurrentTest().answers.filter(function (item) {
              return item.my_version
            })[0];
            return tag ? scope.data.tags.indexOf(tag.tag) != -1 : null
          };

          scope.canPressNext = function () {

            var can = 0;

            var tags = scope.getCurrentTest().answers.map(function (item) {
              return item.tag
            });

            tags.forEach(function (item) {

              var index = scope.data.tags.indexOf(item);

              if (index != -1 && (!item.my_version || item.my_version && scope.models.variable)) {
                can++;
              }

            });

            return can;

          };

          scope.next = function () {

            if (!scope.canPressNext() || scope.sending) return;

            var tag = scope.getCurrentTest().answers.filter(function (item) {
              return item.my_version
            })[0];

            if (tag && scope.data.tags.indexOf(tag.tag) != -1) {
              scope.data.vars[tag.my_version] = scope.models.variable
            }
            if (scope.quiz.step == scope.quiz.data.data.length) {
              scope.sending = true;
              QuizService.addTags(scope.data, function (res) {

                scope.$apply(function () {

                  scope.quiz = {
                    show: false,
                    data: null,
                    step: 1
                  };


                  scope.models = angular.copy(_models);
                  scope.data = angular.copy(_default);

                  scope.sending = false;

                });

              });
              return;
            }
            scope.quiz.step = scope.quiz.step < scope.quiz.data.data.length ? scope.quiz.step + 1 : scope.quiz.step;
          };

          scope.change = function (question, test) {

            if (!question || !test) return;

            var filter = test.answers.map(function (item) {
              return item.tag
            });

            if (test.type == 'one') {

              filter.forEach(function (item) {

                var index = scope.data.tags.indexOf(item);

                if (index == -1 && item == question.tag) {
                  scope.data.tags.push(item);
                } else {
                  scope.data.tags.splice(index, 1);
                }

              });

            } else if (test.type == 'many') {
              removeTag(question.tag);
            }

            function removeTag(tag) {

              var index = scope.data.tags.indexOf(tag);

              if (index == -1) {
                scope.data.tags.push(tag);
              } else {
                scope.data.tags.splice(index, 1);
              }

            }

          };

          scope.check = function (question) {
            return question.tag ? scope.data.tags.indexOf(question.tag) != -1 : false
          };

          // END OF QUIZ

          scope.action_select = function (action) {

            if(!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote');

            scope.action_selected = action || false;

          };

          SailPlay.on('actions.perform.success', function(){
            scope.$apply(function(){
              scope.action_selected = false;
            });
          });

          scope.action_custom_select = function (action) {

            if(!SailPlayApi.data('load.user.info')()) return SailPlay.authorize('remote');
            scope.action_custom_selected = action || false;

          };

          scope.action_styles = function (action_data) {
            return action_data.styles && tools.stringify_widget_css('', action_data.styles);
          };

        }

      };

    });

}());
