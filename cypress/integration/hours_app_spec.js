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
    it('clicks the link for gorgas', () => {
      cy.contains('Gorgas Library').click()
    })
  })
  describe('hours page', () => {
    it('loads /hours page for gorgas', () => {
      cy.url()
        .should('include', '/hours?library=Gorgas%20Library')
     })
     it('checks for page elements', () => {
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
    // need to show difference between typical schedule and calendar views
    // ng-show="!calView" and ng-hide toggle for typical schedule
    it('checks "typical schedule" behavior', () => {
      //div with !calView should be visible
      cy.get('[ng-show="!calView"]')
        .should('be.visible')
        .find('.hours')
        .should(($hours) => {
          expect($hours).to.have.length(7)
        })
        .should('contain', '12 pm to  2 am')
      cy.get('[ng-show="calView"]')
        .should('have.class', 'ng-hide')
        .should('not.be.visible')
    })
    it('clicks the button for "calendar and exceptions"', () => {
      cy.contains('Calendar & Exceptions').click()
      //'calendar and exceptions' button should be active
      cy.get('.hours-calendar .btn-group')
        .children('.active')
        .should('contain', 'Calendar & Exceptions')
      //should show calendar
      cy.get('[ng-show="calView"]')
        .should('be.visible')
        //should have so many rows
        //should not show times on previous dates
        //next month's days should be greyed out
    })  
    it('clicks next button on calendar', () => {
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
  describe('map function', () => {
    it('loads the location in google map', () => {
     //who knows 
    })
  })
})
