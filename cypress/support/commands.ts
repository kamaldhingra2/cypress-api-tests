/// <reference types="cypress" />

/**
 * Overwrites 'cy.log' to print Cypress logs to the CLI and also to the Mochawesome report.
 * This ensures better debugging visibility in CI environments.
 */
Cypress.Commands.overwrite('log', function (log, ...args) {
    cy.addTestContext(...args);
    return cy.task('log', args, { log: true }).then(() => {
          return log(...args);
      });
});