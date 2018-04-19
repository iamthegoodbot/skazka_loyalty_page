angular.module('magic')

.component('widgetsList', {

  template: `
    <div>
      
      <form action="" class="spm_widgets_search">
        <input type="text" placeholder="Enter name..." data-ng-model="$ctrl.filter.id">
        <button type="submit">Search</button>  
      </form>
      
      <div>
        <ul class="spm_widgets_list">
          <li class="spm_widgets_list_item" data-ng-repeat="widget in $ctrl.widgets | filter:$ctrl.filter" data-ng-init="widget_config = $ctrl.generate_config(widget);">
            <h3 class="spm_widgets_list_item_name">
              {{ widget.id }}
            </h3>
            <sailplay-magic data-config="widget_config"></sailplay-magic>
          </li>
        </ul>
      </div>
      
    </div>
  `,
  controller: function (MagicWidget, MAGIC_CONFIG) {

    this.widgets = MagicWidget.registered();

    this.filter = {
      id: ''
    };

    this.$onInit = () => {

      console.log(this.widgets);

    };

    this.generate_config = (widget) => {

      let copied = angular.copy(MAGIC_CONFIG);

      let widget_config = angular.copy(widget.defaults || {
        id: widget.id,
        options: {},
        styles: {},
        images: {}
      });

      copied.widgets = [
        widget_config
      ];

      console.log(copied);

      return copied;

    };

  }

});
