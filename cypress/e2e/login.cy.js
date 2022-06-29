describe('Log In', () => {
  it('succesfully performs login action', () => {
    // visit Login page
    cy.visit('http://localhost:3000/login');

    // log in
    // cy.login('admin', 'admin');

    // submit inputs and click submit button
    cy.get('input[data-testid="username"]').type('admin');
    cy.get('input[data-testid="password"]').type('admin');
    cy.get('button[data-testid="login-btn"]').click();

    // verify that we were redirected
    cy.url({ timeout: 3000 }).should('includes', '/chat');
  });
});
