const getData = (onSuccess, onFail) => {
  fetch('https://22.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((wizards) => {
      onSuccess(wizards);
    })
    .catch(() => {
      onFail();
    });
};


export {getData};
