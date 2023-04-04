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
     - ACME-traffic-generator - Configuration files for ACME traffic injection.
     - Bookinfo-traffic-generator - SLO and Bookinfo configuration.

<<<<<<< HEAD
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

  - Podcasts
    - [NSX Service Mesh and Multicloud (NSXninjas Podcast | Feb 2020)](https://podcasts.apple.com/us/podcast/nsxninjas-podcast-episode-0002-02-21-20-nsx-service/id1499933486?i=1000466751340)
  
  - Official Product Documentation
    - [TSM Concepts Document](https://docs.vmware.com/en/VMware-Tanzu-Service-Mesh/services/concepts-guide/GUID-DEB57BAB-688F-4A4D-81E8-9CECC0F80FD5.html)
    - [TSM Getting Started](https://docs.vmware.com/en/VMware-Tanzu-Service-Mesh/services/getting-started-guide/GUID-FC2E0065-AC7B-4AEA-944A-2AC4DF2AA789.html)
    - [TSM API Programming Guide](https://docs.vmware.com/en/VMware-Tanzu-Service-Mesh/services/api-programming-guide/GUID-CC5A0A46-0A4B-45D6-9D1B-DA8C8174AD84.html)
    - [TSM Platform Support](https://docs.vmware.com/en/VMware-Tanzu-Service-Mesh/services/tanzu-service-mesh-environment-requirements-and-supported-platforms/GUID-D0B939BE-474E-4075-9A65-3D72B5B9F237.html)
    - [TSM Release Notes](https://docs.vmware.com/en/VMware-Tanzu-Service-Mesh/services/rn/VMware-Tanzu-Service-Mesh-Release-Notes.html)
    - [TSM Service Autoscaler](https://docs.vmware.com/en/VMware-Tanzu-Service-Mesh/services/slos-with-tsm/GUID-979BC58E-C3D3-4542-8D33-8CD414E9762F.html)
    - [TSM Service Level Objectives](https://docs.vmware.com/en/VMware-Tanzu-Service-Mesh/services/service-autoscaling-with-tsm-user-guide/GUID-E4FFF71B-441E-42D4-8A50-54B10966DC9D.html)

  - Collateral
    - [Service Mesh for Dummies](https://pages.cloud.vmware.com/service-mesh-dummies)
    - [TSM Solution Brief](https://www.vmware.com/content/dam/digitalmarketing/vmware/en/pdf/products/nsx/vmware-tanzu-solution-brief.pdf)
    - [TMS Top Use Cases White Paper](https://www.vmware.com/content/dam/digitalmarketing/vmware/en/pdf/products/nsx/vmware-tanzu-usecases.pdf)
    - [Forrester: With Microservices, A Service Mesh Helps Developers Focus On The Business (Oct 2019)](https://vault.vmware.com/group/vault-main-library/document-preview/-/document_library/6KC5yhh3TpWl/view_file/51269976)
    - [451 Research: Microservices and Service Mesh for Digital Transformation (Nov 2018)](https://vault.vmware.com/group/vault-main-library/document-preview/-/document_library/6KC5yhh3TpWl/view_file/51531740)

  - Websites
    - [Tanzu Service Mesh on the Tanzu Website](https://tanzu.vmware.com/service-mesh)
    - [Tanzu Service Mesh on vmware.com](https://www.vmware.com/products/tanzu-service-mesh.html)


=======
>>>>>>> 07e622d8592f80a92baa57d37526f0d1a25b6d13
