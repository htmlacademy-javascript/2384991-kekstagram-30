const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  POST: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const load = async (route, errorText = null, method = Method.GET, body = null, onSuccess = null) => {
  try {
    const response = await fetch(`${BASE_URL}${route}`, { method, body });
    if (!response.ok) {
      throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
    }

    if (onSuccess) {
      onSuccess(response);
    }

    return response.json();
  } catch (err) {
    throw new Error(errorText ?? err.message);
  }
};


const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (pictureData, onSuccess) => load(Route.SEND_DATA, ErrorText.POST_DATA, Method.POST, pictureData, onSuccess);


export { getData, sendData };
