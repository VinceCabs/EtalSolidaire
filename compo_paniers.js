const fs = require("fs");

VENTE_DATE = "dimanche 24 septembre";
VENTE_LIEU = "à la maison de quartier XXX";

let compo_paniers = {
  panier10: [],
  panier20: [],
  panier25: [],
};

// recupere les compositions pour chaque panier dans les fichiers `panierXX.txt`
for (const panier in compo_paniers) {
  compo = fs.readFileSync(panier + ".txt", { encoding: "utf8", flag: "r" });

  // ajoute la composition du panier en retirant les lignes vides
  compo = compo.split(/\r?\n|\r|\n/g).filter((x) => x);
  compo_paniers[panier] = compo;
}

// génère la composition des paniers dans le fichier `formulaire_paniers_out.html`
// en ajoutant les compos à la place des `{{panierXX}}` dans le template
formulaire = fs.readFileSync("formulaire_paniers.html", {
  encoding: "utf8",
});
formulaire = formulaire
  .replace("{{vente_date}}", VENTE_DATE)
  .replace("{{vente_lieu}}", VENTE_LIEU);
formulaire = renderCompoPaniers(formulaire, compo_paniers);
fs.writeFileSync("formulaire_paniers_out.html", formulaire);

// génère la composition paniers pour l'email dans `email_paniers_out.html`
email = fs.readFileSync("email_paniers.html", {
  encoding: "utf8",
});
email = renderCompoPaniers(
  email,
  compo_paniers,
  "</li>\n                          <li>"
);
fs.writeFileSync("email_paniers_out.html", email);

/**
 * Fait un rendu du HTML complet à partir du template et de la composition des paniers
 *
 * @param {string} template template du HTML
 * @param {Object} compo_paniers composition des paniers
 * @param {string} [separator=", "] separateur pour le rendu
 * @returns {string} le rendu
 */
function renderCompoPaniers(template, compo_paniers, separator = ", ") {
  html = template
  for (const panier in compo_paniers) {
    html = html.replace(
      "{{" + panier + "}}",
      compo_paniers[panier].join(separator)
    );
  }
  return html;
}
