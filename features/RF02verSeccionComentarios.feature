Feature: RF02 Verificar sección de comentarios

  Scenario: Acceder a la sección de comentarios y verificar los detalles de los comentarios
    Given I am on the home page for comments
    When I navigate to the comments section
    Then I should see comments with name, rating, and comment
