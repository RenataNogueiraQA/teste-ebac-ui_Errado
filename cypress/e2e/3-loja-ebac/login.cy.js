/// <reference types="cypress"/>

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it ('Deve fazer login com sucesso', () => {        
        cy.get('#username').type('renata.teste@teste.com.br')
        cy.get('#password').type('Teste123@')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, renata.teste (não é renata.teste? Sair)')
    })

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type('renata@teste.com.br')
        cy.get('#password').type('Teste123@')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('exist')
    });

    it('Deve exibir mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('renata.teste@teste.com.br')
        cy.get('#password').type('Teste124@')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain', 'Erro: A senha fornecida para o e-mail renata.teste@teste.com.br está incorreta.')
        cy.get('.woocommerce-error').should('exist')
    });
})