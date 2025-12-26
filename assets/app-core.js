(function () {
  const APP = (window.SSAPP = window.SSAPP || {});
  APP.base = "https://efreningles01-code.github.io/ss-modulos";
  APP.v = "1";

  APP.loadCss = (url) => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = url + "?v=" + APP.v;
    document.head.appendChild(l);
  };

  APP.loadJs = (url) => new Promise((res) => {
    const s = document.createElement("script");
    s.src = url + "?v=" + APP.v;
    s.onload = res;
    document.body.appendChild(s);
  });

  document.addEventListener("DOMContentLoaded", async () => {
    const mount = document.querySelector("#ss-app");
    if (!mount) return;

    const moduleName = mount.dataset.module;
    const base = `${APP.base}/modules/${moduleName}`;

    APP.loadCss(`${base}/styles.css`);

    const html = await fetch(`${base}/index.html`).then(r => r.text());
    mount.innerHTML = html;

    await APP.loadJs(`${base}/module.js`);
    if (window.SSMODULE?.init) window.SSMODULE.init({ mount });
  });
})();
