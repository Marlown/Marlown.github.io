// Fonction pour appliquer l'état des thèmes en fonction du tableau 'played'
function applyThemeState() {
  // Récupérer les thèmes joués depuis le localStorage
  let played = JSON.parse(localStorage.getItem("played")) || [];

  console.log(played);

  // Parcourir chaque thème et vérifier s'il a été joué
  const themes = [
    "vie-quotidienne",
    "alimentation",
    "voyages-vacances",
    "celebrations-fetes",
    "famille-relations",
    "divertissement",
  ];

  themes.forEach((themeId) => {
    if (played.includes(themeId)) {
      // Désactiver le thème s'il est dans la liste 'played'
      disableTheme(themeId);
    }
  });
}

// Fonction pour désactiver un thème
function disableTheme(themeId) {
  const themeElement = document.getElementById(themeId);
  if (themeElement) {
    themeElement.classList.add("disabled"); // Ajouter la classe CSS pour griser
    themeElement.style.pointerEvents = "none"; // Désactiver les clics
  }
}

// Appeler la fonction au chargement de la page pour désactiver les thèmes déjà joués
applyThemeState();

// Gestion des redirections en fonction du thème sélectionné
document.querySelectorAll(".theme").forEach((theme) => {
  theme.addEventListener("click", function () {
    let selectedTheme = this.getAttribute("data-theme"); // Obtenir le thème sélectionné

    // Vérification si le thème est déjà désactivé
    if (this.classList.contains("disabled")) return; // Si le thème est désactivé, ne rien faire

    // Redirection en fonction du thème sélectionné
    switch (selectedTheme) {
      case "vie-quotidienne":
        window.location.href = "vie-quotidienne/vie-quotidienne.html";
        break;
      case "alimentation":
        window.location.href = "Alimentation/alimentation.html";
        break;
      case "voyages-vacances":
        window.location.href = "voyages-vacances/voyages-vacances.html";
        break;
      case "celebrations-fetes":
        window.location.href = "celebration-fete/celebrations-fetes.html";
        break;
      case "famille-relations":
        window.location.href = "Famille-relations/famille-relations.html";
        break;
      case "divertissement":
        window.location.href = "Divertissement/divertissement.html";
        break;
      default:
        alert("Ce thème n'est pas encore configuré.");
        break;
    }
  });
});
