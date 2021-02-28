# This is the main repository of Tanzu Service Mesh materials #

## In this repository: ##

### Sample application
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
 ### SLO & Autoscaler
   - ACME app SLO and Autoscaler configuration
   - Bookinfo app SLO and Autoscaler configuration
   - Tanzu Service mesh CRD configuration

### Traffic generator
   - ACME-traffic-generator - Configuration files for ACME traffic injection
   - Bookinfo-traffic-generator - SLO and Bookinfo configuration

### Public resources
   - Blog posts
     - [Declare Your Application State with Tanzu Service Mesh](https://blogs.vmware.com/networkvirtualization/2020/12/tsm-slo-acme.html/)
     - [Multi-cloud made super easy with Tanzu Service Mesh (Dec 2020)](https://cloud-abstract.com/multi-cloud-made-super-easy-with-tanzu-service-mesh/)
     - [Achieve Multi-Cloud Application Scalability for Modern Apps (Nov 2020)](https://blogs.vmware.com/networkvirtualization/2020/11/modern-apps-multicloud.html/)
     - [A Deep Dive into the Tanzu Service Mesh Autoscaling VMworld 2020 Keynote Demo (Sep 2020)](https://octo.vmware.com/deep-dive-tanzu-service-mesh-autoscaling-vmworld-2020-keynote-demo/)
     - [Service Mesh Takes On An Extended Meaning (Jul 2020)](https://cloud.vmware.com/community/2020/07/06/service-mesh-takes-extended-meaning/)
     - [The Emergence of Cloud Runtimes: New Abstractions Driving Next Level of Cloud Reliability (May 2020)](https://octo.vmware.com/emergence-of-cloud-runtimes/)
     - [Securing A Multi-Cloud App With Service Mesh (Mar 2020)](https://cloud-abstract.com/securing-multi-cloud-app-service-mesh/)
     - [Forging A Path to Continuous, Risk-based Security with VMware Tanzu Service Mesh (Mar 2020)](https://blogs.vmware.com/networkvirtualization/2020/03/risk-based-security.html/)
     - [Project Hamlet: Secure Multi-Vendor Multi-Mesh Federation in the Open Source (Nov 2019)](https://octo.vmware.com/project-hamlet-secure-multi-vendor-multi-mesh-federation-open-source/)
     - [NSX Service Mesh: CONNECT & PROTECT Applications Across Your Kubernetes Clusters and Clouds (Nov 2019)](https://blogs.vmware.com/networkvirtualization/2019/11/nsx-service-mesh-on-vmware-tanzu.html/)
     - [SLOs – The Emerging Universal Language in the Enterprise (Oct 2019)](https://octo.vmware.com/slos-emerging-universal-language-enterprise/)
     - [Announcing a New Open Source Service Mesh Interoperation Collaboration (Aug 2019)](https://blogs.vmware.com/networkvirtualization/2019/08/new-open-source-service-mesh-interoperation-collaboration.html/)
     - [How VMware NSX Service Mesh is Purpose-Built for the Enterprise (Aug 2019)](https://octo.vmware.com/vmware-nsx-service-mesh-purpose-built-enterprise/)
     - [How Istio, NSX Service Mesh and NSX Data Center Fit Together (Apr 2019)](https://blogs.vmware.com/networkvirtualization/2019/04/how-istio-nsx-service-mesh-and-nsx-data-center-fit-together.html/)
     - [gRPC-Web and Istio: A Report from Service Mesh Day (Apr 2019)](https://blogs.vmware.com/networkvirtualization/2019/04/grpc-web-and-istio.html/)
     - [VMware and Google Showcase Hybrid Cloud Deployment for Application Platform and Development Teams (Apr 2019)](https://blogs.vmware.com/networkvirtualization/2019/04/vmware-and-google-showcase-hybrid-cloud-deployment.html/)
     - [Service Mesh: The Next Step in Networking for Modern Applications (Jul 2019)](https://blogs.vmware.com/networkvirtualization/2019/07/service-mesh-networking-for-modern-applications.html/)
     - [Seamless Cloud-Native Apps with gRPC-Web and Istio (Nov 2018)](https://venilnoronha.io/seamless-cloud-native-apps-with-grpc-web-and-istio)
