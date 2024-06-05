describe('Admin Delete Event', () => {
    before(() => {
        cy.login('testuser2', 'Password1!');
    })

    it('should delete an event', () => {
        cy.contains('Events').click();
        cy.url().should('include', '/events');

        cy.contains('New Event').parent().contains('Delete').click();
        cy.contains('Confirm').click();

        cy.contains('New Event').should('not.exist');
    })
})