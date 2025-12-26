window.SSMODULE = {
  init({ mount }) {
    const btn = mount.querySelector('#btnTest');
    btn.onclick = () => alert('Funciona correctamente');
  }
};
