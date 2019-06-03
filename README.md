
## Installation

- modifier la constante `baseUrl` du fichier [config.js](https://github.com/antoine1302/mediatheque-front/blob/master/src/modules/config.js)
et la faire pointer vers l'adresse de l'api
- puis npm run start
- afin de pouvoir lier des films avec des participants, il faut auparavant ajouter quelques entrer dans les tables de references (subjects, roles, genres)

### TODO

- ajouter des nouveaux participants directement depuis la page film/edition
- lazy loading des listes des components selects (+ creation des endpoints correspondant)
- ajouter une notification de success/error lors de la création/modification d'un film
- ajout d'un slider pour la saisie de la durée du film
- ajout d'un datepicker pour le champs date de sortie
- disable form submission until request completion
- mettre en place la pagination
- ajout d'une authentification