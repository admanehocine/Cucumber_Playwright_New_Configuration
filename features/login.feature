Feature: Connexion

  Scenario: Connexion réussie
    Given visiter le site "https://www.saucedemo.com/"
    And remplir le username "standard_user"
    And remplir le password "secret_sauce"
    When click sur button login
    Then je suis dans la page accueil  
