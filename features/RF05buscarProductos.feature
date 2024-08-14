Feature: RF05 Buscar productos en el catálogo

  Scenario: Filtrar productos por palabra clave
    Given I am on the home page for search products
    When I navigate to the catalog section for search products
    And I search for a product with the keyword "Producto 1"
    Then I should see only products that match the keyword "Producto 1"

  Scenario: Filtrar productos por parte de palabra clave
    Given I am on the home page for search products
    When I navigate to the catalog section for search products
    And I search for a product with the keyword "Producto"
    Then I should see only products that match the keyword "Producto"

  Scenario: Filtrar productos con palabra clave inexistente
    Given I am on the home page for search products
    When I navigate to the catalog section for search products
    And I search for a product with the keyword "nonexistent"
    Then I should see only products that match the keyword "nonexistent"
