# This is the main repository of Tanzu Service Mesh demo materials #

## In this repository: ##
 - Sample application
   - ACME Fit Kubernetes application
     - ACME-split-fe-be - ACME demo splitted between two clsuters, front end service and back end services for GNS demo
     - ACME-catalog-v2-demo - ACME demo splitted between three clusters, with two different catalog versions for GNS demo
     - ACME-full-cluster - ACME fit full installation on a one cluster stand alone with or without service mesh
     - ACME-split-services - ACME demo splitted between two clusters all the front end services in one and all the back end services (DB) on the second. god use case for Tanzu with vSphere where the FE runs on TKG and the BE runs on the Supervisor cluster (vSphere)
     - ACME-Kustomize - ACME full cluster installation via Kustomize files 
     - ACME-Kustomize-splitted - ACME splitted installation via Kustomize files
     - Istio-manifest-samples - Demo of Istio capabilities with circuitbraker and traffic shifting
   - Book Info application
     - Bookinfo - Bookinfo full installation in one cluster
     - Bookinfo-splitted - Bookinfo splitted between front end and back end services for GNS demo
