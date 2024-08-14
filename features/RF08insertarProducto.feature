Feature: RF08 Insertar productos en el catálogo como administrador

  Scenario: Insertar producto correctamente
    Given I am on the products page
    When I click on "agregar-producto"
    When I complete the fields with valid information
    When I click on "agregar"
    Then the new product should be in the products list

  Scenario: Cancelar la inserción de un producto
    Given I am on the products page
    When I click on "agregar-producto"
    When I complete the fields with valid information
    When I click on "cancelar"
    Then the product should not be in the products list

  Scenario: Intentar insertar un producto con campos vacíos
    Given I am on the products page
    When I click on "agregar-producto"
    When I click on "agregar"
    Then I should see an error message for empty fields
