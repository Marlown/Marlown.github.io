const questions = [
  {
    question: "Quel est le meilleur cadeau à offrir pour un anniversaire ?",
    answers: [
      { answer: "Argent", points: 40 },
      { answer: "Vêtements", points: 25 },
      { answer: "Bijoux", points: 15 },
      { answer: "Fleurs", points: 10 },
      { answer: "Carte-cadeau", points: 10 },
    ],
  },
  {
    question: "Quel plat prépare-t-on souvent lors des repas de Noël ?",
    answers: [
      { answer: "Dinde", points: 50 },
      { answer: "Foie gras", points: 25 },
      { answer: "Saumon fumé", points: 15 },
      { answer: "Huîtres", points: 5 },
    ],
  },
  {
    question: "Quelles décorations met-on souvent pour Noël ?",
    answers: [
      { answer: "Sapin de Noël", points: 50 },
      { answer: "Guirlandes", points: 25 },
      { answer: "Boules de Noël", points: 15 },
      { answer: "Lumières de Noël", points: 10 },
      { answer: "Crèche", points: 5 },
    ],
  },
  {
    question: "Quelle boisson est typique du réveillon du Nouvel An ?",
    answers: [
      { answer: "Champagne", points: 50 },
      { answer: "Vin", points: 25 },
      { answer: "Cocktail", points: 15 },
      { answer: "Cidre", points: 5 },
      { answer: "Punch", points: 5 },
    ],
  },
  {
    question: "Quels cadeaux sont souvent offerts à la Saint-Valentin ?",
    answers: [
      { answer: "Fleurs", points: 40 },
      { answer: "Chocolats", points: 30 },
      { answer: "Bijoux", points: 15 },
      { answer: "Parfum", points: 10 },
      { answer: "Dîner romantique", points: 5 },
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
    li.innerText = "Réponse cachée"; // Masquer les réponses au départ
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
  localStorage.setItem("celebrations-fetes", "played"); // Sauvegarder dans le localStorage
  disableThemeOnReturn("celebrations-fetes");

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
