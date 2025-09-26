Feature: Navigation and UI Consistency
  As a user browsing the website
  I want consistent navigation and stable UI elements
  So that I can efficiently find and purchase products

  Background:
    Given I navigate to the DemoBlaze homepage

  Scenario: Category-based product filtering
    When I open the "Monitors" category
    Then I should see product "Apple monitor 24" in the gallery
