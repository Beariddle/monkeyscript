// ==UserScript==
// @name             STEAMNV
// @namespace        Steam NSFW Verification
// @description      Automatically verifies the Steam age verification, and/or complies with the NSFW warning webpage, for the Steam store and Community Hub.
// @version          1.35
// @author           Beariddle
// @license          MIT; https://github.com/Beariddle/monkeyscript/blob/main/LICENSE.md
// @supportURL       https://github.com/Beariddle/monkeyscript/issues
// @downloadURL      https://raw.githubusercontent.com/Beariddle/monkeyscript/main/steamnv.user.js
// @updateURL        https://raw.githubusercontent.com/Beariddle/monkeyscript/main/steamnv.user.js
// @icon             https://store.steampowered.com/favicon.ico
// @match            https://store.steampowered.com/agecheck/*
// @match            https://steamcommunity.com/*
// ==/UserScript==
const pathname = location.pathname;
const hostname = location.hostname;

const agecheck_btn   = document.getElementsByClassName('btnv6_blue_hoverfade btn_medium')[0];
const agegate_btn    = document.getElementById('age_gate_btn_continue');
const partnerhub_btn = document.getElementsByClassName('partnereventshared_Button_1ABCO')[0];

function agecheck(months, rMonth) {
  // Automatically generate a date of birth.
  // Generate the months.
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  rMonth = Math.floor(Math.random() * months.length);

  // Insert date values.
  // Replace values with a static value when a specific date of birth is desired.
  document.getElementById('ageDay').value = Math.floor((Math.random() * 28) + 1);
  document.getElementById('ageMonth').value = months[rMonth];
  document.getElementById('ageYear').value = Math.floor(Math.random() * (2000 - 1960)) + 1960;

  // Automatically click the 'view page' button.
  agecheck_btn.click();
} // End of function agecheck

if(hostname === 'store.steampowered.com') {
  if(pathname.match('/agecheck/')) {
    agecheck();
  }
} else if (hostname === 'steamcommunity.com') {
  if(pathname.match('/app/') || pathname.match('/sharedfiles')) {
    // Automatically click the 'view page' button on the NSFW warning webpages for the Steamcommunity hub.
    agegate_btn.click();
  } else if (pathname.match('/games/')) {
    // Automatically click the 'view page' button on the NSFW warning webpage for pathname '/games/'.
    partnerhub_btn.click();
  }
}
