Feature: Checkout Process
  As a customer with items in cart
  I want to complete the purchase process
  So that I can buy the selected products

  Background:
    Given I navigate to the DemoBlaze homepage

  Scenario: Successful checkout with valid payment details
    When I open the "Phones" category
    And I open the product "Samsung galaxy s6"
    And I add the product to the cart
    And I open the cart page
    And I proceed to place order
    And I enter payment details:
      | Name        | John Doe |
      | Country     | United Kingdom |
      | City        | London |
      | Credit card | 4532123456789012 |
      | Month       | 12 |
      | Year        | 2025 |
    And I confirm the purchase
    Then I should see order confirmation with purchase details
