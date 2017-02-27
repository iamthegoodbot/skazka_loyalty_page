# SailPlay Magic

> And when you left alone, you left alone it was tragic
>
> But we, we both know now, we both know now it was magic
>
> And when you left alone, you left alone it was tragic
>
> But we, we both know now
>
> We both know now, this was magic, magic
>
> -- <cite>Wasted Penguinz</cite>

## Current version

### 2.1.4

## Description

Multi functional, fully-configurable, widget-based loyalty page

## Setup

At first, you need to setup JSON config for required partner in admin panel: 

[https://sadmin.sailplay.net/admin](https://sadmin.sailplay.net/admin)
    
Then, place this code to any place in your page:
    
```html
  <script src="https://cdn.rawgit.com/iamthegoodbot/skazka_loyalty_page/2.1.2/dist/prod/sailplay-magic.js"></script>
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
