Feature: Enviar un mensaje a través de la sección de contacto

Scenario: Enviar un correo desde la sección de contacto con éxito
    Given I am on the home page for contact
    When I navigate to the contact section
    And I fill in the contact form with "John Doe", "john@example.com", and "Hello, this is a test message."
    And I submit the contact form
    Then I should see a success message indicating that the email was sent successfully

  Scenario: Intentar enviar un correo con campos en blanco
    Given I am on the home page for contact
    When I navigate to the contact section
    And I fill in the contact form with "", "", and ""
    And I submit the contact form
    Then I should see an error message indicating that all fields are required

  Scenario: Manejar un error al enviar el correo
    Given I am on the home page for contact
    When I navigate to the contact section
    And I fill in the contact form with "Jane Doe", "jane@example.com", and "This will cause an error."
    And I submit the contact form
    Then I should see an error message indicating that the email could not be sent
