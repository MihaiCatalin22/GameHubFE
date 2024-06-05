describe('Admin Add Event', () => {
    before(() => {
        cy.login('testuser2', 'Password1!');
    });

    it('should add a new event', () => {
        cy.contains('Events').click();
        cy.url().should('include', '/events');
        cy.contains('Add New Event').click();

        cy.get('input[name="name"]').type('New Event');
        cy.get('textarea[name="description"]').type('Description of the new event');
        cy.get('input[name="startDate"]').type('2024-12-31T12:00');
        cy.get('input[name="endDate"]').type('2025-01-01T12:00');

        cy.get('button[type="submit"]').click();

        cy.contains('Event created successfully!').should('exist');

        cy.contains('New Event').should('exist');
    })
});