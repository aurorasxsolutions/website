/* ==========================================================
   AURORA X SOLUTIONS
   CLIENTS
   ========================================================== */

document.addEventListener("DOMContentLoaded", async () => {

  const track = document.getElementById("clients-track");
  let loadedClients = [];

  if (!track) {
    return;
  }


  /* ========================================================
     LOAD CLIENTS
     ======================================================== */

  async function loadClients() {

    try {

      const response = await fetch("data/clients.json");

      if (!response.ok) {
        throw new Error(
          `No se pudo cargar clients.json (${response.status})`
        );
      }

      const clients = await response.json();

      if (!Array.isArray(clients) || clients.length === 0) {
        return;
      }

      loadedClients = clients;
      renderClients(clients);

    } catch (error) {

      console.error(
        "Error cargando los clientes:",
        error
      );

    }
  }


  /* ========================================================
     CREATE CLIENT
     ======================================================== */

  function createClient(client) {

    const item = document.createElement("div");

    item.className = "client-item";


    /*
     * Logo
     */

    const link = document.createElement("a");

    link.className = "client-item__link";

    link.href = client.website;

    link.target = "_blank";

    link.rel = "noopener noreferrer";

    link.setAttribute(
      "aria-label",
      `${window.AXS.translate("clients.visitSiteAria")} ${client.name}`
    );


    const logoDark = document.createElement("img");

    logoDark.className = "client-item__logo client-item__logo--dark";

    logoDark.src = client.logoDark;

    logoDark.alt = client.name;

    logoDark.loading = "lazy";

    const logoLight = document.createElement("img");

    logoLight.className = "client-item__logo client-item__logo--light";

    logoLight.src = client.logoLight;

    logoLight.alt = "";

    logoLight.setAttribute("aria-hidden", "true");

    logoLight.loading = "lazy";


    /*
     * Hover information
     */

    const tooltip = document.createElement("div");

    tooltip.className = "client-item__tooltip";


    const name = document.createElement("h3");

    name.textContent = client.name;


    const solution = document.createElement("p");

    solution.textContent = client.solution;


    const visit = document.createElement("span");

    visit.className = "client-item__visit";

    visit.innerHTML = `
      ${window.AXS.translate("clients.visitSite")}
      <i data-lucide="arrow-up-right"></i>
    `;


    tooltip.appendChild(name);

    tooltip.appendChild(solution);

    tooltip.appendChild(visit);


    /*
     * Build
     */

    link.appendChild(logoDark);

    link.appendChild(logoLight);

    item.appendChild(tooltip);

    item.appendChild(link);


    return item;
  }


  /* ========================================================
     RENDER
     * ======================================================== */

  function renderClients(clients) {

    track.innerHTML = "";

    track.classList.remove("clients__track--static");
    track.classList.remove("clients__track--animated");

    clients.forEach(client => {

      track.appendChild(
        createClient(client)
      );

    });


    if (clients.length <= 4) {

      track.classList.add(
        "clients__track--static"
      );

    }


    else {

      clients.forEach(client => {

        const clone = createClient(client);

        clone.setAttribute(
          "aria-hidden",
          "true"
        );

        track.appendChild(clone);

      });

      track.classList.add(
        "clients__track--animated"
      );

    }


    /*
     * Lucide
     */

    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }

  }


  /* ========================================================
     INIT
     ======================================================== */

  await loadClients();

  document.addEventListener("languagechange", () => {
    if (loadedClients.length > 0) {
      renderClients(loadedClients);
    }
  });

});