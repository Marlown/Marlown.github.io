const questions = [
  {
    question: "Quels sont les types de films les plus populaires ?",
    answers: [
      { answer: "Comédie", points: 40 },
      { answer: "Action", points: 30 },
      { answer: "Science-fiction", points: 15 },
      { answer: "Drame", points: 10 },
      { answer: "Horreur", points: 5 },
    ],
  },
  {
    question: "Quel est le loisir préféré des Français ?",
    answers: [
      { answer: "Regarder la télévision", points: 40 },
      { answer: "Faire du sport", points: 30 },
      { answer: "Lire", points: 15 },
      { answer: "Jouer aux jeux vidéo", points: 10 },
      { answer: "Faire du shopping", points: 5 },
    ],
  },
  {
    question: "Quels sont les jeux de société les plus populaires ?",
    answers: [
      { answer: "Monopoly", points: 40 },
      { answer: "Scrabble", points: 25 },
      { answer: "Uno", points: 20 },
      { answer: "Trivial Pursuit", points: 10 },
      { answer: "Risk", points: 5 },
    ],
  },
  {
    question: "Quels sont les sports les plus regardés à la télévision ?",
    answers: [
      { answer: "Football", points: 50 },
      { answer: "Rugby", points: 25 },
      { answer: "Tennis", points: 15 },
      { answer: "Cyclisme", points: 10 },
      { answer: "Basketball", points: 5 },
    ],
  },
  {
    question: "Quels sont les genres de musique les plus populaires ?",
    answers: [
      { answer: "Pop", points: 40 },
      { answer: "Rap", points: 30 },
      { answer: "Rock", points: 15 },
      { answer: "Jazz", points: 10 },
      { answer: "Musique classique", points: 5 },
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

// Fonction pour marquer le thème comme terminé et rediriger vers l'accueil
function finishGame() {
  // Marquer le thème "Vie quotidienne" comme joué
  localStorage.setItem("vie-quotidienne", "played"); // Sauvegarder dans le localStorage

  // Message de fin et redirection vers la page d'accueil
  alert("Thème terminé ! Vous allez être redirigé vers l'accueil.");
  setTimeout(function () {
    window.location.href = "../index.html"; // Redirection vers la page d'accueil
  }, 3000); // Attente de 3 secondes avant la redirection
}

// Gestion du bouton "Passer à la question suivante"
document.getElementById("next-question").addEventListener("click", function () {
  clearInterval(timer);
  currentQuestionIndex++;
  displayQuestion();
});

// Initialiser la première question
displayQuestion();
