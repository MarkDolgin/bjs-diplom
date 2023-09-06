//Строгий режим
"use strict";

//Создаем объект
const userForm = new UserForm();

//Функция для входа в личный кабинет
userForm.loginFormCallback = (data) =>
  ApiConnector.login(data, (response) => {
    if (response.success) {
      location.reload();
    } else {
      userForm.setLoginErrorMessage(response.error);
    }
  });

//Фукнция для регистрации
userForm.registerFormCallback = (data) =>
  ApiConnector.register(data, (response) => {
    if (response.success) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage(response.error);
    }
  });
