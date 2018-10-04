<!DOCTYPE html>
<html lang="ru" ng-app="app">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Микротендер.рф</title>
    <link rel="apple-touch-icon" sizes="57x57" href="/fav/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/fav/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/fav/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/fav/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/fav/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/fav/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/fav/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/fav/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/fav/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/fav/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/fav/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/fav/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/fav/favicon-16x16.png">
    <link rel="manifest" href="/fav/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/fav/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <link rel="stylesheet" text="text/css" href="/css/style.css">
  </head>
  <body ng-cloak ng-controller="bodyCtrl as bodyCtrl">
    <div class="wrapper">
      <header class="header">
        <div class="container">
          <div class="logo"><a href="#/" class="logo__link">
              <div class="logo__site">Микротендер<span class="logo__domain">.рф</span></div>
              <div class="logo__subtitle">портал выгодных сделок</div></a></div>
          <div class="header__divider"></div>
          <ul class="menu">
            <li class="menu__item"><a href="#/about" class="menu_item-link">о проекте</a></li>
            <li class="menu__item"><a href="#/want" class="menu_item-link">хочу получать заявки на просчёт</a></li>
          </ul>
          <button ng-click="bodyCtrl.call('call')" class="button button_white header__call-button">Связаться с нами</button>
        </div>
      </header>
      <div class="content container">
        <ng-view autoscroll="true"></ng-view>
      </div>
      <div class="empty"></div>
    </div>
    <footer class="footer">
      <div class="container footer__container">
        <div class="footer__copyright">© 2016 All rights reserved | </div>
        <div ng-click="bodyCtrl.call('signin')" class="footer__signin">admin</div>
      </div>
    </footer>
    <script src="/js/lib.js"></script>
    <script src="/js/app.js"></script>
  </body>
</html>