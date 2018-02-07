# Review du projet SpeedCooking

## Rappel sur l'objectif du projet
<p>
Le projet SpeedCoking a pour but de proposer une selection et une visualisation interactive de différentes recettes de cuisine. 
Sur une petite base de données créée manuellement à partir d'une dizaine de recettes, le but est de visualiser les recettes réalisables en fonction du temps et des ingrédients disponibles.
Il doit permettre de visualiser pour faciliter l'organisation de l'éxecution de la recette.
C'est un sorte de Gant des recettes trouvable à cette adresse :
https://github.com/tblondelle/DataVisualisationProject
et les fichiers de propositions ici : https://github.com/tblondelle/DataVisualisationProject/blob/master/PROPOSAL.MD
</p>

## Proposition
<b>Choix du design de visualisation :</b>
<ul>
<li> Représentation sous forme d'arbres chrnologiques avec les différentes étapes indiquées par des symboles.</li>
<li> Parallèlisation des tâches pour chaque éléments (four, casseroel...).</li>
<li> Tooltip avec description précise de la tâche.</li>
<li> Format paysage</li>
</ul>

## Commentaires
<p>
<b>Définition du problème :</b> Le problème est clairement définit, il faut être capable de visualiser rapidement la durée de la recette et les différentes étapes qui seront nécessaires à chaque période.
L'équipe s'est concentrée sur la visualisation du déroulement de la recette et non sur l'aide au choix en fonction des ingrédients<br>
<br>
<b>Choix de la visualisation :</b> 
<h3>+</h3>
La structure en arborescence avec l'axe des temps en abscisse permet d'avoir une idée concrète de la durée de préparation .<br>
On identifie rapidement les étapes à effectuer au cours de la recette<br>
Les Tooltip permettent d'avoir plus d'informations
<br>
<h3>-</h3>
On sait pas trop quels éléments ont le droit à leur propre axe.<br>
Les différentes étapes de la recette ne sont pas des étapes instantanées. Par exemple "éplucher les courgettes prendra du temps. <br>
Si possible essayer de diversifier les icônes relatives aux différentes tâches afin d'avoir une idée de la structure plus rapidement sans devoir passer par les tooltips.
<br><br>
<b>Difficulté de la réalisation du projet :</b> 
<ul>
<li>Nécessité de réaliser une base de données avec une structure particulière et fortement adaptée à la structure du problème</li>
<li>Attention à bien choisir les éléments disposant de leur propre axe : si trop d'éléments on aura une visualisation brouillone et dans le cas contraire pas assez détaillée</li>
<li>Bien préparer les merges des arborescences dans la base de données</li>
</ul>

</p>





