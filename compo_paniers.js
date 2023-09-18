// TODO: open compo_paniers.txt file and convert every line into an object

const fs = require("fs");

let compo_paniers = {
  panier10: [],
  panier20: [],
  panier25: [],
};

// recupere les compositions pour chaque panier dans les fichiers. exemple : `panier10.txt`
for (const panier in compo_paniers) {
  fs.readFile(panier + ".txt", "utf8", (err, compo) => {
    if (err) {
      console.error(err);
      return;
    }
    // ajoute la composition du panier en retirant les lignes vides
    compo = compo.split(/\r?\n|\r|\n/g).filter((x) => x);
    compo_paniers[panier] = compo;

    // console.log(compo_paniers);
  });
}
console.log(compo_paniers);