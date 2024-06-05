describe('Admin Delete Event', () => {
    before(() => {
        cy.login('testuser2', 'Password1!');
    })

    it('should delete an event', () => {
        cy.contains('Events').click();
        cy.url().should('include', '/events');

        cy.contains('Description of the new event').parent().contains('Delete').click();
    
        cy.get('h4').contains('Confirm Deletion').should('be.visible');
        cy.get('button').contains('Confirm').click();

      });
})