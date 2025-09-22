# TodoApp
Ce projet est une application de gestion de tâches (todo list) réalisée avec React.
Il a été créé suivant cet algorithmique:
Ce projet est une application de gestion de tâches (todo list) réalisée avec React.
ALGORITHME TodoApp

VARIABLES
    taches : TABLEAU DE OBJET { id: ENTIER, text: CHAINE, completed: BOOLEEN }  // Liste des tâches avec ID, texte et statut
    nouvelleTache : CHAINE       // Texte saisi par l'utilisateur pour une nouvelle tâche
    erreur : BOOLEEN             // Indique s'il y a une erreur (champ vide)
    choixUtilisateur : ENTIER    // Choix du menu (simulé dans une interface réelle)

DEBUT

    // Initialisation
    taches ← VIDE
    erreur ← FAUX

    // Charger les données depuis le stockage local (localStorage)
    DONNEES_SAUVEGARDEES ← LIRE_DEPUIS_LOCALSTORAGE("todo-tasks")
    SI DONNEES_SAUVEGARDEES N'EST PAS NULL ALORS
        taches ← CONVERTIR_EN_OBJET(DONNEES_SAUVEGARDEES)
    FINSI

    // Boucle principale de l'application (simulée dans une interface événementielle)
    TANT QUE vrai FAIRE  // En React, cette boucle est remplacée par des écouteurs d'événements

        // Événement : Ajouter une tâche (déclenché par un clic sur "Ajouter")
        AU_SUBMIT_DU_FORMULAIRE:
            nouvelleTache ← VALEUR_DU_CHAMP_TEXT
            SI nouvelleTache EST VIDE OU nouvelleTache.TRIM() = "" ALORS
                erreur ← VRAI
                AFFICHER_MESSAGE_ERREUR("⚠️ Veuillez entrer une tâche valide.")
                METTRE_EN_PAUSE(2000)  // Pendant 2 secondes
                erreur ← FAUX
            SINON
                NOUVELLE_TACHE ← {
                    id ← DATE_ACTUELLE_EN_MS(),     // Ex: Date.now()
                    text ← nouvelleTache.TRIM(),
                    completed ← FAUX
                }
                AJOUTER NOUVELLE_TACHE À taches
                SAUVEGARDER_DANS_LOCALSTORAGE("todo-tasks", taches)
                REINITIALISER_CHAMP_TEXT()
                erreur ← FAUX
            FINSI

        // Événement : Cocher/décocher une tâche
        AU_CLICK_SUR_COCHE(id):
            POUR chaque tache DANS taches FAIRE
                SI tache.id = id ALORS
                    tache.completed ← NON tache.completed
                FINSI
            FINPOUR
            SAUVEGARDER_DANS_LOCALSTORAGE("todo-tasks", taches)

        // Événement : Supprimer une tâche
        AU_CLICK_SUR_SUPPRIMER(id):
            taches ← FILTRER(taches, tache => tache.id ≠ id)
            SAUVEGARDER_DANS_LOCALSTORAGE("todo-tasks", taches)

        // Événement : Supprimer toutes les tâches
        AU_CLICK_SUR_SUPPRIMER_TOUT:
            SI taches.NOMBRE > 0 ALORS
                CONFIRMATION ← DEMANDER_CONFIRmation("Supprimer toutes les tâches ?")
                SI CONFIRMATION = OUI ALORS
                    taches ← VIDE
                    SAUVEGARDER_DANS_LOCALSTORAGE("todo-tasks", taches)
                FINSI
            FINSI

        // Rendu de l'interface utilisateur
        AFFICHER_EN_TETE():
            AFFICHER("<h1>📝 Todo App</h1>")
            AFFICHER("<p>Organise tes tâches simplement</p>")

        AFFICHER_FORMULAIRE():
            AFFICHER("<input type='text' placeholder='Quelle est votre tâche ?'>")
            AFFICHER("<button>Ajouter (+)</button>")
            SI erreur = VRAI ALORS
                AFFICHER("<p class='error'>⚠️ Veuillez entrer une tâche valide.</p>")
            FINSI

        AFFICHER_LISTE_TACHES():
            SI taches EST VIDE ALORS
                AFFICHER("<li>Aucune tâche pour le moment.</li>")
            SINON
                POUR chaque tache DANS taches FAIRE
                    AFFICHER("<li>")
                    AFFICHER("<input type='checkbox' checked='" + tache.completed + "'>")
                    AFFICHER("<span class='" + SI tache.completed ALORS "completed" + "'>" + tache.text + "</span>")
                    AFFICHER("<button onclick='supprimer(" + tache.id + ")'>🗑️</button>")
                    AFFICHER("</li>")
                FINPOUR
            FINSI

        SI taches.NOMBRE > 0 ALORS
            AFFICHER_BOUTON_SUPPRIMER_TOUT()

        AFFICHER_FOOTER():
            AFFICHER("&copy; 2025 Todo App. Tous droits réservés.")

    FINTANTQUE

FIN
