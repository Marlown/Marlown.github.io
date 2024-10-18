const questions = [
  {
    question:
      "Quel est le moyen de transport le plus utilisé pour partir en vacances ?",
    answers: [
      { answer: "Voiture", points: 50 },
      { answer: "Avion", points: 30 },
      { answer: "Train", points: 15 },
      { answer: "Bus", points: 5 },
      { answer: "Bateau", points: 5 },
    ],
  },
  {
    question: "Quelle est la destination de vacances préférée des Français ?",
    answers: [
      { answer: "Côte d'Azur", points: 40 },
      { answer: "Corse", points: 30 },
      { answer: "Bretagne", points: 20 },
      { answer: "Paris", points: 5 },
      { answer: "Alpes", points: 5 },
    ],
  },
  {
    question: "Que prenez-vous toujours dans votre valise pour les vacances ?",
    answers: [
      { answer: "Vêtements", points: 50 },
      { answer: "Maillot de bain", points: 30 },
      { answer: "Trousse de toilette", points: 10 },
      { answer: "Chaussures", points: 5 },
      { answer: "Chargeur de téléphone", points: 5 },
    ],
  },
  {
    question: "Quelles activités faites-vous souvent à la plage ?",
    answers: [
      { answer: "Nager", points: 40 },
      { answer: "Bronzer", points: 30 },
      { answer: "Lire un livre", points: 15 },
      { answer: "Faire du sport", points: 10 },
      { answer: "Construire des châteaux de sable", points: 5 },
    ],
  },
  {
    question: "Quels pays sont connus pour leurs plages paradisiaques ?",
    answers: [
      { answer: "Maldives", points: 50 },
      { answer: "Thaïlande", points: 25 },
      { answer: "Seychelles", points: 15 },
      { answer: "Mexique", points: 10 },
      { answer: "Grèce", points: 5 },
    ],
  },
  {
    question: "Quelles activités faites-vous à la montagne ?",
    answers: [
      { answer: "Ski", points: 50 },
      { answer: "Randonnée", points: 30 },
      { answer: "Snowboard", points: 10 },
      { answer: "Escalade", points: 5 },
      { answer: "VTT", points: 5 },
    ],
  },
  {
    question: "Quel est le premier réflexe après avoir réservé un hôtel ?",
    answers: [
      { answer: "Vérifier les horaires", points: 40 },
      { answer: "Préparer ses bagages", points: 30 },
      { answer: "Planifier les activités", points: 15 },
      { answer: "Imprimer la réservation", points: 10 },
      { answer: "Vérifier la météo", points: 5 },
    ],
  },
  {
    question: "Quel accessoire de voyage est indispensable ?",
    answers: [
      { answer: "Passeport", points: 50 },
      { answer: "Valise", points: 30 },
      { answer: "Oreiller de voyage", points: 10 },
      { answer: "Lunettes de soleil", points: 5 },
      { answer: "Bouteille d'eau", points: 5 },
    ],
  },
  {
    question:
      "Que faites-vous souvent dans un avion pendant un vol long-courrier ?",
    answers: [
      { answer: "Regarder des films", points: 40 },
      { answer: "Dormir", points: 30 },
      { answer: "Lire", points: 15 },
      { answer: "Écouter de la musique", points: 10 },
      { answer: "Manger", points: 5 },
    ],
  },
  {
    question: "Quels documents sont indispensables pour voyager à l'étranger ?",
    answers: [
      { answer: "Passeport", points: 50 },
      { answer: "Visa", points: 25 },
      { answer: "Billet d'avion", points: 15 },
      { answer: "Assurance de voyage", points: 5 },
      { answer: "Carte d'identité", points: 5 },
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
  localStorage.setItem("voyages-vacances", "played"); // Sauvegarder dans le localStorage
  disableThemeOnReturn("voyages-vacances");
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
