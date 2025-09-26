import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const selectors = {
  navbarWelcome: '#nameofuser',
  cartLink: '#cartur',
  cartTableRows: '#tbodyid tr'
};

Given('I clear all browser data', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  // Clear session storage via app context
  cy.window().then((win) => {
    try { win.sessionStorage.clear(); } catch (e) {}
  });
});

Then('my cart should not be empty', () => {
  cy.get(selectors.cartLink).click();
  cy.get(selectors.cartTableRows, { timeout: 10000 }).its('length').should('be.greaterThan', 0);
});
