describe('task page', () => {
  it('Should render the main image', () => {
    cy.visit('http://localhost:3001/')
    cy.get('.landing__image__container img')
  })

  it('Should display title page', () => {
    cy.visit('http://localhost:3001/')
    cy.get('.landing__header__container h1').contains("Checkout The Best Fashion Style")
  })
})