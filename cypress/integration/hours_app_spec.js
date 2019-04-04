describe('hours app', () => {
  it('successfully loads', () => {
    cy.visit('/')
  })
  it('clicks the link for gorgas', () => {
    cy.contains('Gorgas Library').click()
    cy.url()
      .should('include', '/hours?library=Gorgas%20Library')
    //'typical schedule' button should be active
    cy.get('.hours-calendar .btn-group')
      .children('.active')
      .should('contain', 'Typical Schedule')
    //should show table of hours
    cy.get('.hours-calendar table')
      .should('exist')
    //map should load
    cy.get('ng-map')
      .should('exist')
  })
  it('clicks the button for calendar and exceptions', () => {
    //'calendar and exceptions' button should be active
    //should show calendar
  })
  it('clicks a different library in menu', () => {
    //change view to new library
    //check all calendars/maps still loading
  })
})
