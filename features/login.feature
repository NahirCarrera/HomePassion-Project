Feature: Login

Scenario: Successful login with valid credentials
  Given I am on the login page
  When I submit valid login credentials
  Then I should be redirected to the tasks page

Scenario: Unsuccessful login with invalid credentials
  Given I am on the login page
  When I submit invalid login credentials
  Then I should see an error message
