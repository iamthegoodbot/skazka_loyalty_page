import angular from 'angular';

export let Widget = angular.module('magic.widget', [])

.provider('MagicWidget', function () {

  let registered_widgets = [];

  const get_widget_config = (widget_id) => {
    return registered_widgets.filter((widget) => {
      return widget.id === widget_id;
    })[0];
  };

  return {
    register: function (widget_config) {
      const unique = !get_widget_config(widget_config.id);
      if(!unique) {

        // console.error(`Duplucate widgets ID: ${widget_config.id}`);

      }
      unique && registered_widgets.push(widget_config);
    },
    $get: function () {

      return {

        registered: function () {
          return registered_widgets;
        },
        get_widget_config: get_widget_config

      };

    }
  };

})

.run(function (MagicWidget) {

});

//basic widget decorator
export function WidgetRegister(config) {

  Widget.config(function (MagicWidgetProvider) {

    MagicWidgetProvider.register(config);

  });

  return Widget;

}

export default Widget.name;
