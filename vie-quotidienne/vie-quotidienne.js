const questions = [
  {
    question:
      "Quel est le premier geste que vous faites le matin en vous réveillant ?",
    answers: [
      { answer: "Éteindre le réveil", points: 40 },
      { answer: "Vérifier son téléphone", points: 30 },
      { answer: "Se lever immédiatement", points: 15 },
      { answer: "Boire de l'eau", points: 10 },
      { answer: "S'étirer", points: 5 },
    ],
  },
  {
    question: "Que faites-vous généralement pendant votre pause déjeuner ?",
    answers: [
      { answer: "Manger", points: 50 },
      { answer: "Regarder des vidéos", points: 25 },
      { answer: "Discuter avec des collègues", points: 15 },
      { answer: "Marcher", points: 5 },
      { answer: "Lire", points: 5 },
    ],
  },
  {
    question: "Quelle tâche ménagère faites-vous le plus souvent ?",
    answers: [
      { answer: "Faire la vaisselle", points: 50 },
      { answer: "Passer l'aspirateur", points: 25 },
      { answer: "Faire le lit", points: 15 },
      { answer: "Faire la lessive", points: 5 },
      { answer: "Ranger la maison", points: 5 },
    ],
  },
  {
    question: "Comment vous rendez-vous généralement au travail ?",
    answers: [
      { answer: "Voiture", points: 40 },
      { answer: "Transport en commun", points: 30 },
      { answer: "À pied", points: 15 },
      { answer: "Vélo", points: 10 },
      { answer: "Trottinette", points: 5 },
    ],
  },
  {
    question:
      "Quel appareil électroménager utilisez-vous le plus souvent à la maison ?",
    answers: [
      { answer: "Réfrigérateur", points: 50 },
      { answer: "Four à micro-ondes", points: 30 },
      { answer: "Lave-linge", points: 15 },
      { answer: "Aspirateur", points: 5 },
      { answer: "Bouilloire", points: 5 },
    ],
  },
  {
    question: "Quel repas cuisinez-vous le plus souvent en semaine ?",
    answers: [
      { answer: "Pâtes", points: 40 },
      { answer: "Riz", points: 30 },
      { answer: "Sandwich", points: 15 },
      { answer: "Salade", points: 10 },
      { answer: "Soupe", points: 5 },
    ],
  },
  {
    question:
      "Quelle activité faites-vous après le travail pour vous détendre ?",
    answers: [
      { answer: "Regarder la télévision", points: 40 },
      { answer: "Lire un livre", points: 25 },
      { answer: "Faire une sieste", points: 15 },
      { answer: "Sortir marcher", points: 10 },
      { answer: "Méditer", points: 5 },
    ],
  },
  {
    question: "Quel est votre rituel du soir avant de dormir ?",
    answers: [
      { answer: "Regarder la télévision", points: 40 },
      { answer: "Lire un livre", points: 25 },
      { answer: "Méditer", points: 15 },
      { answer: "Prendre une douche", points: 10 },
      { answer: "Boire un thé", points: 5 },
    ],
  },
  {
    question: "Quelle activité faites-vous le plus souvent le week-end ?",
    answers: [
      { answer: "Sortir avec des amis", points: 40 },
      { answer: "Faire du sport", points: 30 },
      { answer: "Regarder des films/séries", points: 20 },
      { answer: "Faire les courses", points: 10 },
      { answer: "Jardiner", points: 5 },
    ],
  },
  {
    question:
      "Quel est votre moyen de transport préféré pour les trajets courts ?",
    answers: [
      { answer: "Voiture", points: 40 },
      { answer: "Vélo", points: 30 },
      { answer: "Scooter", points: 15 },
      { answer: "À pied", points: 10 },
      { answer: "Trottinette", points: 5 },
    ],
  },
];

let currentQuestionIndex = 0;
let scoreA = 0;
let scoreB = 0;

