'use strict';

import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;

class JenkinsLoginUiGeneralizer {
  constructor() {
    this.init();
  }

  init() {
    if (!this.judgeIfJenkinsPage()) return;

    this.generalizeUi();
  }

  judgeIfJenkinsPage() {
    return location.href.indexOf('https://jenkins-master') === 0;
  }

  judgeIfJenkinsLoginPage() {
    return !this.judgeIfJenkinsLoginErrorPage() && location.href.indexOf('/login') >= 0;
  }

  judgeIfJenkinsLoginErrorPage() {
    return location.href.indexOf('/loginError') >= 0;
  }

  generalizeUi() {
    if (this.judgeIfJenkinsLoginPage()) {
      $('#side-panel').remove();
      $('#main-panel').find('form').find('tr:last-child').remove();

      $('#main-panel').prepend(`
        <style>
          #main-panel {
            margin-left: 0 !important;
            padding: 0;
          }

          #main-panel form {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          #main-panel form td {
            padding: 0.5em;
            font-size: 18px;
            color: #444444;
          }

          #main-panel form td input {
            width: 360px;
            padding-bottom: 4px;
            border: 0;
            outline: 0;
            border-bottom: 3px solid #444444;
            font-family: monospace;
            font-size: inherit;
            font-style: italic;
            transition: border-bottom-color 300ms ease-out;
          }

          #main-panel form td input:focus {
            border-bottom-color: #4B758B;
          }

          #main-panel form > .yui-button.yui-submit-button {
            position: absolute;
            left: 50%;
            margin-top: 20px;
            transform: translate(-50%);
          }

          #main-panel form > .yui-button.yui-submit-button button {
            padding: 6px 24px;
            border: 0;
            outline: 0;
            border-radius: 4px;
            font-size: 16px;
            transition: filter 300ms ease-out;
          }

          #main-panel form > .yui-button.yui-submit-button button:hover,
          #main-panel form > .yui-button.yui-submit-button button:active, {
            filter: brightness(125%);
          }
        </style>
      `);

    } else if (this.judgeIfJenkinsLoginErrorPage()) {
      $('#side-panel').remove();

      $('#main-panel').prepend(`
        <style>
          #main-panel {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: 0 !important;
            padding: 0;
            font-size: 16px;
            transform: translate(-50%, -50%);
          }

          #main-panel div > a {
            display: inline-block;
            margin-top: 1em;
          }

          #main-panel div > a:hover,
          #main-panel div > a:active {
            text-decoration: none;
          }

          #main-panel div > div {
            line-height: 1.5em;
          }
        </style>
      `);
    }
  }
}

new JenkinsLoginUiGeneralizer();

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
});
