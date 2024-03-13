// ==UserScript==
// @name         StravaActivityFeedAutoScroll
// @namespace    https://github.com/fjungclaus
// @downloadURL  https://github.com/fjungclaus/StravaActivityFeedAutoScroll/raw/main/StravaActivityFeedAutoScroll.user.js
// @updateURL    https://github.com/fjungclaus/StravaActivityFeedAutoScroll/raw/main/StravaActivityFeedAutoScroll.user.js
// @supportURL   https://github.com/fjungclaus/StravaActivityFeedAutoScroll/issues
// @version      1.0.1
// @description  Scroll Strava activity feed to the end
// @author       Frank Jungclaus, DL4XJ
// @match        https://www.strava.com/dashboard*
// @grant        none
// @run-at document-end
// ==/UserScript==



(function() {
    'use strict';

    // next scroll after scrollSpeed milli secs
    var scrollSpeed = 2000;

    // Stop scrolling when this text appears
    var stopText = "Keine weitere aktuelle Aktivit"; // German ...


    if (!confirm("Start scrolling to the end?")) return;

    var scrollTimer;
    var scrollCount = 0;
    var tStart;

    function scrollDown() {
        scrollCount++;
        window.scrollTo(0, document.body.scrollHeight - 50);
        // console.log("Scroll ...");

        if (document.body.innerHTML.search(stopText) > 0 || scrollCount >= 100) {
            clearInterval(scrollTimer);
            console.log("done ... " + scrollCount + " scrolls in " + (Date.now() - tStart) + "ms");
        }
    }

    function startScrolling() {
        scrollTimer = setInterval(scrollDown, scrollSpeed);
    }

    window.onload = function() {
        tStart = Date.now();
        startScrolling();
        console.log("onload ...");
    };
})();
