Feature: Shopping Cart Management
  As a registered customer
  I want to manage products in my shopping cart
  So that I can review and modify my purchases before checkout

  Background:
    Given I navigate to the DemoBlaze homepage

  @smoke
  Scenario: Add single product to cart
    When I open the "Phones" category
    And I open the product "Samsung galaxy s6"
    And I add the product to the cart
    Then I should see a product added confirmation
    When I open the cart page
    Then I should see "Samsung galaxy s6" in the cart
    And the cart total should be greater than 0
