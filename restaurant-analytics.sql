-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : lun. 20 oct. 2025 à 23:58
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `restaurant-analytics`
--

-- --------------------------------------------------------

--
-- Structure de la table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `permissions`
--

INSERT INTO `permissions` (`id`, `nom`, `description`, `created_at`) VALUES
(1, 'view_dashboard', 'Voir le tableau de bord', '2025-10-20 21:43:21'),
(2, 'view_predictions', 'Voir les prédictions', '2025-10-20 21:43:21'),
(3, 'view_reports', 'Voir les rapports', '2025-10-20 21:43:21'),
(4, 'create_reports', 'Créer des rapports', '2025-10-20 21:43:21'),
(5, 'edit_users', 'Modifier les utilisateurs', '2025-10-20 21:43:21'),
(6, 'view_franchise', 'Voir les informations franchise', '2025-10-20 21:43:21'),
(7, 'manage_franchise', 'Gérer les franchises', '2025-10-20 21:43:21'),
(8, 'view_marketing', 'Voir les données marketing', '2025-10-20 21:43:21'),
(9, 'manage_marketing', 'Gérer les campagnes marketing', '2025-10-20 21:43:21'),
(10, 'view_clients', 'Voir les clients', '2025-10-20 21:43:21'),
(11, 'manage_clients', 'Gérer les clients', '2025-10-20 21:43:21');

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `nom`, `description`, `created_at`) VALUES
(1, 'manager', 'Gestionnaire principal avec accès complet', '2025-10-20 21:43:21'),
(2, 'responsable_clientele', 'Gestion des clients et satisfaction', '2025-10-20 21:43:21'),
(3, 'responsable_marketing', 'Gestion des campagnes marketing', '2025-10-20 21:43:21'),
(4, 'responsable_franchise', 'Gestion des franchises', '2025-10-20 21:43:21');

-- --------------------------------------------------------

--
-- Structure de la table `role_permissions`
--

CREATE TABLE `role_permissions` (
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `role_permissions`
--

INSERT INTO `role_permissions` (`role_id`, `permission_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9),
(1, 10),
(1, 11),
(2, 1),
(2, 3),
(2, 10),
(2, 11),
(3, 1),
(3, 2),
(3, 3),
(3, 8),
(3, 9),
(4, 1),
(4, 3),
(4, 6),
(4, 7);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `role_id` int(11) NOT NULL,
  `actif` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `nom`, `prenom`, `role_id`, `actif`, `created_at`, `updated_at`) VALUES
(1, 'manager@restaurant.com', 'LE_HASH_GENERE', 'Dupont', 'Jean', 1, 1, '2025-10-20 21:52:12', '2025-10-20 21:52:12'),
(2, 'client@restaurant.com', 'LE_HASH_GENERE', 'Martin', 'Marie', 2, 1, '2025-10-20 21:52:12', '2025-10-20 21:52:12'),
(3, 'marketing@restaurant.com', 'LE_HASH_GENERE', 'Dubois', 'Pierre', 3, 1, '2025-10-20 21:52:12', '2025-10-20 21:52:12'),
(4, 'franchise@restaurant.com', 'LE_HASH_GENERE', 'Bernard', 'Sophie', 4, 1, '2025-10-20 21:52:12', '2025-10-20 21:52:12');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nom` (`nom`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nom` (`nom`);

--
-- Index pour la table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`role_id`,`permission_id`),
  ADD KEY `permission_id` (`permission_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
