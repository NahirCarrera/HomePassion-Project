# features/verSeccionInformacion.feature

Feature: RF01 Ver sección "Sobre nosotros"

  Scenario: Redirigir a la sección "Sobre nosotros" y mostrar la información correcta
    Given I am on the home page for information
    When I click on the "Sobre nosotros" menu option
    Then I should be redirected to the "Sobre nosotros" section
    And I should see the description, history, and values
