pipeline {
  agent any
  options {
    disableConcurrentBuilds()
    timeout(time: 10, unit: 'MINUTES')
  }
  stages {
    stage('Verify Tools') {
      steps {
        parallel (
           node: {
              sh 'npm -v'
            },
            docker: {
              sh 'docker --version'
              sh 'which docker'
            }
        )
      }
    }
     stage('Build') {
          steps {
            sh 'npm prune'
            sh 'npm install'
            sh 'ng build --prod'
          }
        }
      stage('Create Image') {
         steps {
           sh 'chmod -R 777 dist/'
           sh 'docker rm -f frontend_angular || true'
           sh 'docker build -t frontend_angular .'
           sh 'docker image prune -f'
         }
       }
  }
  post {
    always {
      cleanWs()
    }
  }
}
