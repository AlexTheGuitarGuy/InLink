describe('InLink website', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.viewport('macbook-15');
  });

  it('should display the correct page title', () => {
    cy.title().should('eq', 'InLink');
  });

  it('should display the header', () => {
    cy.get('header').should('be.visible');
  });

  it('should display the navigation menu if width is medium or higher', () => {
    cy.get('nav').should('be.visible');
    cy.get('nav').children().should('have.length', 3);
  });

  it('should navigate to the "Login" page when clicking on the "InLink" logo and not logged in', () => {
    cy.get('header').find('[role="navigation"]').click()
    cy.url().should('contain', '/login');
  });

  it('should display the login form', () => {
    cy.get('form').should('be.visible');
  });

  /*
  it('should be able to submit the login form and be redirected', () => {
    cy.get('form input[name="email"]').type('free@samuraijs.com');
    cy.get('form input[name="password"]').type('free');
    cy.get('form button[type="submit"]').contains('Log in').click();
    cy.url().should('contain', '/profile');
    cy.wait(5000);
  });

  it('should be able to log out when clicking the log out button', () => {
    cy.get('button[role="img"]').click().get('button').contains('Log out').click();
    cy.url().should('contain', '/login');
  })

  it('should display an error message with invalid credentials', () => {
    cy.get('form input[name="email"]').type('wrong');
    cy.get('form input[name="password"]').type('wrong');
    cy.get('form button[type="submit"]').contains('Log in').click();

    cy.url().should('contain', '/login');
    cy.get('form').should('be.visible');
    cy.get('form').should('contain', 'Invalid username or password');
  });
*/

});
