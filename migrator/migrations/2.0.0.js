import MagicMigrator from '../migrator';

MagicMigrator.create({

  //required param version
  version: '2.0.0',

  //this function ups version of config
  up: (config) => {

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
  },

  down: (config) => {

    //redo status widget
    let status_widgets = config.$MAGIC.widgets.filter(function (widget) {
      return widget.id === 'statuses';
    });

    status_widgets.forEach((widget) => {
      delete widget.styles['next_status_info'];
    });

    //redo date form styles
    let date_input_styles = config.$MAGIC.tools.forms.styles['form_date span'];

    if(date_input_styles) {
      delete config.$MAGIC.tools.forms.styles['form_date select'];
    }


    //migrate ids to names
    config.widgets && config.widgets.forEach(function (widget) {

      widget.id = widget.name;

      delete widget.name;

    });

    //redo move old properties from global to $MAGIC
    [

      "auth",
      "widgets",
      "tools",
      "data"

    ].forEach(function (prop) {
      config[prop] = config.$MAGIC[prop];
      delete config.$MAGIC[prop];
    });

    //delete new property for magic config
    delete config.$MAGIC;

  }


});
