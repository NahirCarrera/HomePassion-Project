Feature: RF07 Login de administrador

Scenario: Login exitoso con credenciales válidas
  Given I am on the login page
  When I submit valid login credentials
  Then I should be redirected to the tasks page

Scenario: Login fallido por credenciales inválidas
  Given I am on the login page
  When I submit invalid login credentials
  Then I should see an error message

Scenario: Login fallido por campos vacíos
  Given I am on the login page
  When I submit the login form with empty fields
  Then I should not be able to submit the form and see validation indicators