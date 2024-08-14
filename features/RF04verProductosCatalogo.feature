Feature: RF04 Ver productos en el catálogo

  Scenario: Acceder a la sección de catálogo y verificar los detalles de los productos
    Given I am on the home page for test products in catalog
    When I navigate to the catalog section for test products
    Then I should see products with image, title, description, rating, and price
