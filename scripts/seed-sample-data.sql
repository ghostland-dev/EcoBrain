-- Données d'exemple pour EcoBrain

-- Insérer des utilisateurs de test
INSERT INTO users (first_name, last_name, email, password_hash, company_name, company_size, plan_type, email_verified) VALUES
('Marie', 'Dubois', 'marie@ecobrain.fr', 'hashed_password_1', 'EcoBrain SAS', '11-50', 'enterprise', TRUE),
('Jean', 'Martin', 'jean.martin@techcorp.fr', 'hashed_password_2', 'TechCorp', '51-200', 'professional', TRUE),
('Sophie', 'Laurent', 'sophie@greenshop.fr', 'hashed_password_3', 'GreenShop', '1-10', 'starter', TRUE),
('Pierre', 'Durand', 'pierre@manufacturing.fr', 'hashed_password_4', 'Manufacturing Plus', '201-500', 'professional', TRUE),
('Emma', 'Rousseau', 'emma@startup.fr', 'hashed_password_5', 'EcoStartup', '1-10', 'starter', TRUE);

-- Insérer des entreprises correspondantes
INSERT INTO companies (user_id, name, sector, size, website) VALUES
(1, 'EcoBrain SAS', 'saas', '11-50', 'https://ecobrain.fr'),
(2, 'TechCorp', 'saas', '51-200', 'https://techcorp.fr'),
(3, 'GreenShop', 'ecommerce', '1-10', 'https://greenshop.fr'),
(4, 'Manufacturing Plus', 'manufacturing', '201-500', 'https://manufacturing.fr'),
(5, 'EcoStartup', 'services', '1-10', 'https://startup.fr');

-- Insérer des abonnements
INSERT INTO subscriptions (user_id, plan_type, status, current_period_end) VALUES
(1, 'enterprise', 'active', NOW() + INTERVAL '1 month'),
(2, 'professional', 'active', NOW() + INTERVAL '1 month'),
(3, 'starter', 'trial', NOW() + INTERVAL '10 days'),
(4, 'professional', 'active', NOW() + INTERVAL '1 month'),
(5, 'starter', 'trial', NOW() + INTERVAL '5 days');

-- Insérer des audits d'exemple
INSERT INTO audits (user_id, company_name, email, sector, employees, hosting_type, local_suppliers, renewable_percentage, packaging_type, vehicle_fleet, calculated_score, audit_data) VALUES
(2, 'TechCorp', 'jean.martin@techcorp.fr', 'saas', '51-200', 'green', 'high', 'high', 'eco', 'mixed', 78, '{"completed": true}'),
(3, 'GreenShop', 'sophie@greenshop.fr', 'ecommerce', '1-10', 'traditional', 'medium', 'low', 'traditional', 'none', 52, '{"completed": true}'),
(4, 'Manufacturing Plus', 'pierre@manufacturing.fr', 'manufacturing', '201-500', 'traditional', 'low', 'medium', 'mixed', '20+-thermal', 35, '{"completed": true}'),
(5, 'EcoStartup', 'emma@startup.fr', 'services', '1-10', 'green', 'very-high', 'very-high', 'eco', 'electric', 89, '{"completed": true}');

-- Insérer des recommandations
INSERT INTO recommendations (audit_id, type, title, description, action, estimated_savings, priority) VALUES
(1, 'medium', 'Optimisation Énergétique', 'Possibilité d\'améliorer l\'efficacité énergétique', 'Installer des capteurs IoT pour monitorer la consommation', '€1,200/an', 2),
(2, 'critical', 'Hébergement Non-Écologique', 'Hébergeur traditionnel avec forte empreinte carbone', 'Migrer vers un hébergeur vert certifié', '€890/an', 1),
(2, 'high', 'Emballages Non-Durables', 'Utilisation d\'emballages plastiques', 'Passer aux emballages biodégradables', '€650/an', 2),
(3, 'critical', 'Flotte Véhicules Polluante', 'Véhicules thermiques avec forte émission CO2', 'Plan de transition vers véhicules électriques', '€5,400/an', 1),
(3, 'high', 'Supply Chain Internationale', 'Fournisseurs éloignés augmentant l\'empreinte transport', 'Identifier des fournisseurs locaux', '€2,800/an', 2),
(4, 'low', 'Optimisation Bureaux', 'Éclairage et chauffage non optimisés', 'Installation LED et thermostat intelligent', '€450/an', 3);

-- Insérer des métriques de performance
INSERT INTO performance_metrics (user_id, metric_type, value, unit, period_start, period_end) VALUES
(2, 'co2_emissions', 12.5, 'tonnes', '2024-01-01', '2024-01-31'),
(2, 'energy_consumption', 2400, 'kWh', '2024-01-01', '2024-01-31'),
(3, 'co2_emissions', 3.2, 'tonnes', '2024-01-01', '2024-01-31'),
(3, 'waste_reduction', 15.5, 'kg', '2024-01-01', '2024-01-31'),
(4, 'co2_emissions', 45.8, 'tonnes', '2024-01-01', '2024-01-31'),
(4, 'energy_consumption', 15600, 'kWh', '2024-01-01', '2024-01-31'),
(5, 'co2_emissions', 1.8, 'tonnes', '2024-01-01', '2024-01-31'),
(5, 'renewable_energy', 85.0, 'percentage', '2024-01-01', '2024-01-31');

-- Insérer des notifications d'exemple
INSERT INTO notifications (user_id, type, title, message, read) VALUES
(2, 'success', 'Audit Terminé', 'Votre audit écologique est terminé avec un score de 78/100', FALSE),
(2, 'info', 'Nouvelle Recommandation', 'Une nouvelle opportunité d\'économie a été identifiée', FALSE),
(3, 'warning', 'Action Requise', 'Votre hébergement génère 2.3 tonnes CO2/an', FALSE),
(3, 'success', 'Économies Réalisées', 'Félicitations ! Vous avez économisé 890€ ce mois-ci', TRUE),
(4, 'critical', 'Conformité CSRD', 'Échéance CSRD dans 45 jours - Action requise', FALSE),
(5, 'achievement', 'Objectif Atteint', 'Bravo ! Vous avez atteint 85% d\'énergie renouvelable', TRUE);

-- Insérer des logs d'activité
INSERT INTO activity_logs (user_id, action, resource_type, resource_id, details) VALUES
(2, 'audit_completed', 'audit', 1, '{"score": 78, "duration": "2m15s"}'),
(2, 'recommendation_viewed', 'recommendation', 1, '{"type": "medium"}'),
(3, 'audit_started', 'audit', 2, '{"step": 1}'),
(3, 'audit_completed', 'audit', 2, '{"score": 52, "duration": "3m42s"}'),
(4, 'login', 'user', 4, '{"ip": "192.168.1.100"}'),
(5, 'signup', 'user', 5, '{"plan": "starter", "trial": true}');
