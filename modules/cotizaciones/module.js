window.SSMODULE = {
  init({ mount }) {
    mount.innerHTML = `
      <div id="ss-sidebar">
        <h3>Menú</h3>
        <ul>
          <li>Dashboard</li>
          <li>Cotizaciones</li>
          <li>Clientes</li>
        </ul>
      </div>

      <div id="ss-content">
        <h2>Cotizaciones</h2>
        <p>Contenido cargado correctamente.</p>
      </div>
    `;
  }
};
