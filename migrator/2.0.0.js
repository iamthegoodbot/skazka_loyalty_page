export const version = '2.0.0';

export let up = function (config) {

  //migrate names to ids
  config.widgets && config.widgets.forEach(function (widget) {

    widget.id = widget.name;

    delete widget.name;

  });

  //add new property for magic config
  config.$MAGIC = {};

  //move old properties from global to $MAGIC
  [

    "auth",
    "widgets",
    "tools",
    "data"

  ].forEach(function (prop) {
    config.$MAGIC[prop] = config[prop];
    delete config[prop];
  });

  //add version to config
  config.$MAGIC.version = version;

  //update date form styles
  let date_input_styles = config.$MAGIC.tools.forms.styles['form_date span'];

  if(date_input_styles) {
    config.$MAGIC.tools.forms.styles['form_date select'] = date_input_styles;
  }

  //update status widget
  let status_widgets = config.$MAGIC.widgets.filter(function (widget) {
    return widget.id === 'statuses';
  });

  status_widgets.forEach((widget) => {
    widget.styles['next_status_info'] = {
      "display": "none"
    };
  });


};
