describe('User flow: Login, see events, join an event', () => {
    it('should handle joining events', () => {
        cy.visit('http://localhost:5173/login');
        cy.get('input[name="username"]').type('testuser1');
        cy.get('input[name="password"]').type('Password1!');
        cy.get('button[type="submit"]').click();
      
        cy.url().should('include', '/');
        cy.contains('Logout').should('exist');

        cy.contains('Events').click();
        cy.contains('E2E Testing').should('exist');
        cy.contains('View Details').click();

        cy.contains('Join Event').click();
        cy.contains('OK').click();

        cy.contains('Events').click();
        cy.contains('Participating').should('exist');
    })
})