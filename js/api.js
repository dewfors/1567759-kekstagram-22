const API_URL = 'https://22.javascript.pages.academy/kekstagram/';

const getData = (onSuccess, onFail) => {
  // fetch('https://22.javascript.pages.academy/kekstagram/data')
  fetch(`${API_URL}data`)
    .then((response) => response.json())
    .then((wizards) => {
      onSuccess(wizards);
    })
    .catch(() => {
      onFail();
    });
};


const sendData = (onSuccess, onFail, body) => {
  fetch(
    API_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {

      response.ok ? onSuccess() : onFail();

      // if (response.ok) {
      //   onSuccess();
      // } else {
      //   onFail();
      // }
    })
    .catch(() => {
      onFail();
    });
};


export {getData, sendData};
