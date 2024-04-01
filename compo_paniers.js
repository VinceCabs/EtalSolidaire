const PARAM_COLUMN_HEADER = "Paramètre";
const PARAM_COLUMN_VALUE_HEADER = "Valeur";
const PARAM_DATE_LABEL = "date";
const PARAM_PANIER_PREFIX = "panier";

const DATE_OPTIONS = { weekday: "long", month: "long", day: "numeric" };

/**
 * Fait un rendu du HTML complet du formulaire à partir du template et des paramètres
 *
 * Fonction destinée à être appelée dans GSheet directement
 *
 * @param {string} template template du HTML
 * @param {string} param_values les paramètres (sous forme de valeurs ici, mais c'est la range en notation A1 sur Gsheet (plus d'infos ici : https://webapps.stackexchange.com/a/58179)
 */
function renderFormulaire(template, param_values) {
  let params = _extractParams(param_values);
  // rendering Form
  let formulaire = template;
  for (let param in params) {
    let value = params[param];
    // si le parametre est un panier, on formate sur une ligne
    if (param.startsWith(PARAM_PANIER_PREFIX)) {
      value = _renderPaniers(value, ", ");
    }
    // console.log(param + ": " + value + "| type: " + typeof (value))
    formulaire = formulaire.replace("{{" + param + "}}", value);
    if (value == "oui") {
      
      formulaire = _insertBloc(formulaire, param, true)

    } else {
      formulaire = _insertBloc(formulaire, param, false)
    }
  }
  return formulaire;
}

/**
 * Fait un rendu du HTML complet de l'email à partir du template et des paramètres
 *
 * Fonction destinée à être appelée dans GSheet directement
 *
 * @param {string} template template du HTML
 * @param {string} param_values les paramètres (sous forme de valeurs ici, mais c'est la range en notation A1 sur Gsheet (plus d'infos ici : https://webapps.stackexchange.com/a/58179)
 */
function renderEmail(template, param_values) {
  let params = _extractParams(param_values);
  // rendering Form
  let email = template;
  for (let param in params) {
    let value = params[param];
    // si le parametre est un panier, on formate sur une ligne
    if (param.startsWith(PARAM_PANIER_PREFIX)) {
      value = _renderPaniers(value, "</li>\n                          <li>");
    }
    // console.log(param + ": " + value + "| type: " + typeof (value))
    email = email.replace("{{" + param + "}}", value);
  }
  return email;
}


/**
 * Extrait les paramètres de la vente
 * 
 * @param {Object} range_values tableau avec les paramètres, incluant les headers
 */
function _extractParams(range_values) {
  // index des colonnes param et valeurs
  const headers = range_values.shift();
  const paramColIdx = headers.indexOf(PARAM_COLUMN_HEADER);
  const valueColIdx = headers.indexOf(PARAM_COLUMN_VALUE_HEADER);

  // créé l'objet avec les paramètres
  let params = {};
  for (const line of range_values) {
    params[line[paramColIdx]] = line[valueColIdx];
  }
  // la date dans la cellule GSheet doit être convertie au bon format
  params[PARAM_DATE_LABEL] = new Date(
    params[PARAM_DATE_LABEL]
  ).toLocaleDateString("fr-FR", DATE_OPTIONS);
  return params;
}

/**
 * genere la composition du panier en retirant les lignes vides
 *
 * @param {string} template template du HTML
 * @param {Object} panier composition des paniers
 * @param {string} [separator=", "] separateur pour le rendu
 * @returns {string} le rendu
 */
function _renderPaniers(panier, separator = ", ") {
  panier = panier
    .split(/\r?\n|\r|\n/g)
    .filter((x) => x)
    .join(separator);
  return panier;
}

/**
 * Insert ou retire un bloc de texte compris entre des balises {{#block_name}} et {{/block_name}} dans le template.
 * Laisse les autres blocs de texte
 * 
 * exemple :
 * template = "ici du texte. {{#foo}}là un bloc de texte à insérer{{/foo}}"
 * block_name = "foo"
 * console.log(_insertBloc(template, param_name, true))
 * // ici du texte. là un bloc un bloc de texte à insérer
 * 
 * @param {string} template template du texte
 * @param {string} block_name nom du bloc recherché dans le template
 * @param {boolean} insert condition: on insert si `true`, on retire le bloc sinon
 */
