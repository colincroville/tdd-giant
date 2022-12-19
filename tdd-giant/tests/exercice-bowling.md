# Exercice : Implémenter un outil permettant de calculer le score d'une partie de bowling

## Instructions pour l'exercice
Etant donné les résultats de lancés d'une partie de bowling, on doit donner le score total de la partie.

## Règles du bowling

### Déroulement d’une partie de bowling
Une partie de bowling compte 10 frames. Chaque joueur lance deux boules à chaque frame, sauf en cas de strike. Un strike consiste à faire tomber les dix quilles avec la première boule. Le spare consiste à faire tomber les dix quilles avec les deux tirs consécutifs lors de la même frame. Si il n'y a eu ni strike ni spare, on parle de "trou".

### Calcul des poins
En cas de strike : 10 + nombre de quilles abattues après les deux lancers suivants.
En cas de spare : 10 + nombre de quilles abattues au lancer suivant.
Trou : nombre de quilles abattues.
La dixième frame est particulière : en cas de strike au premier lancer, deux lancers supplémentaires sont accordés. En cas de réalisation d’un spare, un lancer supplémentaire est accordé.
Ainsi, la marque parfaite est de 300 points, pour douze strike consécutifs.

## Représentation des données en entrée
Les résultats de la partie sont composées d'un tableau représentant chaque frame. Chaque frame étant représentée par une chaines de caractères, représentant chaque lancé.

### Représentation d'une frame
C'est donc une chaines de caractères. Les caractères que l'on peut avoir est soit :
- 'X' si il y a eu un strike.
- En cas de spare, un nombre correspondant au nombre de quille abbatues au premier lancer suivi de '/'.
- En cas de trou deux nombre représentant les quilles abbatues à chaque lancer.

Exemples de frames :
- 'X' pour un strike
- '5/' pour un spare
- '15' pour un trou

### Représentation d'une partie
Une partie étant constitué de 10 frame, elle sera représentée par un tableau de 10 tableaux représentant les frames.

Exemples de partie :
['52','4/','X','44','23','00','X','X','4/','40'] => score de 120
['52','4/','34', 'X', '8/','15','9/','02','4/','5/3'] => score de 104
['X','X','X','X','X','X','X','X','X','XXX'] => score de 300

### Cas particulier de la dernière frame
La dernière frame peut avoir jusqu'à 3 éléments si il y a eu un strike ou un spare lors des 2 premiers lancers.
