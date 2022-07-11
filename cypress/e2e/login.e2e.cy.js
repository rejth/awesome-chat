describe('Login form', () => {
  it('succesfully performs login action', () => {
    // visit Login page
    cy.visit('http://localhost:3000/login');

    // submit inputs and click submit button
    cy.log('Filling the form');
    cy.get('input[data-testid="username"]').type('admin');
    cy.get('input[data-testid="password"]').type('admin');

    cy.log('Submit the form');
    cy.get('button[data-testid="login-btn"]').click();

    // verify that we were redirected
    cy.log('We are on the success page');
    cy.url({ timeout: 3000 }).should('includes', '/chat');

    expect(true).toBeTruthy();
  });
});
