/**
 * Yinxin Sun's CV — interactions: language toggle, print button, WeChat dialog.
 * Plain JavaScript, no dependencies.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "cv-lang";
  var WECHAT_ID = "sunforthree";

  var TITLES = {
    en: "Yinxin Sun — Linux System & Network Engineer",
    cn: "孙寅鑫 — Linux 系统与网络工程师",
  };

  var DIALOG_TEXT = {
    en: {
      title: "WeChat ID",
      desc: "Copy the WeChat ID below to add me on WeChat.",
      copy: "Copy",
      copied: "Copied!",
    },
    cn: {
      title: "微信号",
      desc: "点击复制下方微信号，添加我为好友。",
      copy: "复制",
      copied: "已复制！",
    },
  };

  function currentLang() {
    return document.documentElement.getAttribute("data-lang") === "cn" ? "cn" : "en";
  }

  function setLanguage(lang, persist) {
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.lang = lang === "cn" ? "zh-CN" : "en";
    document.title = TITLES[lang];

    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-label", lang === "cn" ? "Switch to English" : "切换到中文");
    });

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) { /* storage unavailable */ }
    }
  }

  // Sync title/labels with the initial language chosen by the inline
  // <head> script (which also covers the no-JS default of English).
  setLanguage(currentLang(), false);

  document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLanguage(currentLang() === "en" ? "cn" : "en", true);
    });
  });

  document.querySelectorAll("[data-print]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      window.print();
    });
  });

  // --- WeChat dialog -------------------------------------------------------
  var dialog = document.getElementById("wechat-dialog");
  var dialogTitle = document.getElementById("wechat-dialog-title");
  var dialogDesc = document.getElementById("wechat-dialog-desc");
  var dialogCopy = document.getElementById("wechat-dialog-copy");
  var dialogClose = document.getElementById("wechat-dialog-close");
  var copiedTimer = null;

  function openWeChatDialog() {
    var text = DIALOG_TEXT[currentLang()];
    dialogTitle.textContent = text.title;
    dialogDesc.textContent = text.desc;
    dialogCopy.textContent = text.copy;
    dialog.showModal();
    dialogCopy.focus();
  }

  document.querySelectorAll("[data-wechat]").forEach(function (btn) {
    btn.addEventListener("click", openWeChatDialog);
  });

  dialogClose.addEventListener("click", function () {
    dialog.close();
  });

  // Close when clicking the backdrop (clicks land on <dialog> itself
  // because all inner content lives inside .dialog-body).
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialogCopy.addEventListener("click", function () {
    var text = DIALOG_TEXT[currentLang()];

    function done(ok) {
      dialogCopy.textContent = ok ? text.copied : text.copy;
      clearTimeout(copiedTimer);
      copiedTimer = setTimeout(function () {
        dialogCopy.textContent = text.copy;
      }, 1500);
    }

    function fallbackCopy() {
      var textarea = document.createElement("textarea");
      textarea.value = WECHAT_ID;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      var ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (e) { /* ignore */ }
      document.body.removeChild(textarea);
      done(ok);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(WECHAT_ID).then(
        function () { done(true); },
        fallbackCopy
      );
    } else {
      fallbackCopy();
    }
  });
})();
