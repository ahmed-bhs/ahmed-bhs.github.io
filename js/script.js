const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
}

// Close navbar when link is clicked
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((n) => n.addEventListener("click", closeMenu));

function closeMenu() {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

// Event Listeners: Handling toggle event
const toggleSwitch = document.querySelector(
  '.theme-switch input[type="checkbox"]'
);

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

toggleSwitch.addEventListener("change", switchTheme, false);

// Save user preference on load

const currentTheme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : null;

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
  }
}

//Adding date

let myDate = document.querySelector("#datee");

const yes = new Date().getFullYear();
myDate.innerHTML = yes;

const briefForm = document.querySelector("[data-brief-form]");

if (briefForm) {
  const status = briefForm.querySelector("[data-brief-status]");
  const submitButton = briefForm.querySelector("[type=submit]");

  briefForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (status) {
      status.textContent = "Envoi en cours...";
      status.className = "brief-form-status is-sending";
    }
    if (submitButton) submitButton.disabled = true;

    try {
      const response = await fetch(briefForm.action, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(briefForm),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        briefForm.reset();
        if (status) {
          status.textContent = "Message envoyé. Je vous réponds rapidement.";
          status.className = "brief-form-status is-success";
        }
      } else {
        throw new Error(result.message || "Erreur inconnue");
      }
    } catch (error) {
      if (status) {
        status.textContent =
          "Envoi impossible. Écrivez-moi directement à ahmedbhs123@gmail.com";
        status.className = "brief-form-status is-error";
      }
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}

const heroConsole = document.querySelector("[data-hero-console]");

if (heroConsole) {
  const title = heroConsole.querySelector("[data-console-title]");
  const command = heroConsole.querySelector("[data-console-command]");
  const output = heroConsole.querySelector("[data-console-output]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scenarios = [
    {
      title: "site-vitrine",
      command: "creer site --type=vitrine --pages=6 --bo=simple",
      lines: [
        ["ok", "design responsive et pages clés cadrées"],
        ["ok", "textes et images éditables depuis le back-office"],
        ["ok", "formulaire sécurisé, SEO initial et sitemap livrés"],
      ],
    },
    {
      title: "cms-contenu",
      command: "creer cms --admin=easyadmin --contenu=pages,blog,medias",
      lines: [
        ["ok", "pages, actualités, menus et médias administrables"],
        ["ok", "bibliothèque images, PDF et vidéos structurée"],
        ["ok", "SEO avancé, Open Graph et contenus multilingues prêts"],
      ],
    },
    {
      title: "page-builder",
      command: "creer site --cms=sulu --edition=blocs --preview=live",
      lines: [
        ["ok", "éditeur de pages par blocs configurable"],
        ["ok", "aperçu avant publication et brouillons activés"],
        ["ok", "composants réutilisables sans casser le design"],
      ],
    },
    {
      title: "ecommerce",
      command: "creer boutique --catalogue --paiement=stripe --stock",
      lines: [
        ["ok", "catalogue produits, variantes et stock modélisés"],
        ["ok", "panier, tunnel de commande et paiement sécurisés"],
        ["ok", "commandes, factures, TVA et codes promo administrables"],
      ],
    },
    {
      title: "reservation",
      command: "creer reservation --agenda --paiement=acompte --rappels=email",
      lines: [
        ["ok", "créneaux, disponibilités et règles métier configurés"],
        ["ok", "paiement d'acompte et notifications automatiques"],
        ["ok", "synchronisation calendrier prête pour la production"],
      ],
    },
    {
      title: "audit-seo",
      command: "auditer seo --structure --indexation --contenu",
      lines: [
        ["ok", "freins SEO techniques et éditoriaux identifiés"],
        ["ok", "balises, performance, sitemap et pages clés revus"],
        ["ok", "plan d'action classé par impact et effort"],
      ],
    },
    {
      title: "audit-ux-ui",
      command: "auditer ux-ui --parcours --formulaires --conversion",
      lines: [
        ["ok", "parcours utilisateur et points de friction analysés"],
        ["ok", "messages, boutons et formulaires clarifiés"],
        ["ok", "recommandations UI concrètes pour mieux convertir"],
      ],
    },
    {
      title: "audit-security",
      command: "auditer securite --owasp --acces --configuration",
      lines: [
        ["ok", "contrôles d'accès et surfaces sensibles inspectés"],
        ["ok", "configuration, secrets et dépendances vérifiés"],
        ["ok", "priorités de correction classées par risque"],
      ],
    },
    {
      title: "audit-symfony-php",
      command: "auditer code --stack=symfony,php,doctrine --scope=qualite",
      lines: [
        ["ok", "architecture, dette technique et conventions analysées"],
        ["ok", "requêtes Doctrine et performances applicatives revues"],
        ["ok", "roadmap de corrections prête pour l'équipe"],
      ],
    },
    {
      title: "ibexa-ezplatform",
      command: "aider dev --stack=ezplatform,ibexa --scope=contenu,back-office",
      lines: [
        ["ok", "types de contenu, sections et workflows analysés"],
        ["ok", "développements Ibexa intégrés proprement à Symfony"],
        ["ok", "équipe accompagnée sur templates, APIs et back-office"],
      ],
    },
    {
      title: "tma-maintenance",
      command: "maintenir application --backup --monitoring --support=24-48h",
      lines: [
        ["ok", "sauvegardes et monitoring de disponibilité actifs"],
        ["ok", "mises à jour système et sécurité planifiées"],
        ["ok", "petites évolutions traitées sans relancer un projet"],
      ],
    },
    {
      title: "upgrade-symfony",
      command: "migrer application --from=symfony3.4 --to=symfony8.1",
      lines: [
        ["ok", "écarts de versions et bundles legacy cartographiés"],
        ["ok", "migration découpée par paliers testables"],
        ["ok", "Doctrine, sécurité et CI remis à niveau"],
      ],
    },
    {
      title: "setup-cicd",
      command: "installer cicd --tests --staging --deploy=zero-downtime",
      lines: [
        ["ok", "pipeline build, test et déploiement automatisé"],
        ["ok", "environnements staging et production séparés"],
        ["ok", "rollback et documentation de livraison prêts"],
      ],
    },
    {
      title: "setup-infra",
      command: "deployer infra --ssl --backup --monitoring --redis",
      lines: [
        ["ok", "serveur, DNS, SSL et services applicatifs configurés"],
        ["ok", "sauvegardes, logs et alertes de disponibilité activés"],
        ["ok", "sécurité système durcie avant mise en production"],
      ],
    },
    {
      title: "renfort-remote",
      command: "renforcer equipe --remote --stack=symfony,doctrine,api-platform",
      lines: [
        ["ok", "audit architecture, dette technique et performance"],
        ["ok", "tickets critiques livrés en sprint court"],
        ["ok", "documentation et passation prêtes pour l'équipe"],
      ],
    },
  ];

  let scenarioIndex = 0;
  let timer;

  const setScenario = (scenario) => {
    title.textContent = scenario.title;
    command.textContent = scenario.command;
    output.innerHTML = scenario.lines
      .map(([type, text]) => `<p class="console-line"><span class="${type === "warn" ? "console-warn" : "console-ok"}">${type === "warn" ? "!" : "✓"}</span><span>${text}</span></p>`)
      .join("");
  };

  const typeCommand = (text, index = 0) => {
    command.textContent = text.slice(0, index);
    if (index < text.length) {
      timer = window.setTimeout(() => typeCommand(text, index + 1), 42);
    }
  };

  const renderScenario = () => {
    const scenario = scenarios[scenarioIndex];
    title.textContent = scenario.title;
    command.textContent = "";
    output.innerHTML = "";

    if (reduceMotion) {
      setScenario(scenario);
      return;
    }

    typeCommand(scenario.command);
    scenario.lines.forEach(([type, text], index) => {
      window.setTimeout(() => {
        const line = document.createElement("p");
        line.className = "console-line";
        line.innerHTML = `<span class="${type === "warn" ? "console-warn" : "console-ok"}">${type === "warn" ? "!" : "✓"}</span><span>${text}</span>`;
        output.appendChild(line);
      }, 1100 + index * 540);
    });

    timer = window.setTimeout(() => {
      scenarioIndex = (scenarioIndex + 1) % scenarios.length;
      renderScenario();
    }, 6800);
  };

  renderScenario();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.clearTimeout(timer);
    } else {
      renderScenario();
    }
  });
}
