Feature: RF13 Actualizar noticias como administrador

  Scenario: Actualizar noticia con datos válidos
    Given I am on the news page to update
    When I click "actualizar" on a new to update
    When I complete the fields with valid information to update the new
    When I click "actualizar" in the form to update the new
    Then the new should be updated

  Scenario: Intentar actualizar noticia con datos campos vacíos
    Given I am on the news page to update
    When I click "actualizar" on a new to update
    When I click "actualizar" in the form to update the new
    Then I should see an error message for empty fields in the new form

  Scenario: Cancelar la actualización de una noticia
    Given I am on the news page to update
    When I click "actualizar" on a new to update
    When I complete the fields with valid information to update the new
    When I click "cancelar" in the form to update the new
    When I confirm the cancellation to not update the new
    Then the new should not be updated

