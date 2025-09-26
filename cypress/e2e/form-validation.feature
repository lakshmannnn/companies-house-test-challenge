Feature: Form Validation
  As a user interacting with various forms
  I want proper validation and error messaging
  So that I can understand how to correctly complete forms

  Background:
    Given I navigate to the DemoBlaze homepage

  Scenario: Contact form successful submission
    When I open the Contact form
    And I fill the contact form with email "john@test.com", name "John", and message "Hello"
    And I send the contact message
    Then I should see a success confirmation
