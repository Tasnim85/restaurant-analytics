export const POWERBI_DASHBOARDS = {
  manager: {
    url: "https://app.powerbi.com/reportEmbed?reportId=9fc8b5ef-615b-4e85-aa9d-6c1b737ff671&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730",
    title: "Dashboard Manager - Vue Complète",
    description: "Accès à toutes les données et métriques",
    features: [
      "Vue d'ensemble complète",
      "Tous les restaurants",
      "Analyses avancées",
      "Gestion des utilisateurs"
    ]
  },
  responsable_clientele: {
    url: "https://app.powerbi.com/view?r=YOUR_CLIENTELE_URL",
    title: "Dashboard Clientèle",
    description: "Satisfaction client et avis",
    features: [
      "Satisfaction clients",
      "Gestion des avis",
      "Notes par restaurant",
      "Tendances clientèle"
    ]
  },
  responsable_marketing: {
    url: "https://app.powerbi.com/view?r=YOUR_MARKETING_URL",
    title: "Dashboard Marketing",
    description: "Campagnes et performances marketing",
    features: [
      "Campagnes actives",
      "ROI marketing",
      "Segments clients",
      "Analyses marketing"
    ]
  },
  responsable_franchise: {
    url: "https://app.powerbi.com/view?r=YOUR_FRANCHISE_URL",
    title: "Dashboard Franchise",
    description: "Performance par franchise",
    features: [
      "Vue par franchise",
      "Comparaisons",
      "Performances",
      "Statistiques franchise"
    ]
  }
};

export function getDashboardByRole(role) {
  return POWERBI_DASHBOARDS[role] || POWERBI_DASHBOARDS.manager;
}
