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

  APP.loadJs = (url) => new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = url + "?v=" + APP.v;
    s.onload = res;
    s.onerror = rej;
    document.head.appendChild(s);
  });

  APP.loadTemplate = (url) => new Promise((res, rej) => {
    const s = document.createElement("script");
    s.type = "text/plain"; // evita ejecución
    s.src = url + "?v=" + APP.v;
    s.onload = () => res(s.text || "");
    s.onerror = rej;
    document.head.appendChild(s);
  });

  document.addEventListener("DOMContentLoaded", async () => {
    const mount = document.querySelector("#ss-app");
    if (!mount) return;

    const moduleName = mount.dataset.module;
    if (!moduleName) {
      console.warn("Falta data-module en #ss-app");
      return;
    }

    const base = `${APP.base}/modules/${moduleName}`;

    // CSS
    APP.loadCss(`${base}/styles.css`);

    // HTML (sin fetch)
    try {
      const html = await APP.loadTemplate(`${base}/index.html`);
      mount.innerHTML = html;
    } catch (e) {
      mount.innerHTML = "<p>No se pudo cargar el HTML del módulo.</p>";
      return;
    }

    // JS
    try {
      await APP.loadJs(`${base}/module.js`);
      if (window.SSMODULE?.init) window.SSMODULE.init({ mount });
    } catch (e) {
      mount.innerHTML += "<p>No se pudo cargar el JS del módulo.</p>";
    }
  });
})();
