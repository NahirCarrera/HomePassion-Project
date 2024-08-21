Feature: RF10 Actualizar productos en el catálogo como administrador

  Scenario: Actualizar producto con datos válidos
    Given I am on the products page to update
    When I click "actualizar" on a product to update
    When I complete the fields with valid information to update
    When I click "actualizar" in the form
    Then the product should be updated

  Scenario: Intentar actualizar producto con datos campos vacíos
    Given I am on the products page to update
    When I click "actualizar" on a product to update
    When I click "actualizar" in the form
    Then I should see an error message for empty fields to update

  Scenario: Cancelar la actualización de un producto
    Given I am on the products page to update
    When I click "actualizar" on a product to update
    When I complete the fields with valid information to update
    When I click "cancelar" in the form
    When I confirm the cancellation
    Then the product should not be updated

