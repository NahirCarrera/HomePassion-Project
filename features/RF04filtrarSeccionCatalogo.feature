Feature: RF04 Filtrado del Catálogo de Productos

  Scenario: Ver productos por categoría
    Given I am on the home page for catalog
    When I navigate to the catalog section
    When I select the category "Categoría 1" from the dropdown
    Then I should see only products from category "Categoría 1"

  Scenario: Ver productos por otra categoría
    Given I am on the home page for catalog
    When I navigate to the catalog section
    When I select the category "Categoría 2" from the dropdown
    Then I should see only products from category "Categoría 2"
