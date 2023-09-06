//Строгий режим

"use strict";

//Выход из личного кабинета

const logoutButton = new LogoutButton();

logoutButton.action = () =>
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    }
  });

//Получение информации о пользователе
ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

//Получение текущих курсов валюты

const ratesBoard = new RatesBoard();

const repeatGetStocks = () =>
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });

repeatGetStocks();

setInterval(repeatGetStocks, 60000);

//Операции с деньгами

const moneyManager = new MoneyManager();

//Пополнение баланса

moneyManager.addMoneyCallback = (data) =>
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Баланс кошелька пополнен");
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });

//Конвертирование валюты

moneyManager.conversionMoneyCallback = (data) =>
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Конвертация выполнена");
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });

//Перевод валюты

moneyManager.sendMoneyCallback = (data) =>
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Перевод выполнен");
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });

//Работа с избранным

const favoritesWidget = new FavoritesWidget();

//Начальный список

ApiConnector.getFavorites((response) => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

//Добавление в избранное

favoritesWidget.addUserCallback = (data) =>
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(
        response.success,
        "Пользователь добавлен в избранное"
      );
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  });

//Удаление пользователя из избранного

favoritesWidget.removeUserCallback = (data) =>
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(
        responce.success,
        "Пользователь успешно удален"
      );
    } else {
      favoritesWidget.setMessage(response.success, response.error);
    }
  });
