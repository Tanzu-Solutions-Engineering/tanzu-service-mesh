# This is the main repository of Tanzu Service Mesh materials #

## In this repository: ##

### Code samples and configuration files
   - Sample applications
     - ACME Fit Kubernetes application
       - ACME-split-fe-be - ACME demo splitted between two clusters. Shopping service in one cluster, and the rest of the services and databases in the other.
       - ACME-catalog-v2-demo - ACME demo splitted between three clusters. One with all services and databases except the two catalog services (application and db), the other two clusters contain two different catalog versions (different content in the database). This can also be used for two cluster deployments with only one version of the catalog
       - ACME-full-cluster - ACME full installation on a one cluster stand alone
       - ACME-split-services-be-db - ACME demo splitted between two clusters all the application services in one and all the database services on the second. Good use case for Tanzu with vSphere where the application services run on TKG and the database services runs on the Supervisor cluster (vSphere)
       - ACME-Kustomize - ACME full cluster installation via Kustomize files 
       - ACME-Kustomize-split-fe-be - ACME splitted installation via Kustomize files
       - Istio-manifest-samples - Demo of Istio capabilities with circuitbraker and traffic shifting
     - Book Info application
       - Bookinfo - Bookinfo full installation in one cluster
       - Bookinfo-splitted - Bookinfo where reviews-v3 can be deployed in one cluster and the rest in another
   - SLO & Autoscaler
     - ACME app SLO and Autoscaler configuration
     - Bookinfo app SLO and Autoscaler configuration
     - Tanzu Service mesh CRD configuration

   - Traffic generator
     - ACME-traffic-generator - Configuration files for ACME traffic injection
     - Bookinfo-traffic-generator - SLO and Bookinfo configuration

