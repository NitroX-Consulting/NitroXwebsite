---
title: "Le modèle n’est pas le produit"
description: "Le choix du modèle est une décision de chaque mois ; celui du harness engage cinq ans. Trois décisions à prendre au départ d’un projet d’IA."
pubDate: 2026-08-30
lang: fr
slug: le-modele-nest-pas-le-produit
altSlug: the-model-is-not-the-product
tagline: "Note de cadrage"
readingTime: "6 min"
---

Toutes les entreprises que nous rencontrons commencent par la même question : **quel modèle choisir ?** GPT ou Claude, Mistral ou Gemini, la version à trois euros ou celle à trente. C’est la question la plus visible, la plus commentée — et c’est la mauvaise.

Le modèle est un moteur : puissant, remplaçable, et déjà périmé au moment où vous signez. Ce qui décide de la réussite d’un projet d’IA, c’est la couche qu’on bâtit autour de lui.

## Le moteur et la voiture

Un modèle brut ne connaît ni vos clients, ni vos procédures, ni vos règles. Il ne se souvient de rien, n’a accès à rien, et ne peut rien faire d’autre que produire du texte. Tout ce qui le transforme en collaborateur, c’est ce qu’on met autour : la mémoire de ce qui a déjà été fait, les outils qu’il peut actionner, les documents qu’il a le droit de lire, et les garde-fous qui l’arrêtent avant la bêtise.

Cet ensemble porte un nom : le **harness** — le harnais, l’attelage. Le modèle est le moteur ; le harness est la voiture. Le châssis, la direction, les freins, les ceintures de sécurité, le tableau de bord. Un moteur seul ne vous emmène nulle part, et **personne n’achète un moteur nu**.

C’est une image, mais elle a une conséquence très concrète : dans un projet d’IA, la pièce dont tout le monde débat est la plus petite, la moins durable, et la seule qu’un fournisseur peut vous retirer du jour au lendemain. Le reste, c’est vous qui le construisez — ou qui le subissez.

Trois décisions, prises au tout début, déterminent ce que votre IA vous coûtera chaque mois, ce qu’elle laissera voir de vos documents internes, et si vous resterez libre d’en changer.

## 1. Ne liez pas votre métier à un fournisseur

Les modèles se renouvellent en permanence. Les tarifs évoluent, les conditions d’utilisation changent, les pays d’hébergement bougent, et un fournisseur peut déprécier du jour au lendemain la version sur laquelle vous avez tout bâti.

Vos processus, vos règles métier et vos connecteurs doivent donc vivre dans votre couche à vous, pas à l’intérieur du modèle. Bien construit, un changement de moteur est une décision d’une journée. Mal construit, c’est un projet.

> **Le risque si vous l’ignorez** — chaque évolution de modèle redevient un chantier informatique, et votre pouvoir de négociation tombe à zéro : votre fournisseur sait parfaitement que vous ne pouvez pas partir.

## 2. Adaptez la puissance au besoin

On ne prend pas l’autoroute pour aller chercher le pain.

Classer un courriel, extraire une date d’un document, reformuler un paragraphe : un petit modèle suffit largement. Il coûte un ordre de grandeur moins cher et répond instantanément. Analyser un contrat, préparer une négociation, synthétiser six mois d’échanges : là, il faut sortir le grand modèle, et il vaut son prix.

Aiguiller automatiquement chaque tâche vers le moteur qui lui correspond est ce qui fait la différence entre une IA que trois personnes essaient et une IA que toute l’entreprise utilise tous les jours. C’est une question d’économie, pas de technique : à l’échelle de cent collaborateurs et de plusieurs milliers de requêtes par mois, l’écart n’est plus un détail de facture.

> **Le risque si vous l’ignorez** — vous payez le tarif « analyse de contrat » pour trier des courriels, et la facture tue le projet avant même que l’usage ne s’installe.

## 3. Une IA ne doit voir que ce que voit son utilisateur

C’est la décision la plus importante, et celle qu’on prend le plus souvent par défaut.

Une IA n’a pas de droits propres. Elle emprunte ceux de la personne qu’elle sert, et elle les perd quand cette personne les perd. Ni plus, ni moins. C’est toute la différence entre un assistant personnel et un moteur de recherche interne qui a recopié votre SharePoint dans une base unique, où les habilitations de chacun ont été aplaties au passage.

