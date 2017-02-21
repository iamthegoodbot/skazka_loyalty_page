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
        "caption": "Redeem your bonus points for these great gifts!",
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
        "header": "Quests",
        "caption": "Earn extra points by completing these quests"
      },
      "images": {},
      "id": "card-quests"
    },
  ],
  "tools": {
    "modal": {},
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
  },

};