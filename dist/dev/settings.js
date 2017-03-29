(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	window.SAILPLAY_MAGIC_CONFIG = {
	  "auth": {
	    "type": "hybrid",
	    "auth_hash_id": "sailplay_magic_auth_hash",
	    "config": {
	      "texts": {
	        "login": "Login",
	        "email_and_oid_not_match": "Not match",
	        "reg_button": "Registration",
	        "email_code_notify": "To apply, we’ll need to verify your Soligent account. A confirmation code was just sent to your email. Please enter it in the field below.",
	        "done": "Continue",
	        "back": "Back"
	      },
	      "css_link": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/b5be6cce29e53682e0959c706016eb32.css",
	      "reg_match_email_oid": true,
	      "background": "transparent",
	      "disabled_options": ["socials", "agreement", "reg"]
	    }
	  },
	  "widgets": [{
	    "id": "header",
	    "enabled": true,
	    "styles": __webpack_require__(213),
	    "texts": {
	      "title": "LOYALTY PAGE",
	      "static_keys": ['Earn Soligent Bucks for every dollar you spend and bonus bucks for certain action taken.', 'Earn status levels based on spending for valuable benefits.', 'Earn many times more each quarter you exceed your threshold.']
	    },
	    "flag": {
	      "name_is_title": true
	    }
	  }, {
	    "id": "profile",
	    "enabled": true,
	    "styles": __webpack_require__(214),
	    "texts": {
	      "edit_profile_button": "EDIT PROFILE",
	      "logout": "LOG OUT",
	      "login_reg": "LOGIN / REGISTER"
	    },
	    "fill_profile": {
	      "header": "Update your profile",
	      "first_header": "Thank you for confirming your account. To complete your application for the Soligent Elite, please take less than 5 minutes to complete the remaining questions. If accepted into the Soligent Elite, this information will be used to help us craft a loyalty experience and program to better meet your needs.",
	      "terms_link": "http://yandex.ru",
	      "config": {
	        "tag": "Client filled profile",
	        "fields": [{
	          "type": "system",
	          "name": "firstName",
	          "label": "Company name",
	          "required": "true",
	          "placeholder": "Enter company name",
	          "input": "text"
	        }, {
	          "type": "system",
	          "name": "lastName",
	          "label": "Primary contact",
	          "required": "true",
	          "placeholder": "Enter primary contact",
	          "input": "text"
	        }, {
	          "type": "system",
	          "name": "addEmail",
	          "label": "Your E-Mail",
	          "required": "true",
	          "placeholder": "your@address.com",
	          "input": "email"
	        }, {
	          "type": "system",
	          "name": "addPhone",
	          "label": "Your phone number",
	          "required": "true",
	          "placeholder": "9 (999) 999-99-99",
	          "input": "phone"
	        }, {
	          "type": "system",
	          "name": "birthDate",
	          "label": "Your birth date",
	          "placeholder": "Enter your birth date",
	          "input": "date"
	        }, {
	          "type": "variable",
	          "name": "job",
	          "required": "true",
	          "label": "Please type your job",
	          "placeholder": "Job here",
	          "input": "text"
	        }, {
	          "type": "variable",
	          "label": "Please select which best describes your primary role",
	          "name": "role",
	          "required": "true",
	          "input": "select",
	          "data": [{
	            "text": "General Management / Owner"
	          }, {
	            "text": "Purchasing Management"
	          }, {
	            "text": "Purchasing Rep"
	          }, {
	            "text": "Sales Management"
	          }, {
	            "text": "Sales Rep"
	          }, {
	            "text": "Accounting"
	          }, {
	            "text": "Operations"
	          }, {
	            "text": "Shipping / Warehouse Contact"
	          }, {
	            "text": "Other"
	          }]
	        }, {
	          "type": "variable",
	          "name": "ship_address",
	          "required": "true",
	          "label": "To which address would you like all earned gifts to be shipped?",
	          "placeholder": "Address",
	          "input": "text"
	        }, {
	          "type": "variable",
	          "name": "ship_suite",
	          "placeholder": "Suite",
	          "input": "text"
	        }, {
	          "type": "variable",
	          "name": "ship_zipcode",
	          "required": "true",
	          "placeholder": "Zip code",
	          "input": "text"
	        }, {
	          "type": "variable",
	          "name": "ship_state",
	          "required": "true",
	          "placeholder": "State(initials)",
	          "input": "text"
	        }, {
	          "type": "variable",
	          "name": "ship_phone",
	          "required": "true",
	          "label": "Your ship phone number",
	          "placeholder": "9 (999) 999-99-99",
	          "input": "phone"
	        }, {
	          "type": "variable",
	          "name": "describe_business",
	          "required": "true",
	          "label": "Which best describes your business?",
	          "input": "select",
	          "data": [{
	            "text": "Residential Installer (50%+) with solar as primary business"
	          }, {
	            "text": "Residential Installer, but solar is a secondary business"
	          }, {
	            "text": "Primarily Small Commercial Installer (50%+ commercial, with projects <750 kW)"
	          }, {
	            "text": "Primarily Large Commercial Installer (50%+ commercial, with projects 750+ kW)"
	          }, {
	            "text": "Buyer and/or reseller of equipment (wholesale, distributor, retailer)"
	          }, {
	            "text": "Other"
	          }]
	        }, {
	          "type": "variable",
	          "name": "residential_solar",
	          "required": "true",
	          "label": "For the average month in the year, how many systems does your company install (per month)?",
	          "placeholder": "Residential Solar",
	          "input": "text"
	        }, {
	          "type": "variable",
	          "name": "commercial_solar",
	          "required": "true",
	          "placeholder": "Commercial Solar",
	          "input": "text"
	        }, {
	          "type": "variable",
	          "name": "describe_company",
	          "required": "true",
	          "label": "Which best describes your company?",
	          "input": "select",
	          "data": [{
	            "text": "We usually purchase equipment for several installs at a time"
	          }, {
	            "text": "We usually purchase equipment for project by project"
	          }]
	        }, {
	          "type": "variable",
	          "name": "most_factor",
	          "required": "true",
	          "label": "When you purchase solar equipment, which is the single most important factor?",
	          "input": "select",
	          "has_other": "true",
	          "data": [{
	            "text": "Module price"
	          }, {
	            "text": "Full system price"
	          }, {
	            "text": "Delivery time"
	          }, {
	            "text": "Shipping reliability/quality"
	          }, {
	            "text": "Credit Terms / Financing"
	          }]
	        }, {
	          "type": "variable",
	          "name": "module_suppliers",
	          "required": "true",
	          "label": "Which are your top 2 preferred module suppliers?",
	          "input": "multiple",
	          "max": 2,
	          "has_other": "true",
	          "data": [{
	            "text": "Canadian Solar"
	          }, {
	            "text": "Hanwha Q-Cells"
	          }, {
	            "text": "Panasonic"
	          }, {
	            "text": "Trina Solar"
	          }, {
	            "text": "Solar World"
	          }, {
	            "text": "Jinko Solar"
	          }, {
	            "text": "JA Solar"
	          }, {
	            "text": "First Solar"
	          }, {
	            "text": "Yingli Solar"
	          }, {
	            "text": "LG"
	          }, {
	            "text": "ReneSola"
	          }, {
	            "text": "SunPower"
	          }]
	        }, {
	          "type": "variable",
	          "name": "inverter_suppliers",
	          "required": "true",
	          "input": "multiple",
	          "max": 2,
	          "label": "Which are your top 2 preferred inverter suppliers?",
	          "has_other": "true",
	          "data": [{
	            "text": "ABB"
	          }, {
	            "text": "Enphase"
	          }, {
	            "text": "Fronius"
	          }, {
	            "text": "Outback"
	          }, {
	            "text": "Schneider"
	          }, {
	            "text": "SMA"
	          }, {
	            "text": "SolarEdge"
	          }, {
	            "text": "Solectria"
	          }]
	        }, {
	          "type": "variable",
	          "name": "racking_suppliers",
	          "required": "true",
	          "input": "multiple",
	          "max": 2,
	          "label": "Which are your top 2 preferred racking suppliers?",
	          "has_other": "true",
	          "data": [{
	            "text": "DPW"
	          }, {
	            "text": "ProSolar"
	          }, {
	            "text": "IronRidge"
	          }, {
	            "text": "QuickMount"
	          }, {
	            "text": "Unirac"
	          }]
	        }, {
	          "type": "variable",
	          "name": "electrical_balance",
	          "required": "true",
	          "label": "Where do you purchase most of your electrical balance of systems from?",
	          "input": "select",
	          "has_other": "true",
	          "data": [{
	            "text": "Soligent"
	          }, {
	            "text": "Other Solar Distributors"
	          }, {
	            "text": "Electrical distributor (doesn’t sell solar)"
	          }, {
	            "text": "Electrical distributor (also sells solar)"
	          }, {
	            "text": "Local hardware store"
	          }]
	        }, {
	          "type": "variable",
	          "name": "whatAbout_business",
	          "required": "true",
	          "label": "What could Soligent do to earn more of your business?",
	          "placeholder": "What about business",
	          "input": "text"
	        }, {
	          "type": "variable",
	          "name": "equipment",
	          "required": "true",
	          "input": "multiple",
	          "label": "Please check off all the following that you use for your equipment",
	          "data": [{
	            "text": "Cash Purchase"
	          }, {
	            "text": "Loans"
	          }, {
	            "text": "PPA"
	          }, {
	            "text": "PACE"
	          }, {
	            "text": "I’m also interested in hearing about Soligent’s financing options!"
	          }]
	        }, {
	          "type": "variable",
	          "name": "iphone_or_ipad",
	          "required": "true",
	          "label": "Do you or someone on your team have an iphone or ipad? (Soligent will be releasing a proprietary Suneye-alternative iOS shading app)",
	          "input": "select",
	          "data": [{
	            "text": "Yes"
	          }, {
	            "text": "No"
	          }]
	        }, {
	          "type": "variable",
	          "name": "reward",
	          "required": "true",
	          "label": "Which is the most exciting reward for your company?",
	          "input": "select",
	          "data": [{
	            "text": "Cash back / equipment discounts"
	          }, {
	            "text": "Rewards to share with the team (branded apparel, electronics, etc)No"
	          }, {
	            "text": "Solar software to help grow my business"
	          }, {
	            "text": "Marketing funds"
	          }, {
	            "text": "Other"
	          }]
	        }]
	      }
	    }
	  }, {
	    "id": "profile-progress",
	    "enabled": true,
	    "texts": {
	      "header_1_prefix": "Welcome, ",
	      "header_1_suffix": " Status Loyalty member!",
	      "header_2_prefix": "You have ",
	      "header_2_suffix": " Soligent Bucks in your account",
	      "default_status_string": "Bronze"
	    },
	    "styles": __webpack_require__(215)
	  }, {
	    "styles": __webpack_require__(216),
	    "errors": {},
	    "enabled": true,
	    "texts": {},
	    "images": {},
	    "options": {
	      "next_status_link": {
	        "title": "Link",
	        "href": "http://sailplay.net"
	      },
	      "monthly_special": {
	        "icon": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/9b8ee7abe95c24fad2f209f806bed336.jpg",
	        "texts": ['text 1', 'text 2', 'text 3']
	      }
	    },
	    "id": "soligent-status-account"
	  }, {
	    "styles": __webpack_require__(217),
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
	    "id": "gifts-grid",
	    "options": {
	      "hiddenAnonymous": "true"
	    }
	  }, {
	    "styles": __webpack_require__(218),
	    "errors": {},
	    "enabled": true,
	    "texts": {
	      "perform": "Share",
	      "header": "Earn even more points"
	    },
	    "options": {
	      "hiddenAnonymous": "true"
	    },
	    "images": {},
	    "id": "card-quests"
	  }],
	  "tools": {
	    "buttons": {
	      "styles": __webpack_require__(219),
	      "texts": {
	        "close": "Close",
	        "save": "Save",
	        "ok": "OK",
	        "get": "GET"
	      }
	    },
	    "points": {
	      "texts": {
	        "pluralize": "S-Buck,S-Bucks,S-Bucks"
	      }
	    },
	    "forms": {
	      "styles": {
	        "form_field": {
	          "width": "100%"
	        },
	        "magic_select": {
	          "appearance": "none"
	        }
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
	    "notifier": {
	      "styles": {
	        "notifier_body": {
	          "color": "black",
	          "font-family": "Tahome",
	          "font-weight": 300
	        },
	        "notifier_header": {
	          "color": "black",
	          "font-size": "26px",
	          "font-family": "Tahome"
	        }
	      },
	      "texts": {
	        "congratulations": "Congratulations!",
	        "error": "An error occurred"
	      }
	    },
	    "modal": {}
	  },
	  "data": {
	    "status": {
	      "list": [{
	        "texts": ["• Access to Exclusive Promotions", "• 10x multiplier for surpassing your threshold"],
	        "sum": "0",
	        "name": "Elite",
	        "icon": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/9b8ee7abe95c24fad2f209f806bed336.jpg"
	      }, {
	        "texts": ["• Access to Exclusive Promotions", "• Free Admission for Regional Full Day Vendor Trainings ($95 value)", "• Soligent iOS Shading App Subscription", "• Silver Dealer Seal provided for website & for Silver Dealer Apparel", "• 20% Discount on Solar Engine Full Design Package", "• 12x multiplier for surpassing your threshold"],
	        "sum": "100000",
	        "name": "Silver",
	        "icon": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/9b8ee7abe95c24fad2f209f806bed336.jpg"
	      }, {
	        "texts": ["• Access to Exclusive Promotions", "• Free Admission for Regional Full Day Vendor Trainings ($95 value)", "• Soligent iOS Shading App Subscription", "• Gold Dealer Seal provided for website & for Silver Dealer Apparel", "• 20% Discount on Solar Engine Full Design Package", "• 50% Discount on Restocking Fee for Returns", "• 15x multiplier for surpassing your threshold"],
	        "sum": "250000",
	        "name": "Gold",
	        "icon": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/9b8ee7abe95c24fad2f209f806bed336.jpg"
	      }, {
	        "texts": ["• Access to Exclusive Promotions", "• Free Admission for Regional Full Day Vendor Trainings ($95 value)", "• Soligent iOS Shading App Subscription", "• Platinum Dealer Seal provided for website & for Silver Dealer Apparel", "• 20% Discount on Solar Engine Full Design Package", "• 50% Discount on Restocking Fee for Returns", "• Invites to Exclusive Events with Soligent Executive Team", "• 17.5x multiplier for surpassing your threshold"],
	        "sum": "500000",
	        "name": "Platinum",
	        "icon": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/9b8ee7abe95c24fad2f209f806bed336.jpg"
	      }, {
	        "texts": ["• Access to Exclusive Promotions", "• Free Admission for Regional Full Day Vendor Trainings ($95 value)", "• Soligent iOS Shading App Subscription", "• Platinum Dealer Seal provided for website & for Silver Dealer Apparel", "• 20% Discount on Solar Engine Full Design Package", "• 50% Discount on Restocking Fee for Returns", "• Invites to Exclusive Events with Soligent Executive Team", "• 30x multiplier for surpassing your threshold"],
	        "sum": "1000000",
	        "name": "Diamond",
	        "icon": "https://sailplays3.cdnvideo.ru/media/assets/assetfile/9b8ee7abe95c24fad2f209f806bed336.jpg"
	      }]
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
	    }
	  }
	};

/***/ },

/***/ 213:
/***/ function(module, exports) {

	module.exports = {"container":{"height":"380px","background-image":"url(https://sailplays3.cdnvideo.ru/media/assets/assetfile/9b8ee7abe95c24fad2f209f806bed336.jpg)","background-size":"cover","background-position":"top left","background-repeat":"no-repeat"},"header_title":{"font-size":"36px","font-weight":"bold","color":"black","text-align":"center"},"header_static_keys":{"list-style":"disc","position":"absolute","width":"40%","right":"5%","bottom":"5%","color":"white"},"header_static_keys li":{"margin-bottom":"1em"}}

/***/ },

/***/ 214:
/***/ function(module, exports) {

	module.exports = {"container":{"position":"absolute","top":"-380px","background-color":"transparent"},"edit_profile_btn, .logout_btn":{"position":"absolute","left":"50%","top":"80px","-webkit-transform":"translateX(-50%)","transform":"translateX(-50%)","display":"inline-block","padding":"8px 20px","background":"#00679b","border-radius":"20px","font-size":"12px","text-decoration":"none"},"logout_btn":{"top":"80px","left":"calc(50% + 116px)"},"bon_profile_right":{"float":"none","margin":"50px auto 0"},"user_name":{"display":"none"},"user_phone":{"display":"none"},"user_avatar_image":{"display":"none"},"points_confirmed":{"display":"none"},"bon_profile_stat":{"display":"none"}}

/***/ },

/***/ 215:
/***/ function(module, exports) {

	module.exports = {"container":{"background-color":"white"}}

/***/ },

/***/ 216:
/***/ function(module, exports) {

	module.exports = {"soligent-sa-block-link":{"color":"#00679b"},"soligent-sa-block-link:hover":{"text-decoration":"none"}}

/***/ },

/***/ 217:
/***/ function(module, exports) {

	module.exports = {"modal_gift_description":{"color":"black","font-size":"18px","font-family":"Tahoma"},"header":{"font-size":"42px","color":"black","width":"100%","text-transform":"uppercase","z-index":"2","position":"relative","font-family":"Tahoma","display":"block","text-align":"center"},"gifts_grid__header":{"margin-top":"60px","text-align":"center"},"gifts_grid__block":{"width":"90%","float":"none","margin":"20px auto"},"bns_overlay_gift .modal_container":{"width":"500px"},"container":{"position":"relative","min-height":"300px","background-color":"white","padding-bottom":"50px"},"gift_points":{"opacity":"1","color":"rgba(0, 0, 0, 0.5)","font-size":"16px","font-family":"Tahoma"},"modal_gift_name":{"color":"black","font-size":"36px","font-family":"Tahoma"},"gift_img":{"position":"absolute","width":"160px","height":"auto","top":"40px","left":"0","right":"0","margin":"auto"},"gifts_grid__item > .button_primary":{"opacity":"0","margin-top":"20px","visibility":"hidden"},"gifts_grid__item:hover .button_primary":{"opacity":"1","visibility":"visible"},"gifts_grid__item:hover":{"border":"1px solid #136995"},"bns_overlay_gift_complete .modal_container,\n.bns_overlay_notify .modal_container":{"width":"500px"},"gifts_grid__item":{"border-radius":"5px","padding-top":"230px","text-align":"center","border":"1px solid transparent"},"gift_name":{"color":"#333","font-size":"18px","font-family":"Tahoma","margin-bottom":"10px"},"modal_gift_container .gift_more_block":{"width":"100%","margin-top":"30px","padding-top":"10px","text-align":"left","padding-left":"0"},"gift":{"background-size":"cover","background-repeat":"no-repeat","margin-bottom":"10px","margin-top":"10px","background-color":"rgba(255, 255, 255, 0.0)"},"modal_gift_container":{"text-align":"center"},"modal_gift_points":{"color":"rgba(0, 0, 0, 0.5)","opacity":"1","font-size":"20px","font-family":"Tahoma"}}

/***/ },

/***/ 218:
/***/ function(module, exports) {

	module.exports = {"actions_selected_modal .action_image":{"width":"100%","text-align":"center"},"header":{"font-size":"42px","color":"black","width":"100%","text-transform":"uppercase","z-index":"2","position":"relative","font-family":"Tahoma","display":"block","text-align":"center"},"card_quests":{"max-width":"1200px","padding-top":"40px","margin":"0 auto","display":"block"},"quest_card_points":{"color":"#939393","padding":"6px","font-size":"18px","font-family":"Tahoma","font-weight":"300"},"quest_card_image img":{"right":"0","bottom":"0","top":"0","height":"35%","width":"auto","position":"absolute","margin":"auto","left":"0"},"quest_card_container_custom-action .quest_card_image img":{"height":"100%"},"actions_selected_modal .action_tools":{"padding":"30px","width":"100%"},"container":{"position":"relative","background-color":"#F2F2F2","padding-bottom":"50px"},"quest_card_buttons":{"padding-top":"45px"},"quest_card_container":{"width":"33.3%"},"quest_card_image":{"border-radius":"50%","float":"left","height":"90px","width":"90px","position":"relative","overflow":"hidden","margin":"20px 0 0 20px","background-color":"#edf3f5"},"quest_card":{"float":"left","background":"white"},"card_quests_caption":{"width":"90%","font-size":"14px","margin-top":"10px","margin-left":"5%"},"quest_card_name":{"color":"#111","padding":"6px","font-size":"16px","font-weight":"300","font-family":"Tahoma"},"modal_action_name":{"color":"black","font-size":"36px","font-family":"Tahoma"},"card_quests_list":{"width":"100%"},"quest_card_tools":{"max-width":"65%","width":"100%","float":"left","padding":"30px 10px 30px 20px","background-color":"#fff"},"modal_action_points":{"color":"grey","font-size":"20px","font-family":"Tahoma"},"actions_selected_modal .gift_more_img":{"width":"auto","margin":"30px auto","display":"inline-block","height":"120px"},"caption":{"color":"rgba(0, 0, 0, 0.5)","width":"100%","display":"inline-block","text-align":"center"},"modal_action_description":{"color":"black","font-size":"14px","font-weight":"300","font-family":"Tahoma"},"actions_custom_selected_modal .modal_container":{"padding":"20px","width":"800px"},"actions_selected_modal .modal_container":{"padding":"0"},"card_quests_header":{"font-size":"48px","font-weight":"300","color":"#000","margin-bottom":"0","font-family":"Tahoma","text-align":"center"}}

/***/ },

/***/ 219:
/***/ function(module, exports) {

	module.exports = {"button_primary":{"border-radius":"25px","cursor":"pointer","font-size":"14px","font-family":"Tahoma","color":"#fff","height":"auto","text-align":"center","padding":"15px 25px","min-width":"150px","text-shadow":"none","line-height":"120%","text-decoration":"none","font-weight":"400","border":"none","display":"inline-block","background-color":"#136995"},"button_primary:hover":{"background-color":"#347595"}}

/***/ }

})
});
;