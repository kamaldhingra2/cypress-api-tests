/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
      addTestContext(...args: any): void;
    }
  }
  