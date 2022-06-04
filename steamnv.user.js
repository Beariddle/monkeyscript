// ==UserScript==
// @name          STEAMNV
// @namespace     https://github.com/Beariddle/monkeyscript/
// @author        Beariddle
// @version       1.42
// @description		Automatically verifies the Steam age verification, and/or complies with the NSFW warning webpage, for the Steam store and Community Hub.
// @license       MIT; https://github.com/Beariddle/monkeyscript/blob/main/LICENSE.md
// @downloadURL   https://raw.githubusercontent.com/Beariddle/monkeyscript/main/steamnv.user.js
// @updateURL     https://raw.githubusercontent.com/Beariddle/monkeyscript/main/steamnv.user.js
// @supportURL    https://github.com/Beariddle/monkeyscript/issues
// @grant         none
// @icon          https://store.steampowered.com/favicon.ico
// @match         *://store.steampowered.com/agecheck/*
// @match         *://steamcommunity.com/*
// @run-at        document-idle
// ==/UserScript==

/* Insert desired date of birth in-between the quotes. Leave the values in-between quotes empty, otherwise.
 * Day format: Numbers below ten do not need a '0'.
 * [Correct] 1, 2, 3, 4, ... || [incorrect] 01, 02, 03, ...
 * Month format: must be written in full with a capital letter.
 * E.g. January, February, March etc... */
const Day   = '';
const Month	= '';
const Year	= '';

// Define elements.
const ageDay		= document.getElementById('ageDay');
const ageMonth	= document.getElementById('ageMonth');
const ageYear		= document.getElementById('ageYear');
const agecheck_btn   = document.getElementsByClassName('btnv6_blue_hoverfade btn_medium')[0];
const agegate_btn    = document.getElementById('age_gate_btn_continue');
const partnerhub_btn = document.getElementsByClassName('partnereventshared_Button_1ABCO')[0];

// Automatically generate a date of birth.
function agecheck(months, rMonth) {
  // Generate the months.
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  rMonth = Math.floor(Math.random() * months.length);

  // Insert date values.
  ageDay.value		= Math.floor((Math.random() * 28) + 1);
  ageMonth.value	= months[rMonth];
  ageYear.value		= Math.floor(Math.random() * (2000 - 1960)) + 1960;
}

// Insert values in the form and automatically click the 'view page' button on the corresponding NSFW warning subpages.
if(location.hostname === 'store.steampowered.com' && location.pathname.match('/agecheck/')) {
  if(Day <= null && Month <= null && Year <= null){
    agecheck();
  } else {
    ageDay.value		= Day;
    ageMonth.value	= Month;
    ageYear.value		= Year;
  }
  agecheck_btn.click();
} else if (location.hostname === 'steamcommunity.com') {
  if(location.pathname.match('/app/') || location.pathname.match('/sharedfiles')) {
    agegate_btn.click();
  } else if (location.pathname.match('/games/')) {
    partnerhub_btn.click();
  }
}
