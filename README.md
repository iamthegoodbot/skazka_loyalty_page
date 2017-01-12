# SailPlay Magic

## Current version

### 2.1.0

## Description

Multi functional, fully-configurable, widget-based loyalty page

## Setup

At first, you need to setup JSON config for required partner in admin panel: 

[https://sadmin.sailplay.net/admin](https://sadmin.sailplay.net/admin)
    
Then, place this code to any place in your page:
    
```html
  <script src="https://cdn.rawgit.com/iamthegoodbot/skazka_loyalty_page/2.1.0/dist/prod/sailplay-magic.js"></script>
  <sailplay-magic></sailplay-magic>
  <script>

    var magic = new SAILPLAY.Magic({

      partner_id: "${Your partner id}",
      domain: "https://sailplay.net",
      lang:  "en",
      config: "name of config"

    });

  </script>
```