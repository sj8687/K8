<!-- this will crete a 2 worker nodes and 1 master(we cant se itt) means instance of ec2 (run it in cmd) -->

eksctl create cluster --name sj-cluster --region ap-south-1 --nodes 2 --node-type t3.small --nodes-min 1 --nodes-max 2

<!-- for delete all  -->
eksctl delete cluster --name shree-cluster --region ap-south-1


<!-- Haan, yeh file AWS par NGINX Ingress Controller ka deployment setup karegi. Agar tum yeh YAML file apply karte ho (e.g., kubectl apply -f <URL>), toh yeh tumhare Kubernetes cluster mein Ingress Controller ko deploy karega, jo AWS mein run karega, agar tumhara cluster AWS par hai.

Yeh file specific configuration ke saath aati hai, jo:

NGINX Ingress Controller ko deploy karegi.

AWS-specific settings ko handle karegi, jaise ki Load Balancer ka configuration.

Kubernetes resources banayegi jo Ingress Controller ko manage karte hain. -->


kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.12.1/deploy/static/provider/cloud/deploy.yaml

<!-- or -->

https://github.com/100xdevs-cohort-2/week-28-manifests/blob/main/components.yml



<!-- template & selectors -->

selector se Deployment decide karta hai ki kis Pod ko manage karna hai.

template se define hota hai ki new Pods kaise banenge.

Example:

Maan lo agar tumhare paas pehle se kuch Pods hain jo app: backend label rakhte hain, to jab yeh Deployment apply hoga, Kubernetes un Pods ko manage karega. Agar koi naya Pod create kiya gaya (jisme app: backend label hoga), to Deployment usko bhi manage karega.



<!-- cadvisor and metrices -->
https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml



<!-- argocd installl-->
https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml