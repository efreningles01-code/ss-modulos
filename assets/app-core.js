(function () {
  const APP = (window.SSAPP = window.SSAPP || {});
  APP.base = "https://efreningles01-code.github.io/ss-modulos";
  APP.v = "1";

  APP.loadJs = (url) =>
    new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = url + "?v=" + APP.v;
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });

  document.addEventListener("DOMContentLoaded", async () => {
    const mount = document.querySelector("#ss-app");
    if (!mount) return;

    const moduleName = mount.dataset.module;
    if (!moduleName) return;

    const js = `${APP.base}/modules/${moduleName}/module.js`;
    await APP.loadJs(js);

    if (window.SSMODULE?.init) {
      window.SSMODULE.init({ mount });
    }
  });
})();
