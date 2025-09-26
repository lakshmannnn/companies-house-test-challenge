import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const selectors = {
  category: (name) => `.list-group a:contains("${name}")`,
  productLink: (name) => `.card-title a:contains("${name}")`,
  addToCart: 'a.btn.btn-success.btn-lg',
  cartLink: '#cartur',
  cartTableRows: '#tbodyid tr',
  cartTotal: '#totalp'
};

When('I open the {string} category', (category) => {
  cy.contains('.list-group a', category).click();
});

When('I open the product {string}', (productName) => {
  cy.contains('.card-title a', productName, { timeout: 10000 }).click();
});

When('I add the product to the cart', () => {
  cy.window().then((win) => cy.stub(win, 'alert').as('alert'));
  cy.get(selectors.addToCart, { timeout: 10000 }).click();
});

Then('I should see a product added confirmation', () => {
  cy.get('@alert').should('have.been.called');
  cy.get('@alert').its('firstCall.args.0').should('match', /product added|added/i);
});

When('I open the cart page', () => {
  cy.get(selectors.cartLink).click();
});

Then('I should see {string} in the cart', (name) => {
  cy.get(selectors.cartTableRows, { timeout: 10000 })
    .should('contain.text', name);
});

Then('the cart total should be greater than 0', () => {
  cy.get(selectors.cartTotal, { timeout: 10000 })
    .invoke('text')
    .then((t) => parseInt(t, 10))
    .should('be.greaterThan', 0);
});
