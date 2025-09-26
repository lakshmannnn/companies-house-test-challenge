import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const selectors = {
  signupBtn: '#signin2',
  signupUsername: '#sign-username',
  signupPassword: '#sign-password',
  signupSubmit: 'button[onclick="register()"]',
  loginBtn: '#login2',
  loginUsername: '#loginusername',
  loginPassword: '#loginpassword',
  loginSubmit: 'button[onclick="logIn()"]',
  navbarWelcome: '#nameofuser'
};

function uniqueUser() {
  const ts = Date.now();
  const user = `testuser_${ts}`;
  const pass = `SecurePass_${ts}!`;
  return { user, pass };
}

Given('I navigate to the DemoBlaze homepage', () => {
  cy.visit('/index.html');
});

When('I register a new unique user', () => {
  const creds = uniqueUser();
  cy.wrap(creds).as('creds');

  cy.get(selectors.signupBtn).click();
  cy.get(selectors.signupUsername).should('be.visible').type(creds.user);
  cy.get(selectors.signupPassword).type(creds.pass);

  cy.window().then((win) => {
    cy.stub(win, 'alert').as('alert');
  });

  cy.get(selectors.signupSubmit).click();
  cy.get('@alert').should('have.been.called');
  // Close the Sign up modal to avoid covering the Login link
  cy.get('#signInModal').within(() => {
    cy.contains('button', 'Close').click({ force: true });
  });
  cy.get('#signInModal').should('not.be.visible');
});

When('I log in with the registered user', () => {
  cy.get('@creds').then(({ user, pass }) => {
    // Ensure Sign up modal is closed and not covering the login button
    cy.get('#signInModal').should('not.be.visible');
    cy.get(selectors.loginBtn).click();
    cy.get(selectors.loginUsername).should('be.visible').type(user);
    cy.get(selectors.loginPassword).type(pass);
    cy.get(selectors.loginSubmit).click();
  });
});

Then('I should be successfully logged in', () => {
  cy.get(selectors.navbarWelcome, { timeout: 10000 }).should('be.visible');
});

Then('I should see the welcome message for the registered user', () => {
  cy.get('@creds').then(({ user }) => {
    cy.get(selectors.navbarWelcome).should('contain.text', `Welcome ${user}`);
  });
});