Un exemple suffit à trancher : **la comptabilité ne doit pas voir le SharePoint des ressources humaines — et les ressources humaines ne doivent pas voir celui de la comptabilité.** Ce n’est pas une question de hiérarchie, c’est une cloison, et elle doit tenir dans les deux sens. Si l’assistant de l’un peut répondre sur les dossiers de l’autre, la cloison n’existe plus, quelles que soient les intentions affichées.

### Comment cela fonctionne, concrètement

Sur Microsoft 365, la bonne architecture tient en une phrase : **c’est Microsoft qui tranche, pas nous.**

Chaque collaborateur autorise son assistant depuis son propre compte. Toute lecture de fichier part ensuite vers Microsoft Graph *en son nom* : c’est Microsoft qui vérifie les droits, document par document, exactement comme lorsqu’il ouvre le fichier lui-même. Aucune règle d’habilitation n’est réécrite de notre côté — donc aucune ne peut être mal réécrite.

Dans notre propre produit, cela se traduit par des permissions volontairement étroites, vérifiables par votre DSI sur l’écran d’autorisation :

- **OneDrive personnel** — lecture et écriture. Ses fichiers, son espace.
- **SharePoint et fichiers partagés** — lecture seule. Le droit d’écrire sur les espaces partagés n’a jamais été demandé.
- **Supprimer, partager, déplacer** — jamais. Ces actions ne sont pas exposées à l’assistant, quel que soit le niveau de droits du collaborateur.
- **Messagerie** — lecture et préparation de brouillons. L’envoi automatique n’existe pas : un humain clique toujours sur « Envoyer ».
- **Boîtes et agendas partagés** — accessibles uniquement si un administrateur a délégué l’accès dans Microsoft 365.
- **Retrait d’un accès** — immédiat. Rien n’ayant été recopié, aucune copie ne survit à la révocation.

Vos documents ne sont dupliqués nulle part. Il n’existe pas de base commune où l’on aurait recopié OneDrive et SharePoint pour les rendre « interrogeables » : chaque fichier est lu à la demande, au moment de la question, avec les identifiants du collaborateur.

### Ce que cela ne fait pas

Soyons clairs, parce que beaucoup promettent l’inverse : **si un dossier SharePoint est aujourd’hui partagé trop largement, l’assistant le verra — parce que le collaborateur le voit déjà.**

Une IA bien conçue n’élargit jamais le périmètre. Mais elle ne répare pas un partage mal configuré : elle le rend visible, et souvent très vite. C’est une excellente raison de commencer par un audit de partage, et une raison suffisante de se méfier de tout fournisseur qui vous affirme que son outil réglera le problème à votre place.

> **Le risque si vous l’ignorez** — le premier collaborateur qui demande « quelle est la grille des salaires ? » obtient le document. Une seule fois suffit.

## Quatre questions, cinq minutes

Vous n’avez pas besoin d’être ingénieur pour évaluer une proposition d’IA. Posez ces quatre questions à votre DSI ou à votre prestataire, et écoutez la forme de la réponse.

**1. La comptabilité peut-elle interroger le SharePoint des RH ? Et les RH celui de la comptabilité ?**
La seule bonne réponse est « non, dans les deux sens, et pour la même raison qu’aujourd’hui sans IA ». Si la cloison repose sur une consigne donnée au modèle plutôt que sur les droits Microsoft, elle tombera le jour où quelqu’un formulera bien sa question.

**2. Si notre fournisseur double ses prix demain, combien de jours pour basculer ?**
Une réponse en semaines ou en mois signale que votre métier est écrit à l’intérieur du modèle.

**3. Quel modèle traite un tri de courriels, et combien coûte-t-il par rapport à une analyse de contrat ?**
S’il n’y en a qu’un seul pour tout, vous surpayez chaque tâche simple, tous les jours.

**4. Si je retire à un collaborateur l’accès à un espace SharePoint ce soir, que voit son assistant demain matin ?**
La bonne réponse est « exactement la même chose que lui, donc plus rien ». Si la réponse mentionne une réindexation à venir, c’est qu’une copie de vos documents vit ailleurs.

## En un mot

Le choix du modèle est une décision de chaque mois. Le choix du harness est une décision de cinq ans : c’est lui qui fixe qui voit quoi, ce que chaque tâche vous coûte, et si vous gardez la main.

Mettez le débat là.
