angular.module('magic')

.component('widgetsList', {

  template: `
    <div>
      
      <form action="">
        <input type="text" placeholder="Enter name...">
        <button type="submit">Search</button>  
      </form>
      
      <div>
        <ul>
          <li data-ng-repeat="widget in $ctrl.widgets" data-ng-init="widget_config = $ctrl.generate_config(widget);">
            <h3>
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

    this.$onInit = () => {

      console.log(this.widgets);

    };

    this.generate_config = (widget) => {

      let copied = angular.copy(MAGIC_CONFIG);

      copied.widgets = [
        {
          id: widget.id,
          options: {},
          styles: {},
          images: {}
        }
      ];

      console.log(copied);

      return copied;

    };

  }

});
