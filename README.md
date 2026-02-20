# Projet d'Intégration Cloud - Architecture Microservices

**Module :** Intégration Web (Projet de fin d'année)
**Date de rendu :** 15 Mars 2026
**Auteurs :** Cyril Takam & Abdou Khadre DIOP

## Description du Projet
Ce projet a pour objectif de concevoir et déployer une architecture orientée microservices. L'infrastructure repose sur la conteneurisation des services et leur orchestration logicielle. 

## Technologies Utilisées
* **Langage / Framework :** Node.js / Express (Services Web)
* **Conteneurisation :** Docker
* **Orchestration :** Kubernetes (via Minikube)
* **Infrastructure as Code :** Terraform (Optionnel/À venir)
* **Base de données :** À définir (SQL/NoSQL)

## Architecture Prévue
Le projet se construit de manière incrémentale :
1. Déploiement d'un premier service isolé en local.
2. Mise en place d'une API Gateway.
3. Intégration d'un second service pour la communication inter-services.
4. Ajout d'une base de données persistante.

## Comment lancer le projet en local

1. **Démarrer l'environnement :**
```bash
minikube start
minikube addons enable ingress

```

2. **Déployer la base de données :**
```bash
kubectl apply -f postgres.yaml

```


3. **Déployer les microservices :**
```bash
kubectl apply -f service-2/k8s-service2.yaml
kubectl apply -f service-1/k8s-service1.yaml

```


4. **Configurer la Gateway et la Sécurité :**
```bash
kubectl apply -f ingress.yaml
kubectl apply -f security.yaml

```


5. **Accéder à l'application :**
Lancez le tunnel Ingress :
```bash
kubectl port-forward -n ingress-nginx service/ingress-nginx-controller 8080:80

```


Ouvrez votre navigateur sur : `http://localhost:8080/service1`

## Sécurité et Isolation (NetworkPolicies)

Nous avons mis en place une sécurité réseau "Zero Trust" au sein du cluster. Bien que certaines configurations locales de Minikube sans plugin CNI (comme Calico) puissent ne pas appliquer les restrictions immédiatement, le code YAML fourni suit les standards de production :

* **Isolation de la BDD :** Seul le `service2` possède le label autorisé pour contacter PostgreSQL sur le port 5432.
* **Isolation du Service 2 :** Seul le `service1` est autorisé à interroger l'API du Service 2.

## État d'avancement (Validation des paliers)

* [x] **10/20** : Service 1 déployé (Node.js/Docker/K8s)
* [x] **12/20** : Gateway Ingress opérationnelle (Route /service1)
* [x] **14/20** : Service 2 intégré et communication inter-services (Service 1 -> Service 2)
* [x] **16/20** : Base de données PostgreSQL persistante reliée au Service 2
* [x] **18/20** : Sécurisation du cluster via NetworkPolicies (Isolation des flux)
