import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

const selectors = {
  cartLink: '#cartur',
  placeOrderBtn: 'button:contains("Place Order")',
  modal: '.modal-content',
  name: '#name',
  country: '#country',
  city: '#city',
  card: '#card',
  month: '#month',
  year: '#year',
  purchaseBtn: 'button:contains("Purchase")',
  confirmation: '.sweet-alert',
  confirmOK: '.confirm'
};

When('I proceed to place order', () => {
  cy.get(selectors.placeOrderBtn, { timeout: 10000 }).click();
  cy.get(selectors.modal).should('be.visible');
});

When('I enter payment details:', (dataTable) => {
  const data = dataTable.rowsHash();
  if (data['Name']) cy.get(selectors.name).clear().type(data['Name']);
  if (data['Country']) cy.get(selectors.country).clear().type(data['Country']);
  if (data['City']) cy.get(selectors.city).clear().type(data['City']);
  if (data['Credit card']) cy.get(selectors.card).clear().type(data['Credit card']);
  if (data['Month']) cy.get(selectors.month).clear().type(data['Month']);
  if (data['Year']) cy.get(selectors.year).clear().type(data['Year']);
});

When('I confirm the purchase', () => {
  cy.get(selectors.purchaseBtn).click();
});

Then('I should see order confirmation with purchase details', () => {
  cy.get(selectors.confirmation, { timeout: 10000 })
    .should('contain.text', 'Thank you for your purchase!')
    .and('contain.text', 'Id:')
    .and('contain.text', 'Amount:');
  cy.get(selectors.confirmOK).click();
});
