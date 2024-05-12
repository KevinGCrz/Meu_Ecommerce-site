app.controller('LoginController', ($scope, $http, SessionService) => {
    $scope.email = ""
    $scope.password = ""
    $scope.loading = false;
    $scope.loginError = false;

    $scope.handleSubmit = () => {
        $scope.loading = true;

        $http.post('http://localhost:3333/api/session', {
            email: $scope.email,
            password: $scope.password,
        }).then((response) => {
            localStorage.setItem('token', response.data.token)
            $scope.loading = false;
            location.href = "/"
        }, () => {
            $scope.loading = false;
            $scope.loginError = true;
        })
    }

    SessionService.verifyLogin(false)
})