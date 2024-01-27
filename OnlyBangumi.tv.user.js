// ==UserScript==
// @name        Only-Bangumi.tv
// @namespace   BLDF
// @description Point all domain names to bangumi.tv
// @include     /^https?:\/\/(doujin\.|)(bgm\.tv|bangumi\.tv)/
// @version     0.0.3
// @grant       none
// ==/UserScript==

(function() {
  // 取得目前使用的域名
  var domain = "bangumi.tv";
  var protocol = window.location.protocol;

  var links = document.getElementsByTagName('a');

  for(var j = 0, len = links.length; j < len; j++) {
    var link = links[j];
    if (link.href.match(/https?:\/\/(doujin\.|)(bgm\.tv|bangumi\.tv)/)) {
      link.href = link.href.replace(/https?:\/\/(doujin\.|)(bgm\.tv|bangumi\.tv)/, protocol + '//' + domain);
      link.innerHTML = link.innerHTML.replace(/https?:\/\/(doujin\.|)(bgm\.tv|bangumi\.tv)/, protocol + '//' + domain);
    }
  }
})();
