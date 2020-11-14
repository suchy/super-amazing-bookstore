describe('Create new book', () => {
  beforeEach(() => {
    cy.route2({ url: Cypress.env('API_HOST') }, (req) => {
      const { operationName } = JSON.parse(req.body);

      if (operationName === 'GetBooks') {
        req.reply({ fixture: 'books.json' });
      }
    }).as('getBooks');

    cy.visit('/');

    cy.get('[data-testid="CreateButton"]').as('createButton');
    cy.get('@createButton').click();
    cy.get('[data-testid="EditBookForm"]').as('editBookForm');
    cy.get('[data-testid="SubmitButton"]').as('submitButton');
  });

  it('should open modal with empty form', () => {
    cy.get('@editBookForm').should('be.visible');
    cy.get('#title').should('have.value', '');
    cy.get('#author').should('have.value', '');
    cy.get('#price').should('have.value', 0);
  });

  it('should close modal after clicking cancel button', () => {
    cy.get('[data-testid="CancelButton"]').click();
    cy.get('@editBookForm').should('not.be.visible');
  });

  it('submit button should be disabled if any field is blank', () => {
    cy.get('@submitButton').should('be.disabled');

    cy.get('#title').type('Murder on the Orient Express');
    cy.get('#author').type('Agatha Christie');
    cy.get('#price').type(10.76);

    cy.get('@submitButton').should('not.be.disabled');
  });

  it('should show loader when submiting form', () => {
    cy.route2(Cypress.env('API_HOST'), {
      fixture: 'create-book-response.json',
      delayMs: 5000,
      statusCode: 200
    }).as('createBook');

    cy.get('#title').type('Murder on the Orient Express');
    cy.get('#author').type('Agatha Christie');
    cy.get('#price').clear().type(1);

    cy.get('@submitButton').click();
    cy.get('[data-testid="Loader"]').should('be.visible');
  });

  it('should show error message when if error occurs', () => {
    cy.route2(Cypress.env('API_HOST'), {
      fixture: 'create-book-response.json',
      statusCode: 500
    }).as('createBook');

    cy.get('#title').type('Murder on the Orient Express');
    cy.get('#author').type('Agatha Christie');
    cy.get('#price').clear().type(1);

    cy.get('@submitButton').click();
    cy.wait('@createBook');
    cy.get('[data-testid="ErrorMessage"]').should('be.visible');
  });

  it('should close modal after submit', () => {
    cy.route2(Cypress.env('API_HOST'), {
      fixture: 'create-book-response.json',
      statusCode: 200
    }).as('createBook');

    cy.get('#title').type('Murder on the Orient Express');
    cy.get('#author').type('Agatha Christie');
    cy.get('#price').clear().type(1);

    cy.get('@submitButton').click();
    cy.get('@editBookForm').should('not.be.visible');
  });

  it('should add new book to list', () => {
    cy.route2(Cypress.env('API_HOST'), {
      fixture: 'create-book-response.json',
      statusCode: 200
    }).as('createBook');

    cy.get('#title').type('Murder on the Orient Express');
    cy.get('#author').type('Agatha Christie');
    cy.get('#price').clear().type(1);

    cy.get('@submitButton').click();
    cy.contains('Do Androids Dream of Electric Sheep?').should('be.visible');
  });
});
