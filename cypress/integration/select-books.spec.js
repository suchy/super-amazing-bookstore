describe('Select books', () => {
  beforeEach(() => {
    cy.route2('http://localhost:4567/graphql', {
      fixture: 'books.json'
    }).as('getBooks');

    cy.visit('/');

    cy.wait('@getBooks');

    cy.get('[data-testid="BooksListItem"]').as('booksItems');
    cy.get('[data-testid="TopCheckbox"]').as('topCheckbox');
  });

  it('should make top checkbox unchecked if all books are selected', () => {
    cy.get('@topCheckbox').should('not.be.checked');
  });

  it('should hide summary if no book is selected', () => {
    cy.get('[data-testid="SummaryContent"]').should('not.be.visible');
  });

  it('should select book when clicking row', () => {
    cy.get('@booksItems').first().as('selectedBooksItem').click();
    cy.get('@selectedBooksItem')
      .get('[data-testid="BooksListItemCheckbox"]')
      .get('input[type="checkbox"]')
      .should('be.checked');
  });

  it('should make top checkbox indeterminate if not all books are selected', () => {
    cy.get('@booksItems').first().click();
    cy.get('@topCheckbox')
      .get('input[type="checkbox"]')
      .should('have.data', 'indeterminate', true);
  });

  it('should make top checkbox checked if all books are selected', () => {
    cy.get('@booksItems').click({ multiple: true });
    cy.get('@topCheckbox')
      .get('input[type="checkbox"]')
      .should('be.checked')
      .should('have.data', 'indeterminate', false);
  });

  it('should show summary if any book is selected', () => {
    cy.get('@booksItems').first().click();
    cy.get('[data-testid="SummaryContent"]')
      .should('be.visible')
      .should('have.text', '1 books were selected for a total of $10.76');
  });

  it('should toggle selection of all books when clicking on top checkbox', () => {
    cy.get('@topCheckbox').click();
    cy.get('input[type="checkbox"]:checked').should('have.length', 3);

    cy.get('@topCheckbox').click();
    cy.get('input[type="checkbox"]:checked').should('have.length', 0);
  });
});
