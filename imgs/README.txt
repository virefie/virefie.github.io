Add this to your HTML <head>:

    <link rel="icon" href="imgs/favicon.ico" sizes="any">
    <link rel="apple-touch-icon" href="imgs/apple-touch-icon.png">



     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#0289f5" />
    <link rel="manifest" href="manifest.json" />
    <link rel="icon" type="image/png" sizes="192x192" href="atr/tpsp192.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="atr/tpsp512.png" />
    <link rel="icon" href="atr/tpsp512.png">

Add this to your app's manifest.json:

    ...
    {
      "icons": [
        { "src": "imgs/favicon.ico", "type": "image/x-icon", "sizes": "16x16 32x32" },
        { "src": "imgs/icon-192.png", "type": "image/png", "sizes": "192x192" },
        { "src": "imgs/icon-512.png", "type": "image/png", "sizes": "512x512" },
        { "src": "imgs/icon-192-maskable.png", "type": "image/png", "sizes": "192x192", "purpose": "maskable" },
        { "src": "imgs/icon-512-maskable.png", "type": "image/png", "sizes": "512x512", "purpose": "maskable" }
      ]
    }
    ...
