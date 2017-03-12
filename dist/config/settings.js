/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	window.SAILPLAY_MAGIC_CONFIG = {
	  "auth": {
	    "type": "hybrid",
	    "auth_hash_id": "sailplay_magic_auth_hash"
	  },
	  "widgets": [{
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
	  }, {
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
	    "styles": __webpack_require__(1),
	    "fill_profile": {
	      "header": "PARTNER PROFILE",
	      "config": {
	        "tag": "Client filled profile",
	        "fields": [{
	          "type": "system",
	          "name": "firstName",
	          "label": "First Name",
	          "placeholder": "Enter your name",
	          "input": "text"
	        }, {
	          "type": "system",
	          "name": "lastName",
	          "label": "Last Name",
	          "placeholder": "Enter your last name",
	          "input": "text"
	        }, {
	          "type": "system",
	          "name": "addEmail",
	          "label": "Email",
	          "placeholder": "your@address.com",
	          "input": "email"
	        }, {
	          "type": "system",
	          "name": "addPhone",
	          "label": "Phone",
	          "placeholder": "9 (999) 999-99-99",
	          "input": "phone"
	        }, {
	          "type": "variable",
	          "name": "companyName",
	          "label": "Company Name",
	          "placeholder": "Your company here",
	          "input": "text"
	        }]
	      }
	    }
	  }, {
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
	      }, {
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
	      }]
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
	    "styles": __webpack_require__(2)
	  }, {
	    "id": "add-lead",
	    "enabled": true,
	    "texts": {
	      "header": "SUBMIT A NEW LEAD",
	      "subheader": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	      "name": "Submit Lead",
	      "form_header": "NEW LEAD",
	      "submit": "SUBMIT"
	    },
	    "options": {
	      "points": 10
	    },
	    "form_fields": [{
	      "type": "system",
	      "name": "add_first_name",
	      "label": "First Name",
	      "placeholder": "Enter name",
	      "input": "text"
	    }, {
	      "type": "system",
	      "name": "add_second_name",
	      "label": "Last Name",
	      "placeholder": "Enter last name",
	      "input": "text"
	    }, {
	      "type": "system",
	      "name": "add_email",
	      "label": "Email",
	      "placeholder": "address@domain.com",
	      "input": "email"
	    }, {
	      "type": "system",
	      "name": "add_phone",
	      "label": "Phone",
	      "placeholder": "9 (999) 999-99-99",
	      "input": "phone"
	    }, {
	      "type": "variable",
	      "name": "add_moving_from",
	      "label": "Moving From",
	      "placeholder": "Address line 1",
	      "input": "text"
	    }, {
	      "type": "variable",
	      "name": "add_moving_from_zip",
	      "mod": "small",
	      "placeholder": "Zip",
	      "input": "text"
	    }, {
	      "type": "variable",
	      "name": "add_moving_to",
	      "label": "Moving To",
	      "mod": "small",
	      "placeholder": "Zip",
	      "input": "text"
	    }, {
	      "type": "variable",
	      "name": "add_move_date",
	      "label": "Move Date",
	      "placeholder": "",
	      "input": "select",
	      "data": [{
	        "value": 1,
	        "text": "This Week",
	        "$$hashKey": "object:194"
	      }, {
	        "value": 2,
	        "text": "Within 1-2 weeks",
	        "$$hashKey": "object:195"
	      }, {
	        "value": 3,
	        "text": "Within 3-4 weeks",
	        "$$hashKey": "object:196"
	      }, {
	        "value": 4,
	        "text": "Within >3-4 weeks",
	        "$$hashKey": "object:197"
	      }]
	    }],
	    "styles": __webpack_require__(3)
	  }, {
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
	  }, {
	    "id": "leaderboard",
	    "enabled": true,
	    "texts": {
	      "header": "leaderboard",
	      "suffix": "bonus"
	    },
	    "styles": __webpack_require__(4)
	  }],
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
	          "width": "500px",
	          "box-shadow": "0px -15px 16px 0px rgba(50,50,50,0.75), 0px 0px 16px 0px rgba(50,50,50,0.75)"
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
	        "mb_popup_top": {
	          "text-align": "center"
	        },
	        "mb_popup_top span": {
	          "color": "#136AA1",
	          "float": "none",
	          "font-weight": "bold"
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
	          "font-weight": "bold",
	          "margin-bottom": "4px"
	        },
	        "form_input": {
	          "border-top": "none"
	        },
	        "form_date span": {
	          "border": "none",
	          "background-color": "white"
	        },
	        "form_field": {
	          "float": "none",
	          "padding-right": "0",
	          "width": "auto"
	        },
	        "answ_right button": {
	          "margin-right": "0"
	        }
	      }
	    }
	  },
	  "data": {
	    "leaderboard_data": {
	      "tag": "partner_type_2"
	    },
	    "tag_type_1": "partner_type_1",
	    "tag_type_2": "partner_type_2",
	    "tag_type_3": "partner_type_3",
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
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {"container":{"background":"transparent","margin-top":"-453px","padding":"0 5%"},"bon_profile_right":{"float":"left","margin-left":"15%"},"bon_profile_right .user_avatar":{"float":"none","width":"165px","max-width":"165px","box-shadow":"none","-webkit-box-shadow":"none","position":"relative","text-align":"center"},"bon_profile_right .user_avatar_image":{"-webkit-box-shadow":"none","box-shadow":"none"},"bon_profile_right .user_info":{"float":"none","width":"auto","margin-left":"-84px","margin-top":"2px","text-align":"center"},"bon_profile_right .edit_profile_btn":{"background":"none","color":"#cecece","text-decoration":"none"},"bon_profile_right .login_reg_btn":{"height":"165px","width":"165px","border-radius":"50%","padding":"0","margin":"0","float":"none"},"bon_profile_right .logout_btn":{"position":"absolute","bottom":"-105px","margin-left":"-15px","color":"#cecece","text-decoration":"none","background":"none"},"progress_line_main .gift_item":{"background-color":"rgba(255, 255, 255, .9)","background-image":"url(\"data:image/svg+xml,%3C!-- Generator: Adobe Illustrator 19.2.0, SVG Export Plug-In --%3E %3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:a='http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/' x='0px' y='0px' width='22.6px' height='24.7px' viewBox='0 0 22.6 24.7' style='enable-background:new 0 0 22.6 24.7' xml:space='preserve'%3E %3Cdefs%3E %3C/defs%3E %3Cg%3E %3Cpath fill='#FA1100' class='st0' d='M12.2,24.7h5.9c1.5,0,2.7-1.2,2.7-2.7v-9.2c0-0.4-0.4-0.8-0.8-0.8h-7.8V24.7z M12.2,24.7'/%3E %3Cpath fill='#FA1100' class='st0' d='M1.7,22c0,1.5,1.2,2.7,2.7,2.7h6.3V11.9H2.5c-0.5,0-0.8,0.4-0.8,0.8V22z M1.7,22'/%3E %3Cpath fill='#FA1100' class='st0' d='M0,9.6c0,0.4,0.4,0.8,0.8,0.8h9.9V5.8h-8C1.2,5.8,0,7.1,0,8.6V9.6z M0,9.6'/%3E %3Cpath fill='#FA1100' class='st0' d='M12.2,5.8v4.6h9.5c0.4,0,0.8-0.4,0.8-0.8v-1c0-1.5-1.2-2.7-2.7-2.7H12.2z M12.2,5.8'/%3E %3Cpath fill='#FA1100' class='st0' d='M19.3,3.9C19.3,1.6,18,0,16,0c-1.1,0-2.6,0.5-4.6,2.6C9.4,0.5,7.8,0,6.7,0c-2,0-3.4,1.6-3.4,3.9 c0,0.4,0.4,0.8,0.8,0.8h14.3C18.9,4.8,19.3,4.4,19.3,3.9L19.3,3.9z M5.1,3.1c0.2-0.8,0.7-1.5,1.6-1.5c0.8,0,1.9,0.6,2.9,1.5H5.1z M13.2,3.1c1.1-0.9,2.1-1.5,2.9-1.5c0.9,0,1.4,0.7,1.6,1.5H13.2z M13.2,3.1'/%3E %3C/g%3E %3C/svg%3E\")"},"progress_line_main .gift_item_hint":{"color":"#000","top":"-25px"},"progress_text.progress_bar_flag":{"display":"none"},"points_block":{"background-color":"#fff","padding":"30px 40px","text-align":"center"},"points_block .history_button":{"background-color":"#fa1100","color":"#fff","text-decoration":"none","text-transform":"uppercase","padding":"13px 30px","font-size":"12px","margin-top":"10px","display":"inline-block","font-weight":"300"},"bon_profile_stat":{"margin-top":"62px","margin-bottom":"0","float":"none"},"bon_profile_top_left":{"float":"none"},"progress_line_bg":{"background":"#e8e3e3"},"progress_line.progress_bar_filled":{"background":"#fa1100","border-radius":"10px","margin":"2px","height":"10px"},"progress_block":{"margin-top":"65px","width":"70%"},"points_confirmed span":{"color":"#fa1100","font-family":"Roboto","text-align":"center","line-height":"48px","vertical-align":"middle"},"points_confirmed_value":{"font-weight":"bold","font-size":"46px"},"points_confirmed_name":{"font-size":"26px","margin-left":"0"},"user_name":{"font-size":"50px","color":"#fff"},"before_gift":{"color":"#333"},"bns_hist_table td:after":{"display":"none"},"bns_hist_table td":{"padding-top":"15px","padding-bottom":"15px","border-bottom":"1px solid #E2E3E4"},"bns_hist_pager":{"float":"left","margin-top":"30px"},"bns_hist_pager a.active":{"font-size":"16px","color":"#132D61"},"modal_profile_header":{"float":"none","text-align":"center","font-weight":"bold"},"user_phone":{"display":"none"},"user_email":{"display":"none"},"answ_left":{"float":"left"},"answ_right":{"float":"right"}}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {"container":{"background-color":"#3e699e"},"bon_header":{"margin-top":"80px","text-align":"center","text-transform":"uppercase","color":"white"},"bon_header .header":{"color":"white"},"bon_sub_header":{"text-align":"center","color":"#fff","margin-top":"0"},"bon_sub_header .caption":{"color":"#fff"},"header":{"color":"#142D61","font-family":"helvetica, arial, nimbus sans l, sans-serif"},"caption":{"color":"#403C3C","font-family":"helvetica, arial, nimbus sans l, sans-serif"},"gift":{"background-color":"white","border-color":"#5386b1","border-radius":"20px","border-width":"12px","margin-top":"10px","margin-bottom":"10px","position":"relative","transition":"all .25s ease-out"},"gift:before":{"transition":"all .25s ease-out"},"gift_img":{"display":"inline"},"gift:hover":{"border-color":"#d72906"},"gift:hover:before":{"position":"absolute","width":"100%","height":"100%","background":"rgba(255, 255, 255, .8)","left":"0","top":"0","z-index":"10"},"gift:hover .bon_item_iner a.button_primary":{"visibility":"visible","opacity":"1","z-index":"11"},"gift .bon_item_iner .bon_item_name":{"visibility":"visible","opacity":"1"},"gift .bon_item_iner .bon_tem_info":{"visibility":"visible","opacity":"1"},"gift .bon_item_iner a.button_primary":{"width":"120px","top":"50%","bottom":"auto","text-shadow":"none","border":"none","padding":"13px 30px","-webkit-transform":"translateY(-50%)","-moz-transform":"translateY(-50%)","transform":"translateY(-50%)","margin-left":"-60px"},"gift_name":{"color":"#333","font-family":"helvetica, arial, nimbus sans l, sans-serif"},"gift_points":{"color":"#514D4D","font-family":"helvetica, arial, nimbus sans l, sans-serif","font-size":"16px","font-weight":"bold","opacity":"1"},"description":{"color":"#333","font-family":"helvetica, arial, nimbus sans l, sans-serif","font-size":"14px"},"bns_overlay_gift .modal_container":{"padding":"0","width":"500px"},"modal_gift_container":{"text-align":"center","padding-top":"20px","background-color":"white"},"modal_gift_container .gift_more_block":{"width":"100%","text-align":"left","margin-top":"30px","background":"#ededed","padding":"0 50px 40px"},"modal_gift_name":{"color":"#136AA1","font-size":"30px","font-family":"helvetica, arial, nimbus sans l, sans-serif","margin-top":"30px"},"modal_gift_points":{"color":"#fa1100","font-family":"helvetica, arial, nimbus sans l, sans-serif","font-size":"20px","opacity":"1"},"modal_gift_points:before":{"content":"'-'"},"modal_gift_description":{"color":"#403C3C","font-family":"helvetica, arial, nimbus sans l, sans-serif","font-size":"16px","line-height":"24px","margin-top":"32px","margin-bottom":"34px"},"modal_gift_buttons .button_primary":{"width":"168px","line-height":"39px","font-weight":"bold","text-align":"center","padding":"0"},"modal_gift_buttons .button_primary:nth-child(1)":{"float":"right"},"bns_overlay_gift_complete .modal_container,\n.bns_overlay_notify .modal_container":{"width":"500px"}}

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {"icon:after":{"content":"''","width":"100%","height":"100%","display":"block","background-size":"cover","background-repeat":"no-repeat","background-image":"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' viewBox='0 0 1000 1000' enable-background='new 0 0 1000 1000' fill='red' xml:space='preserve'%3E %3Cmetadata%3E Svg Vector Icons : http://www.onlinewebfonts.com/icon %3C/metadata%3E %3Cg%3E%3Cpath d='M683.3,104.1l212.3,215l60.8-63.5c0,0,79.8-94.6-6.8-186.6C863.2-23,780.2,20.3,760.4,32C737,47.3,683.3,104.1,683.3,104.1z M636,151.5L72.2,715.3L10,988.4l277.2-59.5l561.1-565.2L636,151.5z M265.5,786.9l-55.4-52.7L638.7,307l54.1,52.7L265.5,786.9z'/%3E%3C/g%3E %3C/svg%3E\")"}}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {"container":{"background":"white","padding-bottom":"88px"},"bon_header":{"text-align":"center","font-size":"42px","text-transform":"uppercase","margin-top":"80px","margin-bottom":"80px"},"bon_sub_header":{"display":"none"},"leaderboard ul li":{"list-style":"none"},"leaderboard__list":{"max-width":"600px","box-sizing":"border-box","padding":"0 10px","margin":"0 auto 20px","float":"none"},"leaderboard__list-item":{"display":"inline-block","width":"100%","position":"relative","box-sizing":"border-box","z-index":"1","font-size":"0","height":"50px","padding":"9px","margin-bottom":"23px","background":"#EDEDED","border-radius":"30px"},"leaderboard__list-item.type_current":{"background":"#6385b5"},"leaderboard__list-item.type_current span":{"color":"white"},"leaderboard__list-item.type_headers":{"margin-bottom":"5px","margin-top":"20px","display":"none"},"leaderboard__list-item.type_headers span":{"font-size":"18px"},"leaderboard__list-item span":{"display":"inline-block","vertical-align":"middle","overflow":"hidden","text-overflow":"ellipsis","white-space":"nowrap"},"leaderboard__list-item__photo":{"height":"18px","display":"inline-block","vertical-align":"top"},"leaderboard__list-item__rank":{"line-height":"32px","font-size":"16px","width":"32px","text-align":"center","vertical-align":"middle","background-color":"#FA1100","color":"white","border-radius":"50%"},"leaderboard__list-item__name":{"font-size":"14px","width":"100%","text-align":"center","position":"absolute","left":"0","top":"32%"},"leaderboard__list-item__score":{"line-height":"22px","font-size":"11px","padding":"1px 20px","color":"white","border-radius":"30px","float":"right","margin-top":"4px","background-color":"#43A5D6"},"leaderboard__list-item__score:after":{"content":"' bonus'"}}

/***/ }
/******/ ]);