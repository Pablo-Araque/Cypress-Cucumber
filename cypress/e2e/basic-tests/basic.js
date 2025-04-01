
import { LoginPage } from "../pages/loginPage";

// Better practice to POM without cucumber

import {commonPage, loginPage, mainPage, shoppingCartPage} from "../pages/indexPage"

// Instancias de clase



describe("basic test", () => {

  beforeEach("visit saucedemo", () => {
    cy.visit("https://www.saucedemo.com/");

  })

  it("login happy path", () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.url().should('not.include', 'inventory.html');
    cy.get('[data-test="primary-header"]').should('not.exist');
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', 'inventory.html');
    cy.get('[data-test="primary-header"]').should('contain', 'Swag Labs');
  });

  it("login happy path using page object model", () => {
    loginPage.correctLogin()
  });

  it("all Accepted usernames be visible", () => {
    cy.get('[data-test="login-credentials-container"]').find('[data-test="login-credentials"]')
    const users = [
      'standard_user',
      'locked_out_user',
      'problem_user',
      'performance_glitch_user',
      'error_user',
      'visual_user'
    ];
    users.forEach((user) => {
      cy.contains(user).should('be.visible');
    });
   });


   it("login error username", () => {
    cy.get('[data-test="login-button"]').click()
    cy.get('.error-message-container').find('[data-test="error"]').should('contain', 'Epic sadface: Username is required')
    });


    it("login error password", () => {
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="login-button"]').click();
      cy.get('.error-message-container').find('[data-test="error"]').should('contain', 'Epic sadface: Password is required')
      });


      it("login error username and password", () => {
        cy.get('[data-test="username"]').type('standard');
        cy.get('[data-test="password"]').type('secret');
        cy.get('[data-test="login-button"]').click();
        cy.get('.error-message-container').find('[data-test="error"]').should('contain','Epic sadface: Username and password do not match any user in this service')
        });


        it("login error lock user", () => {
          cy.get('[data-test="username"]').type('locked_out_user');
          cy.get('[data-test="password"]').type('secret_sauce');
          cy.get('[data-test="login-button"]').click();
          cy.get('.error-message-container').find('[data-test="error"]').should('contain','Epic sadface: Sorry, this user has been locked out.')
          });
})