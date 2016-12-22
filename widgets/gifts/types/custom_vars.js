import { GiftTypeRegister } from '../gifts';

GiftTypeRegister({

  id: 'custom_vars',
  inject: [
    'SailPlay',
    'SailPlayApi'
  ],
  template:
    `
      <form name="custom_vars_form" class="clearfix">
        <div class="form_field" data-ng-repeat="field in options.data.fields" data-ng-switch="field.type">
          <div data-ng-switch-when="date" class="clearfix">
            <label class="form_label">{{ field.label }}</label>
            <date-picker data-model="field.value"></date-picker>
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
          scope.$digest();
        }
      });

      SailPlay.on('gifts.purchase.success', function (res) {

        console.dir(res);

        if(!purchasing) return;

        purchasing = false;

        console.log(scope.options.data.fields);

        scope.$digest();

      });

    };

  }


});
