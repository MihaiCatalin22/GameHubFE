describe('Admin Login', () => {
    it('should log in as an admin', () => {
        cy.visit('http://localhost:5173/login');
        cy.login('testuser2', 'Password1!')
        
        cy.url().should('include', '/');
        cy.contains('Logout').should('exist');

        cy.contains('Games').click();

        cy.contains('Add New Game').should('exist');
    })
})