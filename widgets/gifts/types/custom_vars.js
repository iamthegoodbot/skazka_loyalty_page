import { GiftTypeRegister } from '../gifts';
import angular from 'angular';

GiftTypeRegister({

  id: 'custom_vars',
  inject: [
    'SailPlay',
    'SailPlayApi'
  ],
  template:
    `
      <form name="custom_vars_form" class="clearfix">
        <div class="form_field" style="width: 100%;" data-ng-repeat="field in options.data.fields" data-ng-switch="field.type">
          <div data-ng-switch-when="date" class="clearfix">
            <label class="form_label">{{ field.label }}</label>
            <date-selector data-ng-model="field.value" data-max-year="{{ field.options.max_year }}" data-min-year="{{ field.options.min_year }}"></date-selector>
          </div>
        </div>
      </form>
    `,
  controller: function (SailPlay, SailPlayApi) {

    return (scope, elm) => {

      console.log('custom vars scope:', scope);

      let purchasing = false;

      SailPlay.on('gifts.purchase', (params) => {
        if(params.gift.id === scope.gift.id){
          purchasing = true;
        }
      });

      SailPlay.on('gifts.purchase.success', function (res) {

        console.dir(res);

        if (!purchasing) return;

        purchasing = false;

        console.log(scope.options.data.fields);

        scope.$digest();

        let custom_vars = {};

        angular.forEach(scope.options.data.fields, function (field) {
          custom_vars[field.variable] = field.value;
        });

        SailPlay.send('vars.add', {custom_vars: custom_vars}, function (vars_res) {

          console.log('custom vars added:', vars_res);

        });

      });

    };

  }


});
