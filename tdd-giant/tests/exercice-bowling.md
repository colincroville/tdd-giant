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
Les résultats de la partie sont composées d'un tableau représentant chaque lancer : chaque élément du tableau est un nombre correspondant au nombre de quilles qui sont tombées lors du lancer.
Vous pouvez considérer que les données en entrée représente un partie valide (pas plus de 10 quilles tombée par frame, pas plus de lancer que possible lors d'une partie...).

### Exemple de représentation de partie avec scores
- [5, 2, 4, 6, 10, 4, 4, 2, 3, 0, 0, 10, 10, 4, 6, 4, 0] => score de 120
- [5, 2, 4, 6, 3, 4, 10, 8, 2, 1, 5, 9, 1, 0, 2, 4, 6, 5, 5, 3] => score de 104
- [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10] => score de 300
