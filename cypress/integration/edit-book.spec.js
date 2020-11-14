describe('Edit book', () => {
  beforeEach(() => {
    cy.route2({ url: Cypress.env('API_HOST') }, (req) => {
      const { operationName } = JSON.parse(req.body);

      if (operationName === 'GetBooks') {
        req.reply({ fixture: 'books.json' });
      }
    }).as('getBooks');

    cy.visit('/');

    cy.get('[data-testid="BooksListItem"]').first().as('bookListItem');
    cy.get('[data-testid="EditButton"]').first().click();
    cy.get('[data-testid="EditBookForm"]').as('editBookForm');
    cy.get('[data-testid="SubmitButton"]').as('submitButton');
  });

  it('should open modal with filled form', () => {
    cy.get('@editBookForm').should('be.visible');
    cy.get('#title').should('have.value', 'Murder on the Orient Express');
    cy.get('#author').should('have.value', 'Agatha Christie');
    cy.get('#price').should('have.value', 10.76);
  });

  it('should update book on list', () => {
    cy.route2(Cypress.env('API_HOST'), {
      fixture: 'edit-book-response.json',
      statusCode: 200
    }).as('editBook');

    cy.get('#title').type('The Mysterious Affair at Styles');
    cy.get('#author').type('Agatha Christie');
    cy.get('#price').clear().type(12);

    cy.get('@submitButton').click();
    cy.wait('@editBook');
    cy.get('@bookListItem')
      .contains('The Mysterious Affair at Styles')
      .should('be.visible');
  });
});
