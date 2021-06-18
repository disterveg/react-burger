describe('app works correctly with routes', function() {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('should open constructor page by default', function() {
    cy.contains('Соберите бургер');
  });

  it('should visible title Соусы after click the same tab', function() {
    cy.get('span').contains('Соусы').parent().click();
    cy.get('h2').contains('Соусы').should('be.visible');
  });

  it('should visible title Булки after click the same tab', function() {
    cy.get('span').contains('Булки').parent().click();
    cy.get('h2').contains('Булки').should('be.visible');
  });

  it('should visible title Начинки after click the same tab', function() {
    cy.get('span').contains('Начинки').parent().click();
    cy.get('h2').contains('Начинки').should('be.visible');
  });

  it('should open popup after click by image', function() {
    cy.get('img[alt="Краторная булка N-200i"]').click();
    cy.get('h3').contains('Краторная булка N-200i').should('exist');
  });

  it('should close popup after button click', function() {
    cy.get('button[class^="modal_close__"]').click();
    cy.get('h3').should('not.exist');
  });

  it('should add bun at constructor after dnd', function() {
    cy.get('div[class^="ingredient_ingredient__"]').contains('Флюоресцентная булка R2-D3').trigger('dragstart');
    cy.get('div[class^="constructor-list_section__"]').trigger('drop');
    cy.get('div[class^="ingredient_ingredient__"]').contains('Флюоресцентная булка R2-D3').find('div[class^="counter_counter__"]').contains('1').should('exist')
  });

  it('should add ingredinet at constructor after dnd', function() {
    cy.get('div[class^="ingredient_ingredient__"]').contains('Филе Люминесцентного тетраодонтимформа').trigger('dragstart');
    cy.get('div[class^="constructor-list_section__"]').trigger('drop');
    cy.get('div[class^="ingredient_ingredient__"]').contains('Филе Люминесцентного тетраодонтимформа').find('div[class^="counter_counter__"]').contains('1').should('exist')
  });

  it('should add another ingredinet at constructor after dnd', function() {
    cy.get('div[class^="ingredient_ingredient__"]').contains('Соус Spicy-X').trigger('dragstart');
    cy.get('div[class^="constructor-list_section__"]').trigger('drop');
    cy.get('div[class^="ingredient_ingredient__"]').contains('Соус Spicy-X').find('div[class^="counter_counter__"]').contains('1').should('exist')
  });

  it('should add the same ingredinet at constructor after dnd', function() {
    cy.get('div[class^="ingredient_ingredient__"]').contains('Соус Spicy-X').trigger('dragstart');
    cy.get('div[class^="constructor-list_section__"]').trigger('drop');
    cy.get('div[class^="ingredient_ingredient__"]').contains('Соус Spicy-X').find('div[class^="counter_counter__"]').contains('2').should('exist')
  });

  it('should add another ingredinet at constructor after dnd', function() {
    cy.get('div[class^="ingredient_ingredient__"]').contains('Сыр с астероидной плесенью').trigger('dragstart');
    cy.get('div[class^="constructor-list_section__"]').trigger('drop');
    cy.get('div[class^="ingredient_ingredient__"]').contains('Сыр с астероидной плесенью').find('div[class^="counter_counter__"]').contains('1').should('exist')
  });

  it('should move first ingredinet at the list after dnd', function() {
    cy.get('div[class^="constructor-ingredient_wrapper__"]').contains('Сыр с астероидной плесенью').trigger('dragstart');
    cy.get('div[class^="constructor-ingredient_wrapper__"]').contains('Филе Люминесцентного тетраодонтимформа').trigger('drop');
    cy.get('div[class^="constructor-ingredient_wrapper__"]').eq(3).should('contain', 'Филе Люминесцентного тетраодонтимформа');
  });

  it('should delete ingredinet after click buton delete', function() {
    cy.get('div[class^="constructor-ingredient_wrapper__"]').eq(2).find('span[class="constructor-element__action pr-2"]').click();
    cy.get('div[class^="constructor-ingredient_wrapper__"]').contains('Сыр с астероидной плесенью').should('not.exist');
  });

  it('should correct show sum ingredinets', function() {
    let sum = 0;
    cy.get('span[class="constructor-element__price"]').each((item) => {
      sum += parseFloat(item.text());
    }).then(() => {
      cy.get('p[class^="burger-constructor_price__"]').contains(sum.toString()).should('exist');
    });
  });

  it('should exist lower bun after click buton delete', function() {
    cy.get('div[class="constructor-element constructor-element_pos_bottom"]').find('span[class="constructor-element__action pr-2"]').click();
    cy.get('div[class="constructor-element constructor-element_pos_bottom"]').should('exist');
  });

  it('should open login page after click order button', function() {
    cy.get('button[class^="button_button__"]').contains('Оформить заказ').click();
    cy.contains('Вход');
  });

  it('should authorize after enter data', function() {
    cy.get('.input_type_email').find('.input__icon.input__icon-action').click();
    cy.get('.input_type_email').find('.input__textfield').type('72dima@bk.ru');
    cy.get('.input_type_password').find('.input__textfield').type('qwerty123');
    cy.get('button[class^="button_button__"]').contains('Войти').click();
  });

  it('should open popup with order info after button click', function() {
    cy.contains('Соберите бургер');
    cy.get('button[class^="button_button__"]').contains('Оформить заказ').click();
    cy.get('p[class^="order-details_text__"]').contains('Ваш заказ начали готовить').should('exist');
  });

  it('should close popup with order info after button close click', function() {
    cy.get('button[class^="modal_close__"]').click();
    cy.get('p[class^="order-details_text__"]').should('not.exist');
  });
}); 