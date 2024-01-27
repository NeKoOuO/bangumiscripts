// ==UserScript==
// @name        Bangumi-Hyperlinks
// @namespace   BE
// @description Add Twitter, Instagram, Pixiv, and Amazon links based on Infobox content
// @homepage    https://github.com/NeKoOuO/bangumiscripts
// @homepage    https://greasyfork.org/scripts/485821-bangumi-hyperlinks
// @include     /https?:\/\/(bgm|bangumi|chii)\.(tv|in)\/(person|subject)\/\d+$/
// @version     0.1.1
// @grant       none
// ==/UserScript==

// Function to add social media and Pixiv links in Infobox
function addLinks() {
    $('#infobox').html(function(index, html) {
        // Add Twitter link
        html = html.replace(/([Tt]witter[^:]*): <\/span\>@?(https?:\/\/twitter\.com\/|)([\w\d_]+)/gi, '$1: </span><a class="l" href="https://twitter.com/$3" target="_blank">@$3</a>');

        // Add Instagram link
        html = html.replace(/([Ii]nstagram[^:]*): <\/span\>@?([^\s<]+)/gi, function(match, p1, p2) {
            var username = p2.replace(/https?:\/\/www.instagram.com\//, ''); // Remove leading URL
            return p1 + ': </span><a class="l" href="https://www.instagram.com/' + username + '" target="_blank">@' + username + '</a>';
        });

        // Add Pixiv link
        html = html.replace(/([Pp]ixiv[^:]*): <\/span\>@?(https?:\/\/www\.pixiv\.net\/(en\/)?users?\/|)([\w\d_]+)/gi, function(match, p1, p2, p3, p4) {
            var userId = p4;
            var pixivUrl = p2.includes('en') ? 'https://www.pixiv.net/member.php?id=' + p4 : 'https://www.pixiv.net/users/' + userId;
            return p1 + ': </span><a class="l" href="' + pixivUrl + '" target="_blank">@' + userId + '</a>';
        });

        return html;
    });
}


// Function to add Amazon link by ISBN in subject page Infobox
function addAmazonLinkByISBN() {
    $('#infobox').html((function() {
        var isbnMatch = $('#infobox').html().match(/ISBN: <\/span\>([\dX\-]+)/);
        if (typeof isbnMatch == "undefined") return $('#infobox').html();

        var isbn = isbnMatch[1].replace(/\-/g, '');
        if (isbn.length == 13) {
            isbn = isbn.substr(3, 9);
            var tmp = 0;
            for (var i = 0; i <= 8; i++) {
                tmp += parseInt(isbn[i]) * (10 - i);
            }
            tmp = 11 - (tmp % 11);
            if (tmp == 10) tmp = "X";
            if (tmp == 11) tmp = "0";
            isbn += ("" + tmp);
        }

        return $('#infobox').html().replace(/ISBN: <\/span\>([\dX\-]+)/, 'ISBN: </span>$1 <a class="l" href="https://www.amazon.co.jp/dp/' + isbn + '" target="_blank">日本Amazon</a>');
    }));
}

// Check the URL to determine which function to execute
if (window.location.pathname.includes('/person/') || window.location.pathname.includes('/subject/')) {
    addLinks(); // Execute link addition
    addAmazonLinkByISBN(); // Execute Amazon link addition by ISBN
}
