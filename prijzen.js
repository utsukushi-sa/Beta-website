
document.addEventListener("DOMContentLoaded", () => {
  fetch("prijzen.json")
    .then(res => res.json())
    .then(prijzen => {
      // Vul automatisch prijzen in op basis van ID of data-key
      document.querySelectorAll(".price").forEach(elem => {
        const key = elem.dataset.key || elem.id;
        if (key && prijzen[key] !== undefined) {
          elem.textContent = `€ ${prijzen[key].toFixed(2).replace('.', ',')}`;
          // also store numeric price for scripts
          elem.dataset.price = prijzen[key];
        } else {
          // try to parse existing text-price to dataset.price so winkelmand kan use it
          const txt = elem.textContent || "";
          const m = txt.match(/€\s*([0-9]+[.,][0-9]{2})/);
          if (m) {
            elem.dataset.price = parseFloat(m[1].replace(',', '.')).toFixed(2);
          }
        }
      });
    })
    .catch(err => console.error("Kon prijzen.json niet laden:", err));
});
