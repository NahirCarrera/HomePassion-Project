Feature: RF11 Insertar noticias como administrador

  Scenario: Insertar noticia correctamente
    Given I am on the news page
    When I click on "agregar-noticia" to add new
    When I complete the fields with valid information for a new
    When I click on "agregar" in the news form
    Then the new should be in the news list

  Scenario: Cancelar la inserción de una noticia
    Given I am on the news page
    When I click on "agregar-noticia" to add new
    When I complete the fields with valid information for a new
    When I click on "cancelar" in the news form
    Then the new should not be in the news list

  Scenario: Intentar insertar una noticia con campos vacíos
    Given I am on the news page
    When I click on "agregar-noticia" to add new
    When I click on "agregar" in the news form
    Then I should see an error message for empty fields in the news form
