Feature: RF09 Eliminar productos del catálogo como administrador

  Scenario: Eliminar producto correctamente
    Given I am on the products page to delete
    When I click "eliminar" on a product
    When I confirm the deletion
    Then the product should be deleted from products list

  Scenario: Cancelar la eliminación de un producto
    Given I am on the products page to delete
    When I click "eliminar" on a product
    When I dont confirm the deletion
    Then the product should not be deleted from products list
