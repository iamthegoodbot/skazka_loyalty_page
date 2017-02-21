window.SAILPLAY_MAGIC_CONFIG = {
  "auth": {
    "type": "hybrid",
    "auth_hash_id": "sailplay_magic_auth_hash"
  },
  "widgets": [{
    "id": "header",
    "enabled": true,
    "styles": require('./css-to-json!./styles/header.css'),
    "texts": {
      "title": "LOYALTY PAGE",
      "static_keys": [
        'Earn Soligent Bucks for every dollar you spend and bonus bucks for certain action taken.',
        'Earn status levels based on spending for valuable benefits.',
        'Earn many times more each quarter you exceed your threshold.'
      ]
    },
    "flag": {
      "name_is_title": true
    }
  },
    {
      "id": "profile",
      "enabled": true,
      "styles": require('./css-to-json!./styles/profile.css'),
      "texts": {
        "edit_profile_button": "EDIT PROFILE",
        "logout": "LOG OUT"
      },
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
      "id": "profile-progress",
      "enabled": true,
      "texts": {
        "header_1_prefix": "Welcome, ",
        "header_1_suffix": " Status Loyalty member!",
        "header_2_prefix": "You have ",
        "header_2_suffix": " Soligent Bucks in your account"
      }
    },
    {
      "styles": require('./css-to-json!./styles/soligent-status-account.css'),
      "errors": {},
      "enabled": true,
      "texts": {},
      "images": {},
      "options": {
        "monthly_special": {
          "icon": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/9b8ee7abe95c24fad2f209f806bed336.jpg",
          "texts": [
            'text 1',
            'text 2',
            'text 3'
          ]
        }
      },
      "id": "soligent-status-account"
    },
    {
      "styles": require('./css-to-json!./styles/gifts-grid.css'),
      "texts": {
        "gift_received": "Your gift request has been received!",
        "no_points_button_text": "Not enough points",
        "gift_received_error": "Sorry, we're unable to process your request at this time",
        "get": "Get",
        "purchase_success_header": "Congratulations!",
        "earn_points": "earn points",
        "confirm_message_start": "Confirm",
        "header": "Gifts",
        "coupon_number": "Coupon number",
        "purchase_error_header": "Gift was not received.",
        "confirm_message_end": "Cancel",
        "no_points_message": "Not enough points. Try completing some of these actions:"
      },
      "images": {},
      "enabled": true,
      "id": "gifts-grid"
    },
    {
      "styles": require('./css-to-json!./styles/card-quests.css'),
      "errors": {},
      "enabled": true,
      "texts": {
        "perform": "Share",
        "header": "Earn even more points"
      },
      "images": {},
      "id": "card-quests"
    }
  ],
  "tools": {
    "buttons": {
      "styles": require('./css-to-json!./styles/buttons.css'),
      "texts": {
        "close": "Close",
        "save": "Save",
        "ok": "OK",
        "get": "GET"
      }
    },
    "points": {
      "texts": {
        "pluralize": "point,points,points"
      }
    },
    "slider": {
      "styles": {
        "slider_arrow_right": {
          "background-image": "url(https://sailplays3.cdnvideo.ru/media/assets/assetfile/a8e631688bd53c5af5a6ea03991307fb.png)",
          "background-color": "transparent"
        },
        "slider_arrow_left": {
          "background-image": "url(https://sailplays3.cdnvideo.ru/media/assets/assetfile/c607df6517b4947bb04766f430034152.png)",
          "background-color": "transparent"
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
    "modal": {}
  },
  "data": {
    "status": {
      "list": [
        {
          "name": "Bronze",
          "icon": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/9b8ee7abe95c24fad2f209f806bed336.jpg",
          "sum": "0",
          "texts": [
            'text 1',
            'text 2',
            'text 3'
          ]
        },
        {
          "name": "Silver",
          "icon": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/9b8ee7abe95c24fad2f209f806bed336.jpg",
          "sum": "200000",
          "texts": [
            'text 1',
            'text 2',
            'text 3'
          ]
        },
        {
          "name": "Gold",
          "icon": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/9b8ee7abe95c24fad2f209f806bed336.jpg",
          "sum": "100000",
          "texts": [
            'text 1',
            'text 2',
            'text 3'
          ]
        }
      ]
    },
    "actions": {
      "system": {},
      "social": {
        "tw": {
          "partner_page": {
            "pic": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/626482aae8f5e423aac1d07dbbbb231c.png",
            "description": "Earn points for mentioning us on Twitter!",
            "button_text": "Share",
            "name": "Share us on Twitter"
          },
          "purchase": {
            "pic": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/626482aae8f5e423aac1d07dbbbb231c.png",
            "description": "Earn points for sharing your recent purchase using Twitter!",
            "button_text": "Share",
            "name": "Share your purchase on Twitter"
          }
        },
        "fb": {
          "partner_page": {
            "styles": {
              "fb_share_btn": {
                "cursor": "pointer",
                "font-size": "14px",
                "font-family": "Tahoma",
                "color": "#fff",
                "line-height": "120%",
                "height": "auto",
                "padding": "7px 30px",
                "width": "140px",
                "box-sizing": "border-box",
                "text-decoration": "none",
                "font-weight": "300",
                "text-transform": "uppercase",
                "display": "inline-block",
                "background-color": "#136995",
                "text-align": "center"
              },
              "fb_share_btn:hover": {
                "background": "#347595"
              }
            },
            "pic": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/25c0f88c64f9ad713d6476243c5cc1a0.png",
            "description": "Earn points for sharing on Facebook",
            "button_text": "Share",
            "name": "Facebook Share"
          },
          "purchase": {
            "styles": {
              "fb_share_btn": {
                "cursor": "pointer",
                "font-size": "14px",
                "font-family": "Tahoma",
                "color": "#fff",
                "line-height": "120%",
                "height": "auto",
                "padding": "7px 30px",
                "width": "140px",
                "box-sizing": "border-box",
                "text-decoration": "none",
                "font-weight": "300",
                "text-transform": "uppercase",
                "display": "inline-block",
                "background-color": "#136995",
                "text-align": "center"
              },
              "fb_share_btn:hover": {
                "background": "#347595"
              }
            },
            "pic": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/25c0f88c64f9ad713d6476243c5cc1a0.png",
            "description": "Earn points by sharing your recent purchase on Facebook",
            "button_text": "Share",
            "name": "Share your recent purchase on Facebook"
          },
          "like": {
            "styles": {
              "fb_share_btn": {
                "cursor": "pointer",
                "font-size": "14px",
                "font-family": "Tahoma",
                "color": "#fff",
                "line-height": "120%",
                "height": "auto",
                "padding": "7px 30px",
                "width": "140px",
                "box-sizing": "border-box",
                "text-decoration": "none",
                "font-weight": "300",
                "text-transform": "uppercase",
                "display": "inline-block",
                "background-color": "#136995",
                "text-align": "center"
              },
              "fb_share_btn:hover": {
                "background": "#347595"
              }
            },
            "pic": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/25c0f88c64f9ad713d6476243c5cc1a0.png",
            "description": "Earn points for liking our Facebook group",
            "button_text": "Like us",
            "name": "Like on Facebook"
          }
        }
      }
    },
  }
};