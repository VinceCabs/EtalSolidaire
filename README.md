# Templates Etal Solidaire

## A quoi ça sert ?

Gagner du temps quand on prépare l'email et le formulaire pour la prochaine vente.

## Installation

Il vous faudra Git et Node.js.

Ensuite : `git clone https://github.com/VinceCabs/EtalSolidaire.git`

## Usage

1. Compléter les infos de la vente dans les fichiers :
   
   - date et lieux, dans le fichier `compo_panier.js` :
    ```js
    // Paramètres pour la vente
    VENTE_DATE_SHORT = "20230924";
    VENTE_DATE = "dimanche 24 septembre";
    VENTE_LIEU = "à la maison de quartier XXX";
    ```
    - composition des paniers dans les fichiers (exemple `panier10.txt`) :
    ```
    500 g de carottes
    1 kg de PDT Alouette
    ...
    ```

2. Pour générer le HTML de l'email et du formulaire :

    - `node compo_paniers.js`

3. vous retrouverez le HTML généré dans les fichiers
   - `email_paniers_out.html` => à copier coller dans MailChimp
   - `fomulaire_paniers_out.html` => à copier coller intégralement dans Wordpress

## L'Étal Solidaire

![image](https://etalsolidaire.org/wp-content/uploads/2020/03/image1.png)

https://etalsolidaire.org

L'Étal Solidaire est une association de quartier ayant pour objet de :

- Donner aux habitants d’Ivry Sur Seine la possibilité d’accéder à des produits de qualité, majoritairement Bio et distribués en circuit court.
- Soutenir les producteurs en pérennisant la relation avec eux et les actions associées
- Proposer aux adhérents de l’association de participer à tout événement solidaire autour du mieux manger (marchés de producteur, débats, conférences, etc.) et toutes autres actions de solidarité afin d’améliorer le quotidien de tous.
- Plus largement de favoriser, à travers des actions et diverses manifestations dans les domaines artistique, artisanal, culinaire, culturel, ludique, etc. la rencontre entre des populations différentes habitant Ivry ou ailleurs.
- Créer du lien social.

Pour l'organisation des ventes, l'association envoie des emails et organise les commandes chaque semaine à partir de son site. Ces templates sont ici pour aider les organisateurs.