describe('Login with invalid credentials', () => {
    it('should not log in with invalid credentials', () => {
        cy.visit('http://localhost:5173/login');
        cy.get('input[name="username"]').type('wronguser');
        cy.get('input[name="password"]').type('WrongPassword!');
        cy.get('button[type="submit"]').click();
               
        cy.contains('Login failed due to an unexpected issue').should('exist');
        
        cy.url().should('include', '/login');
      });
});
