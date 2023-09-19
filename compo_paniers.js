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

// ajoute la composition des paniers dans le fichier formulaire_paniers_out.html à la place des `{{panierXX}}`
formulaire = fs.readFileSync("formulaire_paniers.html", {
  encoding: "utf8",
});

for (const panier in compo_paniers) {
  formulaire = formulaire.replace("{{" + panier + "}}", compo_paniers[panier].join(", "));
}

// console.log(formulaire);
fs.writeFileSync("formulaire_paniers_out.html", formulaire);
