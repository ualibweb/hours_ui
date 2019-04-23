describe('hours app', () => {

  describe('list', () => {
    it('successfully loads', () => {
      cy.visit('/')
    })
    it('has a table with 5 items', () => {
      cy.get('.hours-list table')
        .find('tbody')
        .should('have.length', 5)
    })
    it('clicks link to full hours', () => {
      cy.contains('Hours & Locations')
        .click()
      cy.url()
        .should('include', '/#/hours')
    })
    it('goes back to homepage', () => {
      cy.contains('The University of Alabama Libraries')
        .click()
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
    it('checks the breadcrumbs', () => {
      cy.get('.breadcrumb li')
        .should('have.length', 2)
        .first()
        .find('a')
        .should('have.attr', 'href', '/#/home')
    })
    describe('checks the contact info', () => {
      it('email link ends in "@ua.edu"', () => {
          cy.get('[ng-if="contact"]').within(() => {
              cy.get('[ng-if="contact.email"] a')
                .should('contain', '@ua.edu')
          })
      })
      it('phone number includes "(205)"', () => {
          cy.get('[ng-if="contact"]').within(() => {
              cy.get('[ng-if="contact.phone"] a')
                .should('contain', '(205)')
          })
      })
      it('"learn more" link is for gorgas', () => {
          cy.get('.well')    
            .should('contain', 'Gorgas')  
          cy.get('.well a.btn')
            .should('have.attr', 'href', '/libraries/gorgas/')
      })
    })
     describe('checks for page elements', () => {
       it('"typcial schedule" button is active', () => {
          cy.get('.hours-calendar .btn-group')
            .children('.active')
            .should('contain', 'Typical Schedule')
       })
       it('should show table of hours', () => {
          cy.get('.hours-calendar table')
            .should('exist')
            .and('be.visible')
       })
       it('should load a map', () => {
          cy.get('ng-map')
            .should('exist')
            .and('be.visible')
       })
    })
  })

  describe('calendar module', () => {
    // need to show difference between typical schedule and calendar views
    // ng-show="!calView" and ng-hide toggle for typical schedule
    it('checks "typical schedule" behavior', () => {
      //div with !calView should be visible
      cy.get('[ng-show="!calView"]')
        .should('be.visible')
        .find('.hours')
        .should('have.length', 7)
        .and('contain', '12 pm to  2 am')
      cy.get('[ng-show="calView"]')
        .should('have.class', 'ng-hide')
        .and('not.be.visible')
    })
    it('clicks the button for "calendar and exceptions"', () => {
      cy.contains('Calendar & Exceptions').click()
        .should('have.class', 'active')
      //should show calendar
      cy.get('[ng-show="calView"]')
        .should('be.visible').within(() => {
          cy.get('table tbody').children()
            .should('have.length', 6)
          //should not show times on previous dates
          cy.get('td.today').prev().children('.hours')
            .should('not.have.attr', 'ng-if' )
          //next month's days should be greyed out
          cy.get('td').last()
            .should('have.class', 'not-current-month')
        })
    })  
    it('cannot click the previous button on calendar', () => {
      //previous arrow should be un-clickable
      cy.get('[ng-show="calView"]')
        .find('button').first()
        .should('be.disabled')
    })
    it('clicks next button and shows next month calendar', () => {
      cy.get('[ng-show="calView"]')
        .find('button').last()
        .click()
      cy.url()
        .should('include', '&month=1')
    })
    it('clicks previous button and shows current caledar', () => {
      cy.get('[ng-show="calView"]')
        .find('button').first()
        .click()
      cy.url()
        .should('include', '&month=0')
    })
  })

  describe('map function', () => {
    it('loads the location in google map', () => {
      cy.get('ng-map')
        .should('be.visible')
        .should('have.attr', 'center', '[33.211803,-87.546032]')
    })
  })

  describe('hours-locations module', () => {
    it('clicks a different library in menu', () => {
      cy.contains('.hidden-sm ul li', 'Hoole').should('be.visible')
      .click()
      cy.url()
        .should('include', '/hours?library=hoole')
      //check all calendars/maps still loading
    })
    describe('checks hero UI', () => {
      it('checks the breadcrumbs', () => {
        cy.get('.breadcrumb li')
          .should('have.length', 2)
          .first()
          .find('a')
          .should('have.attr', 'href', '/#/home')
      })
      it('email link ends in "@bama.ua.edu"', () => {
          cy.get('[ng-if="contact"]').within(() => {
              cy.get('[ng-if="contact.email"] a')
                .should('contain', '@bama.ua.edu')
          })
      })
      it('phone number includes "(205)"', () => {
          cy.get('[ng-if="contact"]').within(() => {
              cy.get('[ng-if="contact.phone"] a')
                .should('contain', '(205)')
          })
      })
      it('"learn more" link is for hoole', () => {
          cy.get('.well')    
            .should('contain', 'Hoole')  
          cy.get('.well a.btn')
            .should('have.attr', 'href', '/libraries/hoole/')
      })
      
    })
    it('checks calendar visibility and conditionals', () => {
      cy.get('[ng-show="calView"]')
        .should('be.visible').within(() => {
          cy.get('table tbody').children()
            .should('have.length', 6)
          //should not show times on previous dates
          cy.get('td.today').prev().children('.hours')
            .should('not.have.attr', 'ng-if' )
          //next month's days should be greyed out
          cy.get('td').last()
            .should('have.class', 'not-current-month')
        })
      
    })
    it('checks map loads with new coordinates', () => {
      cy.get('ng-map')
        .should('be.visible')
        .should('have.attr', 'center', '[33.210927,-87.543182]')
      
    })
  })
})
