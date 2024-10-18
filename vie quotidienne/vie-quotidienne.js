const group1 = [
  {
    question: "Que faites-vous juste avant de vous coucher ?",
    answers: [
      { answer: "Se brosser les dents", points: 40 },
      { answer: "Regarder la télévision", points: 25 },
      { answer: "Vérifier le téléphone", points: 20 },
      { answer: "Lire un livre", points: 10 },
      { answer: "Boire un verre d'eau", points: 5 },
    ],
  },
  {
    question:
      "Quel moyen de transport utilisez-vous le plus souvent pour aller travailler ?",
    answers: [
      { answer: "Voiture", points: 50 },
      { answer: "Bus", points: 20 },
      { answer: "Métro", points: 15 },
      { answer: "Vélo", points: 10 },
      { answer: "À pied", points: 5 },
    ],
  },
  {
    question: "Quelles tâches faites-vous habituellement le week-end ?",
    answers: [
      { answer: "Faire les courses", points: 40 },
      { answer: "Faire le ménage", points: 30 },
      { answer: "Faire du sport", points: 15 },
      { answer: "Cuisiner", points: 10 },
      { answer: "Sortir avec des amis", points: 5 },
    ],
  },
  {
    question: "Citez une corvée que vous détestez faire à la maison.",
    answers: [
      { answer: "Faire la vaisselle", points: 40 },
      { answer: "Repasser", points: 30 },
      { answer: "Passer l'aspirateur", points: 15 },
      { answer: "Nettoyer les toilettes", points: 10 },
      { answer: "Sortir les poubelles", points: 5 },
    ],
  },
  {
    question: "Quel type de programme TV regardez-vous le plus souvent ?",
    answers: [
      { answer: "Séries", points: 40 },
      { answer: "Films", points: 30 },
      { answer: "Information/actualités", points: 15 },
      { answer: "Documentaires", points: 10 },
      { answer: "Documentaires", points: 5 },
    ],
  },
];

const group2 = [
  // Questions du Groupe 2
  {
    question: "Quel est le plat préféré des Français ?",
    answers: [
      { answer: "Bœuf bourguignon", points: 40 },
      { answer: "Ratatouille", points: 25 },
      { answer: "Croque-monsieur", points: 15 },
      { answer: "Cassoulet", points: 10 },
      { answer: "Quiche Lorraine", points: 10 },
    ],
  },
  // Autres questions du Groupe 2...
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
