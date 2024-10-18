const questions = [
  {
    question: "Quel plat français est le plus populaire ?",
    answers: [
      { answer: "Bœuf bourguignon", points: 40 },
      { answer: "Ratatouille", points: 25 },
      { answer: "Croque-monsieur", points: 15 },
      { answer: "Cassoulet", points: 10 },
      { answer: "Quiche Lorraine", points: 10 },
    ],
  },
  {
    question: "Qu'est-ce qu'on met sur des crêpes ?",
    answers: [
      { answer: "Nutella", points: 40 },
      { answer: "Sucre", points: 25 },
      { answer: "Confiture", points: 20 },
      { answer: "Chantilly", points: 10 },
      { answer: "Sirop d'érable", points: 5 },
    ],
  },
  {
    question: "Quel est le repas typique d'un petit-déjeuner français ?",
    answers: [
      { answer: "Croissant", points: 50 },
      { answer: "Pain avec confiture", points: 25 },
      { answer: "Jus d'orange", points: 15 },
      { answer: "Café", points: 10 },
      { answer: "Yaourt", points: 5 },
    ],
  },
  {
    question: "Quels fruits sont souvent utilisés pour faire un smoothie ?",
    answers: [
      { answer: "Banane", points: 40 },
      { answer: "Fraise", points: 30 },
      { answer: "Mangue", points: 15 },
      { answer: "Ananas", points: 10 },
      { answer: "Ananas", points: 5 },
    ],
  },
  {
    question: "Quel dessert français est souvent servi dans les restaurants ?",
    answers: [
      { answer: "Crème brûlée", points: 40 },
      { answer: "Tarte Tatin", points: 25 },
      { answer: "Éclair au chocolat", points: 15 },
      { answer: "Profiteroles", points: 10 },
      { answer: "Profiteroles", points: 10 },
    ],
  },
  {
    question: "Quel est l'ingrédient principal dans un gratin dauphinois ?",
    answers: [
      { answer: "Pommes de terre", points: 50 },
      { answer: "Crème", points: 25 },
      { answer: "Fromage", points: 15 },
      { answer: "Ail", points: 5 },
      { answer: "Beurre", points: 5 },
    ],
  },
  {
    question: "Quel est le fromage français le plus célèbre ?",
    answers: [
      { answer: "Camembert", points: 50 },
      { answer: "Roquefort", points: 30 },
      { answer: "Brie", points: 15 },
      { answer: "Comté", points: 10 },
      { answer: "Chèvre", points: 5 },
    ],
  },
  {
    question:
      "Quel plat est souvent associé à la cuisine française régionale ?",
    answers: [
      { answer: "Bouillabaisse", points: 50 },
      { answer: "Quiche", points: 25 },
      { answer: "Tartiflette", points: 15 },
      { answer: "Coq au vin", points: 10 },
      { answer: "Aligot", points: 5 },
    ],
  },
  {
    question: "Quel vin est le plus souvent consommé en France ?",
    answers: [
      { answer: "Vin rouge", points: 50 },
      { answer: "Vin blanc", points: 25 },
      { answer: "Champagne", points: 15 },
      { answer: "Rosé", points: 10 },
      { answer: "Vin mousseux", points: 5 },
    ],
  },
  {
    question:
      "Quel dessert français est particulièrement populaire pendant Noël ?",
    answers: [
      { answer: "Bûche de Noël", points: 50 },
      { answer: "Galette des rois", points: 25 },
      { answer: "Mille-feuille", points: 15 },
      { answer: "Macarons", points: 10 },
      { answer: "Clafoutis", points: 5 },
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
  localStorage.setItem("alimentation", "played"); // Sauvegarder dans le localStorage
  disableThemeOnReturn("alimentation");
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
