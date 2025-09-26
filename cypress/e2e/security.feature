Feature: Session Security and Cross-Browser Authentication
  As a security-conscious user
  I want my session data to be properly isolated and secure
  So that my personal information and cart data cannot be accessed across browsers

  Background:
    Given I navigate to the DemoBlaze homepage

  @security @crossbrowser @setup
  Scenario: Establish authenticated session and add product in Chrome
    When I register a new unique user
    And I log in with the registered user
    And I open the "Phones" category
    And I open the product "Samsung galaxy s6"
    And I add the product to the cart
    And I open the cart page
    Then I should see "Samsung galaxy s6" in the cart

  @security @crossbrowser @leak-check
  Scenario: Authentication leakage across browsers
    Given I clear all browser data
    # TODO: add steps to launch the DemoBlaze URL in different browsers.
    When I navigate to the DemoBlaze homepage
    Then my cart should not be empty
    # Issue here is the cart shows the producst added before cache was cleared.
    # However this behaviour is not coinsistent for all transactaions.
