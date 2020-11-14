describe('Fetching books', () => {
  it('shows loading indicator', () => {
    cy.route2('http://localhost:4567/graphql', {
      delayMs: 3000,
      fixture: 'books.json'
    });

    cy.visit('/');
    cy.get('[data-testid="Loader"]').should('be.visible');
  });

  it('hide loading indicator whe fetching books is finished', () => {
    cy.route2('http://localhost:4567/graphql', {
      fixture: 'books.json'
    }).as('getBooks');

    cy.visit('/');
    cy.wait('@getBooks');
    cy.get('[data-testid="Loader"]').should('not.be.visible');
  });

  it('shows empty state if there is no books', () => {
    cy.route2('http://localhost:4567/graphql', {
      body: { data: { books: [] } }
    }).as('getBooks');

    cy.visit('/');
    cy.wait('@getBooks');
    cy.get('[data-testid="Empty"]').should('be.visible');
    cy.get('[data-testid="BooksList"]').should('not.be.visible');
  });

  it('shows books list', () => {
    cy.route2('http://localhost:4567/graphql', {
      fixture: 'books.json'
    }).as('getBooks');

    cy.visit('/');
    cy.wait('@getBooks');
    cy.contains('Agatha Christie').should('be.visible');
    cy.get('[data-testid="BooksList"]').should('be.visible');
    cy.get('[data-testid="Empty"]').should('not.be.visible');
  });

  it('shows error message', () => {
    cy.route2('POST', 'http://localhost:4567/graphql', {
      fixture: 'books.json',
      statusCode: 400
    }).as('getBooks');

    cy.visit('/');
    cy.wait('@getBooks');
    cy.get('[data-testid="ErrorMessage"]').should('be.visible');
  });
});
