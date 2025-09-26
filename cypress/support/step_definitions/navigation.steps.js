import { Then } from '@badeball/cypress-cucumber-preprocessor';

Then('I should see product {string} in the gallery', (productName) => {
  cy.contains('.card-title a', productName, { timeout: 10000 }).should('be.visible');
});
