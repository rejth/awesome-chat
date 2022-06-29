// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

// -- This is a Login command --
Cypress.Commands.add('login', (username, password) => {
  // Make a POST request to our backend
  cy
    .request({
      url: 'http://127.0.0.1:3000/api/v1/login',
      method: 'POST',
      body: {
        "username": username,
        "password": password
      },
    })
    .then(response => {
      // assert response from server
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
      expect(response.body).to.have.property('username');
      // all our private routes check for auth token stored in React Context, so let's pass it there
      window.localStorage.setItem(
        'credentials',
        JSON.stringify({ token: response.body.token, username: response.body.username })
      );
      // go to private logged page
      cy.visit('/chat');
    });
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
