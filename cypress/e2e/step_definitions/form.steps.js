import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

const selectors = {
  contactNav: 'a[data-target="#exampleModal"]',
  email: '#recipient-email',
  name: '#recipient-name',
  message: '#message-text',
  sendBtn: 'button[onclick="send()"]'
};

When('I open the Contact form', () => {
  cy.get(selectors.contactNav).click();
});

When('I fill the contact form with email {string}, name {string}, and message {string}', (email, name, message) => {
  cy.get(selectors.email).clear().type(email);
  cy.get(selectors.name).clear().type(name);
  cy.get(selectors.message).clear().type(message);
});

When('I send the contact message', () => {
  cy.window().then((win) => cy.stub(win, 'alert').as('alert'));
  cy.get(selectors.sendBtn).click();
});

Then('I should see a success confirmation', () => {
  cy.get('@alert').should('have.been.called');
});
