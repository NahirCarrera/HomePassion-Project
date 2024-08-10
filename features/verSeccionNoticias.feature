Feature: Ver sección de noticias

  Scenario: Verificar la sección de noticias
    Given I am on the home page for noticias
    When I click on the "Noticias" menu option
    Then I should be redirected to the "Noticias" section
    And I should see 3 news items with title, date, description, and image
