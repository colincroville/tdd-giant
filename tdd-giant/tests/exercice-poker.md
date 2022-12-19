# Exercice : Implémenter un outil permettant de déterminer qui a gagné à une partie de poker

## Instructions pour l'exercice
Etant donné plusieurs mains, quand on demande au programme, il doit déterminer quelle est la main gagnante.

## Représentation des données en entrée

### Représentation d'une carte
Ce sera une chaine de caractère composée de deux parties concaténées. La première partie pour la force de la carte, la deuxième partie pour la couleur de la carte.
Les forces de cartes, de la plus faible à la plus forte, sont :
- 2 à 10
- J (Jack/valet)
- Q (Queen/dame)
- K (King/roi)
- A (As)

Les couleurs sont les suivantes :
- ♠ (pique)
- ♥ (coeur)
- ♦ (carreau)
- ♣ (trèfle)

Exemples de cartes :
- '2♠' 2 de pique
- 'K♥' roi de coeur
- '10♦' 10 de carreau

### Représentation d'une main de poker
Ce sera un tableau de chaines de caractère, chaque élément représentant une carte bien sûr.

Exemple de main :
['2♠', 'K♥', '10♦', '10♠', '10♥']

Remarques :
- Les mains sont toujours consitituées de 5 cartes.
- Pas de cartes partagées entre plusieurs joueurs comme dans certaines variantes du poker.
- Il faut considérer que les cartes et mains en entrée sont toutes valides.
- Les cartes n'apparaissent qu'en un seul exemplaire dans les mains des joueurs.

## Rappel des règle permettant de déterminer quel main est la plus forte
Classement des mains, de la plus forte à la plus faible :
- Quinte Flush Royale (Royal Flush) : la plus forte main possible du poker. Une quinte flush royale combine une quinte à l'As et une couleur. Elle est composée de : As, Roi, Dame, Valet, 10, tous de la même couleur. Si deux joueurs ont une quinte royale, ils se partageront le pot.
- Quinte Flush (Straight Flush) : une quinte flush est similaire à la quinte flush royale. Il s'agit d'une suite combinée à une couleur, mais sans l'As comme plus haute carte. Par exemple : 9, 8, 7, 6 et 5, tous d'une même couleur. Lorsque deux joueurs ont une quinte flush, le joueur qui a la carte la plus haute de la suite l'emporte. Lorsque les deux mains sont identiques, le pot est divisé entre les deux joueurs.
- Carré (Quads/Four of a Kind) : une main qui contient quatre cartes d'un même rang comme quatre As ou quatre Valets. Lorsque deux joueurs ont un carré, celui qui a le plus haut l'emporte. Si les deux joueurs ont le même carré, le pot est remis à celui qui a la cinquième carte la plus haute, appelée aussi acolyte.
- Full : trois cartes d'un même rang combinées à deux autres d'un même rang. Exemples de full : trois Rois et deux 10, ou trois 4 et deux As. Lorsque deux joueurs ont un full, celui qui détient les trois cartes du même rang les plus hautes gagne. Dans les deux exemples proposés auparavant, le joueur qui a les trois Rois gagne.
- Couleur (Flush) : une couleur est une main qui contient cinq cartes de même couleur : cinq piques, cinq trèfles, cinq carreaux ou cinq cœurs. Lorsque deux joueurs ou plus ont une couleur, celui qui a la carte la plus haute remporte la main. Si deux mains ont la même carte la plus haute, la seconde carte la plus haute déterminera le gagnant, et ainsi de suite.
- Quinte (Suite/Séquence/Straight) : cinq cartes qui se suivent numériquement et forment une suite, comme 6, 5, 4, 3 et 2. Lorsque deux joueurs ou plus ont une quinte, celui qui a la carte la plus haute l'emporte. Si deux joueurs ont la même carte la plus haute, ils partageront le pot. L'As peut jouer comme la plus haute carte mais aussi comme la plus faible. Par exemple : As, Roi, Dame, Valet, 10 ou As, 2, 3, 4, 5. L'As est la seule carte qui peut s'utiliser de cette façon.
- Brelan (Set/Trips/Three of a kind) : trois cartes de même valeur, comme trois Valets ou trois 8. Lorsque deux joueurs ont un brelan, celui qui a le brelan dont la valeur est la plus élevée, l'emporte. Si deux joueurs ont le même brelan, le joueur qui a la quatrième carte la plus haute l'emporte.
- Deux Paires (Two pair) : une main qui consiste à avoir deux paires, comme deux 10 et deux 6. Si deux joueurs ont deux paires, celui avec la paire la plus haute l'emporte. Si les deux joueurs ont la même paire, celui avec la seconde paire la plus haute l'emporte. Si les deux paires sont identiques pour les deux joueurs, celui dont l'acolyte est le plus haut l'emporte.
- Une paire (One pair) : main d'une seule paire. C'est-à-dire deux cartes de même valeur, comme deux As ou deux Valets, avec trois autres cartes qui ne forment aucune autre combinaison. Lorsque deux joueurs ont une paire, celui qui a la plus haute l'emporte ; s'ils ont tous deux la même paire, celui qui détient la carte la plus haute l'emporte.
- Carte la Plus Haute (High card) : une main qui ne présente aucune des combinaisons mentionnées ci-dessus est appelée une main à carte la plus haute. Lorsque deux joueurs ont tous deux une carte, la plus haute l'emporte. Si la plus haute carte est la même pour les deux, c'est la seconde carte la plus haute qui détermine le gagnant, et ainsi de suite.