function _insertBloc(template, block_name, insert) {
  // on cherche le bloc dans le template
  let start = "{{#" + block_name + "}}";
  let end = "{{/" + block_name + "}}";
  // tant que le bloc existe dans le template, on fait le remplacement
  for (let i = 0; i < 10; i++) {
    let startIdx = template.indexOf(start);
    let endIdx = template.indexOf(end);
    // console.log(i, start, startIdx)
    if (startIdx === -1 || endIdx === -1) {
      break;
    }
    // le bloc existe et on insert le bloc
    if (insert) {
      template = template.slice(0,startIdx) + template.slice(startIdx + start.length, endIdx) + template.slice(endIdx + end.length, template.length);
    } else {
    // le bloc existe et on retire le bloc
      template = template.slice(0,startIdx) + template.slice(endIdx + end.length, template.length);
    }
  }
  return template
}

function getRawText() {
  let txt = SpreadsheetApp.getActiveSpreadsheet().getCurrentCell().getValue()
  let ui = SpreadsheetApp.getUi()
  let result = ui.alert(txt, ui.ButtonSet.OK);
  console.log("pouet")
}

function main() {
  let template = `
  {{date}}
  {{panier10}}  
  {{#biere}}là un pack de bière{{/biere}}`
  let param_range = "'0. param. de la vente'!A1:C14"
  let param_values = SpreadsheetApp.getActiveSpreadsheet().getRange(param_range).getValues()
  console.log(renderFormulaire(template,param_values ));
  //
  // samedi 30 septembre
  // 1 salade, 1 poireau, 1 pomme
  // là un pack de bière

  let panier10 = `
  1 salade
  1 poireau
  1 pomme`
  console.log(_renderPaniers(panier10))
  // 1 salade,   1 poireau,   1 pomme

  template = `
  ici un panier
  {{#biere}}là un pack de bière{{/biere}}
  {{#biere}}Total biere{{/biere}}`
  param = "pouet"
  console.log(_insertBloc(template, param, true))
  // ici un panier
  // {{#biere}}là un pack de bière{{/biere}}
  // {{#biere}}Total bière{{/biere}}

  param = "biere"
  console.log(_insertBloc(template, param, true))
  // ici un panier
  // là un pack de bière
  // Total bière

  param = "biere"
  console.log(_insertBloc(template, param, false))
  // ici un panier

}

// function unit_tests() {
//   let param_values= [ [ 'Paramètre', 'Description', 'Valeur' ],
//   [ 'date',
//     'date de la vente',
//     'Sun Apr 07 2024 00:00:00 GMT+0200 (Central European Summer Time)' ],
//   [ 'heure',
//     'heure de récup. des paniers',
//     'entre 10h00 et 11h30' ],
//   [ 'lieu_court', 'pt de vente principal', 'PMC' ],
//   [ 'pt_vente_x2', '2 points de vente oui/non', 'oui' ],
//   [ 'lieu_court_2',
//     'deuxième pt de vente (si applicable)',
//     'Vérollot' ],
//   [ 'biere', '', 'non' ],
//   [ 'corentin_colette', 'présence de Corentin et Colette', 'non' ],
//   [ 'panier10',
//     '',
//     '500 g de carottes\r\n1 kg de PDT Monalisa\r\n500 g d\'oignons jaunes\r\n350 g d\'épinards\r\n4 pommes Story\r\n6 oeufs' ],
//   [ 'panier20',
//     '',
//     '1 kg de carottes\r\n1 kg de PDT Monalisa\r\n500 g d\'oignons rouges\r\n200 g de champignons\r\n500 g d\'épinards\r\n350 g de poireaux\r\n1 kg de pommes Story\r\n10 oeufs' ],
//   [ 'panier25',
//     '',
//     '1 kg de carottes\n1 kg de PDT Monalisa\n500 g d\'oignons jaunes\n200 g de champignons\n400 g de blettes\n500 g de poireaux\n1 botte d\'asperges blanches\n1 kg de pommes Story\n10 oeufs' ],
//   [ 'AUTO', '', '' ],
//   [ 'date_courte', '', '20240407' ],
//   [ 'pt_vente_x1', '2 points de vente oui/non', 'non' ] ]
//   let template = `
//   {{date}}
//   {{panier10}}  
//   {{#biere}}là un pack de bière{{/biere}}`
//   // console.log(renderFormulaire(template,param_values ));
//   assert.equal(renderFormulaire(template,param_values ),`
//   dimanche 7 avril
//   500 g de carottes, 1 kg de PDT Monalisa, 500 g d'oignons jaunes, 350 g d'épinards, 4 pommes Story, 6 oeufs  
//   `)
// }
