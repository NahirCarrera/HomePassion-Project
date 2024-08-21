Feature: RF12 Eliminar noticias como administrador

  Scenario: Eliminar noticia correctamente
    Given I am on the news page to delete
    When I click "eliminar" on a new to delete
    When I confirm the deletion of the new
    Then the new should be deleted from news list

  Scenario: Cancelar la eliminación de un producto
    Given I am on the news page to delete
    When I click "eliminar" on a new to delete
    When I dont confirm the deletion of the new
    Then the new should not be deleted from news list
