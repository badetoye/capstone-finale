pipeline {
     agent any
     stages {
         stage('Build') {
              steps {
                  sh 'echo Building...'
              }
         }
         stage('Lint HTML') {
              steps {
                  sh 'tidy -q -e *.html'
              }
         }
         stage('Build Docker Image') {
              steps {
                  sh 'docker build -t capstone-user .'
                  sh 'docker image ls'
              }
         }
         stage('Push Docker Image') {
              steps {
                  withDockerRegistry([url: "", credentialsId: "docker-hub"]) {
                      sh 'docker tag capstone-user mulero44/capstone-user'
                      sh 'docker push mulero44/capstone-user'
                  }
              }
         }
          stage('Deploying') {
              steps{
                  echo 'Deploying to AWS...'
                  withAWS(credentials: 'aws', region: 'us-west-2') {
                      sh "aws eks --region us-west-2 update-kubeconfig --name capstone-user"
                      sh "kubectl config use-context arn:aws:eks:us-west-2:481413889855:cluster/capstone-user"
                      sh "kubectl set image deployments/capstone-user capstone-user=mulero44/capstone-user:latest"
                      sh "kubectl apply -f deployment.yml"
                      sh "kubectl get nodes"
                      sh "kubectl get deployment"
                      sh "kubectl get pod -o wide"
                      sh "kubectl get service/capstone-user"
                  }
              }
        }
        stage("Cleaning dangling files") {
              steps{
                   echo 'Cleaning up...'
                   sh "docker system prune -f"
              }
        }
     }
}

