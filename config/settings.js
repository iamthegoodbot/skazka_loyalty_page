window.SAILPLAY_MAGIC_CONFIG = {
  "auth": {
    "type": "hybrid",
    "auth_hash_id": "sailplay_magic_auth_hash"
  },
  "widgets": [
    {
      "id": "header",
      "enabled": true,
      "styles": {
        "container": {
          "background-image": "url(https://sailplays3.cdnvideo.ru/media/assets/assetfile/e103c5f64dc62b6a1c18bbb1f37f923d.jpg)",
          "background-size": "cover",
          "background-position": "top center",
          "height": "684px",
          "background-color": "blue"
        }
      }
    },
    {
      "id": "profile",
      "enabled": true,
      "texts": {
        "edit_profile_button": "Edit Profile",
        "name_not_defined": "John Doe",
        "history_button": "History",
        "login_reg": "Login/Register",
        "logout": "Log out",
        "before_gift": "until next gift",
        "user_status": "Your status:",
        "history": {
          "header": "Your history",
          "caption": "All user actions history is shown here"
        }
      },
      "images": {},
      "styles": require('./css-to-json!./profile.css'),
      "fill_profile": {
        "header": "Update your profile",
        "config": {
          "tag": "Client filled profile",
          "fields": [{
              "type": "system",
              "name": "firstName",
              "label": "Your name",
              "placeholder": "Enter your name",
              "input": "text"
            },
            {
              "type": "system",
              "name": "lastName",
              "label": "Your last name",
              "placeholder": "Enter your last name",
              "input": "text"
            },
            {
              "type": "system",
              "name": "addPhone",
              "label": "Your phone number",
              "placeholder": "9 (999) 999-99-99",
              "input": "phone"
            },
            {
              "type": "system",
              "name": "addEmail",
              "label": "Your E-Mail",
              "placeholder": "your@address.com",
              "input": "email"
            },
            {
              "type": "system",
              "name": "birthDate",
              "label": "Your birth date",
              "placeholder": "Enter your birth date",
              "input": "date"
            },
            {
              "type": "system",
              "name": "sex",
              "label": "Gender",
              "placeholder": "Enter your last name",
              "input": "select",
              "data": [{
                  "value": "",
                  "text": "Not defined"
                },
                {
                  "value": 1,
                  "text": "Male"
                },
                {
                  "value": 2,
                  "text": "Female"
                }
              ]
            }
          ]
        }
      }
    },
    {
      "id": "gifts",
      "enabled": true,
      "options": {
        "gift_types": [{
            "id": "custom_vars",
            "categories": [746],
            "data": {
              "fields": [{
                "label": "Please specify the date for your free night",
                "variable": "fn_reg",
                "type": "date",
                "options": {
                  "max_year": "2018",
                  "min_year": "2016"
                }
              }]
            }
          },
          {
            "id": "custom_vars",
            "categories": [747],
            "data": {
              "fields": [{
                "label": "Please specify the date for your free night",
                "variable": "fn_spec",
                "type": "date",
                "options": {
                  "max_year": "2018",
                  "min_year": "2016"
                }
              }]
            }
          }
        ]
      },
      "texts": {
        "header": "Gifts",
        "caption": "Redeem your bonus points for these great gifts!",
        "get": "Get",
        "no_points_button_text": "Not enough points",
        "confirm_message_start": "Confirm",
        "confirm_message_end": "Cancel",
        "no_points_message": "Not enough points. Try completing some of these actions:",
        "earn_points": "earn points",
        "service": "Select service",
        "partner_service_url": "https://arborhotels.com",
        "coupon_number": "Coupon number",
        "gift_received": "Your gift request has been received!",
        "purchase_success_header": "Congratulations!",
        "purchase_error_header": "Gift was not received.",
        "gift_received_error": "Sorry, we're unable to process your request at this time"
      },
      "images": {},
      "styles": require('./css-to-json!./gifts.css')
    },
    {
      "id": "badges",
      "enabled": true,
      "texts": {
        "header": "Badges",
        "share_url": "http://arborhotels.com/"
      },
      "styles": {
        "container": {
          "background-color": "#EDEDED"
        },
        "no-user": {
          "display": "none"
        },
        "badge": {
          "border": "none",
          "height": "auto",
          "vertical-align": "top",
          "background-color": "transparent"
        },
        "badge_pic": {
          "border-radius": "100%"
        },
        "bon_header": {
          "text-align": "center",
          "text-transform": "uppercase",
          "margin-top": "90px",
          "font-size": "42px"
        },
        "badge_arrow": {
          "background-image": "url(https://sailplays3.cdnvideo.ru/media/assets/assetfile/c7916d44905e4087cf3e6ec0472f1cd4.png)"
        },
        "modal_badge_name": {
          "color": "#142D61",
          "font-size": "36px",
          "font-family": "helvetica,arial,nimbus sans l,sans-serif"
        },
        "modal_description": {
          "font-size": "16px"
        },
        "tw_icon": {
          "background-image": "url(https://d3sailplay.cdnvideo.ru/media/assets/assetfile/945cb8deb99c96043747b5c59b3f9b79.png)"
        },
        "fb_icon": {
          "background-image": "url(https://d3sailplay.cdnvideo.ru/media/assets/assetfile/ec06873d95084786de9fe50e549c2419.png)"
        },
        "modal_badge_selected .modal_container": {
          "padding": "0"
        },
        "modal_badge_selected .modal_badge_image": {
          "width": "100%",
          "text-align": "center",
          "background-color": "#F9FAF5"
        },
        "modal_badge_selected .gift_more_img": {
          "margin": "20px auto",
          "width": "auto",
          "height": "160px",
          "display": "inline-block",
          "border-radius": "100%"
        },
        "modal_badge_selected .modal_badge_tools": {
          "width": "100%",
          "padding": "30px"
        },
        "bon_slide_cat_item_wrap": {
          "margin": "0",
          "padding-left": "5%",
          "padding-right": "5%",
          "box-sizing": "border-box"
        },
        "bon_item_line": {
          "display": "flex",
          "justify-content": "space-around"
        },
        "badge_name": {
          "color": "#1369AA",
          "font-weight": "600",
          "margin-bottom": "84px" 
        }
      }
    },
    {
      "id": "leaderboard",
      "enabled": true,
      "texts": {
        "header": "leaderboard",
        "suffix": "bonus"
      },
      "styles": require('./css-to-json!less-loader!./leaderboard.less')  
    }
  ],
  "tools": {
    "layout": {
      "styles": {
        "no-user": {
          "display": "none"
        },
        "header.no-user": {
          "display": "inline-block"
        },
        "profile.no-user": {
          "display": "inline-block"
        }
      }
    },
    "date": {
      "months": {
        "1": "January",
        "2": "February",
        "3": "March",
        "4": "April",
        "5": "May",
        "6": "June",
        "7": "July",
        "8": "August",
        "9": "September",
        "10": "October",
        "11": "November",
        "12": "December"
      },
      "placeholder": {
        "month": "Month",
        "day": "Day",
        "year": "Year"
      }
    },
    "modal": {
      "images": {
        "close": "http://saike.ru/sailplay-magic/lib/magic/img/tools/modal/close.png"
      },
      "styles": {
        "modal_container": {
          "background-color": "#ededed",
          "box-shadow": "0px 0px 16px 0px rgba(50,50,50,0.75)"
        },
        "modal_container:before": {
          "content": "''",
          "background": "#fa1100",
          "width": "100%",
          "height": "20px",
          "left": "0",
          "top": "-20px",
          "position": "absolute"          
        },
        "close_overlay": {
          "display": "none"
        }
      }
    },
    "points": {
      "texts": {
        "pluralize": "point,points,points"
      }
    },
    "slider": {
      "styles": {
        "slider_arrow_left": {
          "background-image": 'url(data:image/svg+xml,%3Csvg%20version%3D%221.1%22%0A%09%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%20xmlns%3Aa%3D%22http%3A//ns.adobe.com/AdobeSVGViewerExtensions/3.0/%22%0A%09%20x%3D%220px%22%20y%3D%220px%22%20width%3D%2247.8px%22%20height%3D%22113.4px%22%20viewBox%3D%220%200%2047.8%20113.4%22%20style%3D%22enable-background%3Anew%200%200%2047.8%20113.4%3B%22%0A%09%20xml%3Aspace%3D%22preserve%22%3E%0A%3Cdefs%3E%0A%3C/defs%3E%0A%3Cpolyline%20stroke%3D%22%23fff%22%20fill%3D%22none%22%20points%3D%221.5%2C1.5%2045.9%2C56.5%201.5%2C111.9%20%22/%3E%0A%3C/svg%3E%0A)',
          "background-repeat": "no-repeat",
          "background-color": "transparent",
          "background-position": "top left",
          "transition": "transform .25s ease-out",
          "transform": "rotate(180deg) translateX(0)"
        },
        "slider_arrow_left:hover": {
          "transform": "rotate(180deg) translateX(5px)"
        },
        "slider_arrow_right": {
          "background-image": 'url(data:image/svg+xml,%3Csvg%20version%3D%221.1%22%0A%09%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%20xmlns%3Aa%3D%22http%3A//ns.adobe.com/AdobeSVGViewerExtensions/3.0/%22%0A%09%20x%3D%220px%22%20y%3D%220px%22%20width%3D%2247.8px%22%20height%3D%22113.4px%22%20viewBox%3D%220%200%2047.8%20113.4%22%20style%3D%22enable-background%3Anew%200%200%2047.8%20113.4%3B%22%0A%09%20xml%3Aspace%3D%22preserve%22%3E%0A%3Cdefs%3E%0A%3C/defs%3E%0A%3Cpolyline%20stroke%3D%22%23fff%22%20fill%3D%22none%22%20points%3D%221.5%2C1.5%2045.9%2C56.5%201.5%2C111.9%20%22/%3E%0A%3C/svg%3E%0A)',
          "background-repeat": "no-repeat",
          "background-color": "transparent",
          "background-position": "top left",
          "transition": "transform .25s ease-out"          
        },
        "slider_arrow_right:hover": {
          "transform": "translateX(5px)"
        }
      }
    },
    "buttons": {
      "texts": {
        "close": "Cancel",
        "get": "Get",
        "ok": "OK",
        "save": "Save"
      },
      "styles": {
        "button_primary": {
          "background-color": "red",
          "color": "#fff",
          "text-decoration": "none",
          "text-transform": "uppercase",
          "padding": "13px 30px",
          "font-size": "12px",
          "text-shadow": "none",          
          "border": "1px solid transparent",
          "display": "inline-block",
          "font-weight": "300",
          "cursor": "pointer",
          "height": "auto",
          "line-height": "120%"
        },
        "button_primary:hover": {
          "background": "#020707"
        },
        "button_link": {
          "padding": "2px",
          "background": "rgba(200,200,200,0.5)",
          "color": "#222",
          "cursor": "pointer",
          "width": "auto"
        },
        "button_link:hover": {
          "color": "#0A4B89"
        }
      }
    },
    "notifier": {
      "texts": {
        "congratulations": "Congratulations!",
        "error": "An error occurred"
      },
      "styles": {
        "notifier_header": {
          "color": "#333",
          "font-family": "helvetica,arial,nimbus sans l,sans-serif",
          "font-size": "26px"
        },
        "notifier_body": {
          "color": "#333",
          "font-family": "helvetica,arial,nimbus sans l,sans-serif",
          "font-weight": 300
        }
      }
    },
    "forms": {
      "texts": {},
      "styles": {
        "form_label": {
          "color": "#190042",
          "font-family": "helvetica,arial,nimbus sans l,sans-serif",
          "font-size": "16px",
          "margin-bottom": "4px"
        },
        "form_input": {
          "border": "2px solid #020707",
          "border-radius": "0",
          "color": "#333",
          "font-family": "helvetica,arial,nimbus sans l,sans-serif",
          "font-weight": 300,
          "height": "44px",
          "line-height": "44px",
          "padding-left": "15px"
        },
        "form_date": {
          "font-family": "helvetica,arial,nimbus sans l,sans-serif",
          "font-weight": 300
        },
        "form_date span": {
          "color": "#333",
          "border": "2px solid #020707",
          "border-radius": "0",
          "background": "white",
          "line-height": "44px",
          "height": "44px"
        },
        "form_date select": {
          "color": "#333",
          "border": "2px solid #020707",
          "border-radius": "0",
          "background": "white",
          "line-height": "44px",
          "height": "44px"
        },
        "form_date .form_date__popup": {
          "border": "2px solid #ccc",
          "background": "white"
        },
        "form_date .form_date__popup a": {
          "color": "#333"
        }
      }
    }
  },
  "data": {
    "history": {
      "purchase": "Purchase",
      "gift_purchase": "Gift",
      "badge": "Badge",
      "registration": "Sign up",
      "referral": "Invite friend",
      "referred": "Registration from friend's invite",
      "referred_purchase": "Friend's purchase",
      "promocode": "Promocode activation",
      "enter_group": "Joined our group on ",
      "share_purchase": "Shared a purchase on ",
      "social_share": "Shared our website on ",
      "share_badge": "Shared a badge on ",
      "earn_badge": "Earn badge ",
      "custom_action": "Custom action"
    },
    "actions": {
      "system": {
        "emailBinding": {
          "name": "Add your email address",
          "pic": "https://d3sailplay.cdnvideo.ru/media/assets/assetfile/f56a3fe6291372e5b4d178508136c47d.png",
          "description": "Earn 10 points for updating your email address",
          "button_text": "Bind E-Mail"
        },
        "fillProfile": {
          "name": "Update your profile",
          "pic": "https://d3sailplay.cdnvideo.ru/media/assets/assetfile/f56a3fe6291372e5b4d178508136c47d.png",
          "description": "Earn 10 points for updating your profile",
          "button_text": "Fill profile"
        },
        "inviteFriend": {
          "name": "Invite a friend",
          "pic": "https://d3sailplay.cdnvideo.ru/media/assets/assetfile/a212622efce628a4e0fa90548746b2f6.png",
          "description": "Earn 10 points for inviting a friend to Arbor Hotels",
          "button_text": "Invite friend"
        }
      },
      "social": {
        "vk": {
          "like": {
            "name": "Вступите в группу VK",
            "pic": "http://saike.ru/sailplay-magic/lib/magic/img/actions/data/icon_vk.png",
            "description": "Some description for action here",
            "button_text": "Join VK group",
            "styles": {
              "vk_share_btn": {
                "background-color": "#0A428E",
                "color": "#fff",
                "text-decoration": "none",
                "text-transform": "uppercase",
                "padding": "7px 30px",
                "font-size": "12px",
                "border": "1px solid #020707",
                "display": "inline-block",
                "font-weight": "300",
                "cursor": "pointer",
                "height": "auto",
                "line-height": "120%",
                "text-align": "center"
              },
              "vk_share_btn:hover": {
                "background": "#111"
              }
            }
          },
          "partner_page": {
            "name": "Рассказать о нашем магазине в VK",
            "pic": "http://saike.ru/sailplay-magic/lib/magic/img/actions/data/icon_vk.png",
            "description": "Some description for action here",
            "button_text": "Share",
            "styles": {
              "vk_share_btn": {
                "background": "#333",
                "color": "#ddd",
                "cursor": "pointer",
                "font-family": "helvetica,arial,nimbus sans l,sans-serif",
                "line-height": "35px",
                "font-size": "14px",
                "width": "140px",
                "text-align": "center"
              },
              "vk_share_btn:hover": {
                "background": "#111"
              }
            }
          },
          "purchase": {
            "name": "Поделитесь вашей покупкой в VK",
            "pic": "http://saike.ru/sailplay-magic/lib/magic/img/actions/data/icon_vk.png",
            "description": "Some description for action here",
            "button_text": "Share",
            "styles": {
              "vk_share_btn": {
                "background": "#333",
                "color": "#ddd",
                "cursor": "pointer",
                "font-family": "helvetica,arial,nimbus sans l,sans-serif",
                "line-height": "35px",
                "font-size": "14px",
                "width": "140px",
                "text-align": "center"
              },
              "vk_share_btn:hover": {
                "background": "#111"
              }
            }
          }
        },
        "fb": {
          "like": {
            "name": "Join the Facebook group",
            "pic": "https://d3sailplay.cdnvideo.ru/media/assets/assetfile/ec06873d95084786de9fe50e549c2419.png",
            "description": "Earn 10 points for joining our Facebook group",
            "button_text": "Like us",
            "styles": {
              "fb_share_btn": {
                "background": "#333",
                "color": "#ddd",
                "cursor": "pointer",
                "font-family": "helvetica,arial,nimbus sans l,sans-serif",
                "line-height": "35px",
                "font-size": "14px",
                "width": "140px",
                "text-align": "center"
              },
              "fb_share_btn:hover": {
                "background": "#111"
              }
            }
          },
          "partner_page": {
            "name": "Share Arbor Hotels on Facebook",
            "pic": "https://d3sailplay.cdnvideo.ru/media/assets/assetfile/ec06873d95084786de9fe50e549c2419.png",
            "description": "Earn 10 points for Sharing Arbor Hotels on Facebook",
            "button_text": "Share",
            "styles": {
              "fb_share_btn": {
                "background-color": "#0A428E",
                "color": "#fff",
                "text-decoration": "none",
                "text-transform": "uppercase",
                "padding": "7px 30px",
                "font-size": "12px",
                "border": "1px solid #020707",
                "display": "inline-block",
                "font-weight": "300",
                "cursor": "pointer",
                "height": "auto",
                "line-height": "120%",
                "text-align": "center",
                "font-family": "helvetica,arial,nimbus sans l,sans-serif",
                "width": "140px",
                "box-sizing": "border-box"
              },
              "fb_share_btn:hover": {
                "background": "#020707"
              }
            }
          },
          "purchase": {
            "name": "Share your recent purchase on Facebook",
            "pic": "https://d3sailplay.cdnvideo.ru/media/assets/assetfile/ec06873d95084786de9fe50e549c2419.png",
            "description": "Earn 10 points by sharing your recent purchase on Facebook",
            "button_text": "Share",
            "styles": {
              "fb_share_btn": {
                "background-color": "#0A428E",
                "color": "#fff",
                "text-decoration": "none",
                "text-transform": "uppercase",
                "padding": "7px 30px",
                "font-size": "12px",
                "border": "1px solid #020707",
                "display": "inline-block",
                "font-weight": "300",
                "cursor": "pointer",
                "height": "auto",
                "line-height": "120%",
                "text-align": "center",
                "font-family": "helvetica,arial,nimbus sans l,sans-serif",
                "width": "140px",
                "box-sizing": "border-box"
              },
              "fb_share_btn:hover": {
                "background": "#020707"
              }
            }
          }
        },
        "gp": {
          "like": {
            "name": "Like our Google+ page",
            "pic": "https://d3sailplay.cdnvideo.ru/media/assets/assetfile/9f71487bf935bdc3c6ad5eeefd7b9a28.png",
            "description": "Earn 10 points by giving our Google+ page +1",
            "button_text": "Like",
            "styles": {
              "gp_share_btn": {
                "background-color": "#0A428E",
                "color": "#fff",
                "text-decoration": "none",
                "text-transform": "uppercase",
                "padding": "7px 30px",
                "font-size": "12px",
                "border": "1px solid #020707",
                "display": "inline-block",
                "font-weight": "300",
                "cursor": "pointer",
                "height": "auto",
                "line-height": "120%",
                "text-align": "center",
                "font-family": "helvetica,arial,nimbus sans l,sans-serif",
                "width": "140px",
                "box-sizing": "border-box"
              },
              "gp_share_btn:hover": {
                "background": "#020707"
              }
            }
          },
          "partner_page": {
            "name": "Share our Google+ page with your friends",
            "pic": "https://d3sailplay.cdnvideo.ru/media/assets/assetfile/9f71487bf935bdc3c6ad5eeefd7b9a28.png",
            "description": "Earn 10 points by telling your Google+ friends about Arbor Hotels",
            "button_text": "Share",
            "styles": {
              "gp_share_btn": {
                "background-color": "#0A428E",
                "color": "#fff",
                "text-decoration": "none",
                "text-transform": "uppercase",
                "padding": "7px 30px",
                "font-size": "12px",
                "border": "1px solid #020707",
                "display": "inline-block",
                "font-weight": "300",
                "cursor": "pointer",
                "height": "auto",
                "line-height": "120%",
                "text-align": "center",
                "font-family": "helvetica,arial,nimbus sans l,sans-serif",
                "width": "140px",
                "box-sizing": "border-box"
              },
              "gp_share_btn:hover": {
                "background": "#020707"
              }
            }
          },
          "purchase": {
            "name": "Share your recent purchase on Google+",
            "pic": "https://d3sailplay.cdnvideo.ru/media/assets/assetfile/9f71487bf935bdc3c6ad5eeefd7b9a28.png",
            "description": "Earn 10 points by sharing your recent purchase on Google+",
            "button_text": "Share",
            "styles": {
              "gp_share_btn": {
                "background-color": "#0A428E",
                "color": "#fff",
                "text-decoration": "none",
                "text-transform": "uppercase",
                "padding": "7px 30px",
                "font-size": "12px",
                "border": "1px solid #020707",
                "display": "inline-block",
                "font-weight": "300",
                "cursor": "pointer",
                "height": "auto",
                "line-height": "120%",
                "text-align": "center",
                "font-family": "helvetica,arial,nimbus sans l,sans-serif",
                "width": "140px",
                "box-sizing": "border-box"
              },
              "gp_share_btn:hover": {
                "background": "#020707"
              }
            }
          }
        },
        "ok": {
          "like": {
            "name": "Вступите в группу Одноклассники",
            "pic": "http://saike.ru/sailplay-magic/lib/magic/img/actions/data/icon_ok.png",
            "description": "Some description for action here",
            "button_text": "Like",
            "styles": {
              "ok_share_btn": {
                "background": "#333",
                "color": "#ddd",
                "cursor": "pointer",
                "font-family": "helvetica,arial,nimbus sans l,sans-serif",
                "line-height": "35px",
                "font-size": "14px",
                "width": "140px",
                "text-align": "center"
              },
              "ok_share_btn:hover": {
                "background": "#111"
              }
            }
          },
          "partner_page": {
            "name": "Рассказать о нашем магазине в Одноклассники",
            "pic": "http://saike.ru/sailplay-magic/lib/magic/img/actions/data/icon_ok.png",
            "description": "Some description for action here",
            "button_text": "Share",
            "styles": {
              "ok_share_btn": {
                "background": "#333",
                "color": "#ddd",
                "cursor": "pointer",
                "font-family": "helvetica,arial,nimbus sans l,sans-serif",
                "line-height": "35px",
                "font-size": "14px",
                "width": "140px",
                "text-align": "center"
              },
              "ok_share_btn:hover": {
                "background": "#111"
              }
            }
          },
          "purchase": {
            "name": "Поделитесь вашей покупкой в Одноклассники",
            "pic": "http://saike.ru/sailplay-magic/lib/magic/img/actions/data/icon_ok.png",
            "description": "Some description for action here",
            "button_text": "Share",
            "styles": {
              "ok_share_btn": {
                "background": "#333",
                "color": "#ddd",
                "cursor": "pointer",
                "font-family": "helvetica,arial,nimbus sans l,sans-serif",
                "line-height": "35px",
                "font-size": "14px",
                "width": "140px",
                "text-align": "center"
              },
              "ok_share_btn:hover": {
                "background": "#111"
              }
            }
          }
        },
        "tw": {
          "partner_page": {
            "name": "Share Arbor Hotels on Twitter",
            "pic": "https://d3sailplay.cdnvideo.ru/media/assets/assetfile/945cb8deb99c96043747b5c59b3f9b79.png",
            "description": "Earn 10 points for mentioning @ArborInnLBK on Twitter!",
            "button_text": "Share"
          },
          "purchase": {
            "name": "Share your Arbor Hotels purchase on Twitter",
            "pic": "https://d3sailplay.cdnvideo.ru/media/assets/assetfile/945cb8deb99c96043747b5c59b3f9b79.png",
            "description": "Earn 10 points for sharing your stay at Arbor Hotels using Twitter!",
            "button_text": "Share"
          }
        }
      }
    }
  }
}