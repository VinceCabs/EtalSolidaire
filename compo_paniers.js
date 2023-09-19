const fs = require("fs");

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

for (const panier in compo_paniers) {
  formulaire = formulaire.replace(
    "{{" + panier + "}}",
    compo_paniers[panier].join(", ")
  );
}
fs.writeFileSync("formulaire_paniers_out.html", formulaire);

// génère la composition paniers pour l'email dans `email_paniers_out.html`
email = fs.readFileSync("email_paniers.html", {
  encoding: "utf8",
});

for (const panier in compo_paniers) {
  email = email.replace(
    "{{" + panier + "}}",
    compo_paniers[panier].join("</li>\n                          <li>")
  );
}
fs.writeFileSync("email_paniers_out.html", email);
