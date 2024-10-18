// Fonction pour désactiver un thème temporairement (pour cette session uniquement)
function disableTheme(themeId) {
  document.getElementById(themeId).classList.add("disabled"); // Appliquer la classe disabled
}

// Gestion des redirections en fonction du thème sélectionné
document.querySelectorAll(".theme").forEach((theme) => {
  theme.addEventListener("click", function () {
    let selectedTheme = this.getAttribute("data-theme"); // Obtenir le thème sélectionné

    // Vérification si le thème est déjà désactivé
    if (this.classList.contains("disabled")) return; // Si le thème est désactivé, ne rien faire

    // Redirection en fonction du thème sélectionné
    switch (selectedTheme) {
      case "vie-quotidienne":
        window.location.href = "/vie quotidienne/vie-quotidienne.html";
        break;
      case "alimentation":
        window.location.href = "/Alimentation/alimentation.html";
        break;
      case "voyages-vacances":
        window.location.href = "/voyage-vacance/voyage-vacance.html";
        break;
      case "celebrations-fetes":
        window.location.href = "/celebration-fete/celebrations-fetes.html";
        break;
      case "famille-relations":
        window.location.href = "/Famille-relations/famille-relations.html";
        break;
      case "divertissement":
        window.location.href = "/Divertissement/divertissement.html";
        break;
      default:
        alert("Ce thème n'est pas encore configuré.");
        break;
    }

    // Désactiver le thème après sélection (temporairement pour cette session)
    disableTheme(this.id); // Désactiver seulement pour cette session
  });
});

// Ne plus utiliser localStorage pour conserver les thèmes désactivés
