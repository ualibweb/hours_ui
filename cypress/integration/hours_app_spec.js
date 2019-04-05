describe('hours app', () => {
  describe('list', () => {
    it('successfully loads', () => {
      cy.visit('/')
    })
    it('has a table with 5 items', () => {
      cy.get('.hours-list table')
        .find('tbody')
        .should(($tbody) => {
          expect($tbody).to.have.length(5)
        })
    })
  })
  describe('hours page', () => {
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
  })
  describe('calendar', () => {
    it('clicks the button for calendar and exceptions', () => {
      cy.contains('Calendar & Exceptions').click()
      //'calendar and exceptions' button should be active
      cy.get('.hours-calendar .btn-group')
        .children('.active')
        .should('contain', 'Calendar & Exceptions')
      //should show calendar
    })
    it('clicks next button on calednar', () => {
      //should view next month's calendar
    })
  })
  describe('hours-locations', () => {
    it('clicks a different library in menu', () => {
      cy.contains('.hidden-sm ul li', 'Hoole').should('be.visible')
      .click()
      cy.url()
        .should('include', '/hours?library=hoole')
      //change view to new library
      //check all calendars/maps still loading
    })
  })
})