// Fonction pour jouer un son lors du clic sur une réponse
function playClickSound() {
  const audio = new Audio("../audio/click-sound.mp3"); // Chemin relatif vers le fichier audio du clic
  audio.currentTime = 0; // Réinitialiser l'audio avant la lecture
  audio.play();
}

// Fonction d'animation visuelle lors de la révélation
function applyVisualEffect(element) {
  element.style.transition = "background-color 0.5s, transform 0.5s";
  element.style.backgroundColor = "rgba(255, 215, 0, 0.5)";
  element.style.transform = "scale(1.1)";
  setTimeout(() => {
    element.style.backgroundColor = "rgba(255, 215, 0, 0.1)";
    element.style.transform = "scale(1)";
  }, 1000); // Retour à l'état normal après 1 seconde
}

// Fonction d'affichage de la question et des réponses
function displayQuestion() {
  if (currentQuestionIndex >= questions.length) {
    // Marquer le thème comme joué et rediriger vers la page d'accueil
    finishGame(); // Appel de la fonction finishGame ici
    return;
  }

  let currentQuestion = questions[currentQuestionIndex];
  document.getElementById("question").innerText = currentQuestion.question;

  let answersList = document.getElementById("answers");
  answersList.innerHTML = ""; // Effacer les anciennes réponses

  currentQuestion.answers.forEach((answerObj, index) => {
    let li = document.createElement("li");
    li.innerText = "Réponse"; // Masquer les réponses au départ
    li.id = "answer-" + index; // Donner un identifiant unique à chaque réponse

    // Ajouter un événement au clic pour révéler la réponse et jouer le son
    li.addEventListener("click", function () {
      li.innerText = `${answerObj.answer} - ${answerObj.points} points`; // Révéler la réponse
      playClickSound(); // Jouer le son du clic
      applyVisualEffect(li); // Appliquer un effet visuel

      // Attribuer des points à une équipe
      let team = prompt(
        "Attribuer les points à quelle équipe ? A ou B"
      ).toLowerCase();
      if (team === "a") {
        scoreA += answerObj.points;
        document.getElementById("score-a").innerText = scoreA;
      } else if (team === "b") {
        scoreB += answerObj.points;
        document.getElementById("score-b").innerText = scoreB;
      }
    });

    answersList.appendChild(li);
  });

  startTimer();
}

// Fonction pour démarrer le minuteur
let timer;
function startTimer() {
  let timeLeft = 60;
  document.getElementById("time").innerText = timeLeft;

  clearInterval(timer); // Stopper tout minuteur précédent
  timer = setInterval(function () {
    timeLeft--;
    document.getElementById("time").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      currentQuestionIndex++;
      displayQuestion();
    }
  }, 1000);
}
// Fonction pour désactiver le thème sur la page d'accueil
function disableThemeOnReturn(themeId) {
  // Récupérer le tableau des thèmes joués depuis le localStorage
  let played = JSON.parse(localStorage.getItem("played")) || [];

  // Ajouter le thème à la liste des thèmes joués s'il n'y est pas déjà
  if (!played.includes(themeId)) {
    played.push(themeId);
  }

  // Sauvegarder le tableau dans le localStorage
  localStorage.setItem("played", JSON.stringify(played));
}
// Fonction pour marquer le thème comme terminé et rediriger vers l'accueil
function finishGame() {
  // Marquer le thème "Vie-quotidienne" comme joué
  localStorage.setItem("vie-quotidienne", "played"); // Sauvegarder dans le localStorage
  disableThemeOnReturn("vie-quotidienne");
  // Message de fin et redirection vers la page d'accueil
  alert("Thème terminé ! Vous allez être redirigé vers l'accueil.");
  setTimeout(function () {
    window.location.href = "../index.html"; // Redirection vers la page d'accueil
  }, 1000); // Attente de 3 secondes avant la redirection
}

// Gestion du bouton "Passer à la question suivante"
document.getElementById("next-question").addEventListener("click", function () {
  clearInterval(timer);
  currentQuestionIndex++;
  displayQuestion();
});

// Initialiser la première question
displayQuestion();
