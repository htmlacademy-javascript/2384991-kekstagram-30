const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const ErrorText = {
  GET: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  POST: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const getData = async () => {
  try {
    const response = await fetch(`${BASE_URL}${Route.GET_DATA}`);
    if (!response.ok) {
      throw new Error(ErrorText.GET);
    }
    return response.json();
  } catch (error) {
    throw new Error(ErrorText.GET);
  }
};


const sendData = async (onSuccess, onError, body) => {
  try {
    const response = await fetch(`${BASE_URL}${Route.SEND_DATA}`, {
      method: 'POST',
      body: body,
    });

    if (!response.ok) {
      throw new Error(ErrorText.POST);
    }

    onSuccess();
  } catch (error) {
    onError();
  }
};


export { getData, sendData };
