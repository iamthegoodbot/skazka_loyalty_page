var json = {
        "container": {
          "background-color": "#3e699e"
        },
        "bon_header": {
          "margin-top": "80px",
          "text-align": "center",
          "text-transform": "uppercase",
          "color": "white"          
        },
        "bon_header .header": {
          "color": "white"                    
        },
        "bon_sub_header": {
          "text-align": "center",
          "color": "#fff",
          "margin-top": "0"
        },
        "bon_sub_header .caption": {
          "color": "#fff"
        },
        "header": {
          "color": "#142D61",
          "font-family": "helvetica,arial,nimbus sans l,sans-serif"
        },
        "caption": {
          "color": "#403C3C",
          "font-family": "helvetica,arial,nimbus sans l,sans-serif"
        },
        "gift": {
          "background-color": "white",
          "border-color": "#5386b1",
          "border-radius": "20px",
          "border-width": "12px",
          "margin-top": "10px",
          "margin-bottom": "10px",
          "position": "relative",
          "transition": "all .25s ease-out"
        },
        "gift:before": {
          "transition": "all .25s ease-out"
        },
        "gift_img": {
          "display": "inline"
        },
        "gift:hover": {
          "border-color": "#d72906",
        },
        "gift:hover:before": {
          "position": "absolute",
          "width": "100%",
          "height": "100%",
          "background": "rgba(255, 255, 255, .8)",
          "left": "0",
          "top": "0",
          "z-index": "10"
        },
        "gift:hover .bon_item_iner a.button_primary": {
          "visibility": "visible",
          "opacity": "1",
          "z-index": "11"
        },
        "gift .bon_item_iner .bon_item_name": {
          "visibility": "visible",
          "opacity" : "1"
        },
        "gift .bon_item_iner .bon_tem_info": {
          "visibility": "visible",
          "opacity" : "1"
        },
        "gift .bon_item_iner a.button_primary" : {
          "width": "120px",
          "top": "50%",
          "bottom": "auto",
          "text-shadow": "none",
          "border": "none",
          "padding": "13px 30px",
          "-webkit-transform": "translateY(-50%)",
          "-moz-transform": "translateY(-50%)",
          "transform": "translateY(-50%)",          
          "margin-left": "-60px"
        },
        "gift_name": {
          "color": "#333",
          "font-family": "helvetica,arial,nimbus sans l,sans-serif"
        },
        "gift_points": {
          "color": "#514D4D",
          "font-family": "helvetica,arial,nimbus sans l,sans-serif",
          "font-size": "16px",
          "font-weight": "bold",
          "opacity": "1"
        },
        "description": {
          "color": "#333",
          "font-family": "helvetica,arial,nimbus sans l,sans-serif",
          "font-size": "14px"
        },
        "bns_overlay_gift .modal_container": {
          "width": "500px"
        },
        "modal_gift_container": {
          "text-align": "center",
          "padding-top": "20px"
          
        },
        "modal_gift_container .gift_more_block": {
          "width": "100%",
          "text-align": "left",
          "margin-top": "30px",
          "background": "#ededed",
          "padding": "0 50px 40px"          
        },
        "modal_gift_name": {
          "color": "#136AA1",
          "font-size": "30px",
          "font-family": "helvetica,arial,nimbus sans l,sans-serif",
          "margin-top": "30px"
        },        
        "modal_gift_points": {
          "color": "#fa1100",
          "font-family": "helvetica,arial,nimbus sans l,sans-serif",
          "font-size": "20px",
          "opacity": "1"
        },
        "modal_gift_points:before": {
          "content": "'-'"
        },
        "modal_gift_description": {
          "color": "#403C3C",
          "font-family": "helvetica,arial,nimbus sans l,sans-serif",
          "font-size": "16px",
          "line-height": "24px",
          "margin-top": "32px",
          "margin-bottom": "34px"
        },
        "modal_gift_buttons .button_primary": {
          "width": "168px",
          "line-height": "39px",
          "font-weight": "bold",
          "text-align": "center",
          "padding": "0"
        },
        "modal_gift_buttons .button_primary:nth-child(1)": {
          "float": "right"
        },
        "bns_overlay_gift_complete .modal_container, .bns_overlay_notify .modal_container": {
          "width": "500px",
        },
        "bns_overlay_gift .modal_container": {
          "padding": "0",
          "width": "500px"
        },
      }
for (var key in json) {
  process.stdout.write("." + key + '{');
  for (var rule in json[key]) {
    process.stdout.write(rule + ": " + json[key][rule] + ';');
  }
  process.stdout.write("}");
}
