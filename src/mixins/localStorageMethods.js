const localStorageMethods = {
  save(status, item) {
    const itemString = JSON.stringify(item);
    if (status === 'browserRecord') {
      localStorage.setItem('browserRecord', itemString);
    } else {
      localStorage.setItem('favorite', itemString);
    }
  },
  get(status) {
    if (status === 'browserRecord') {
      return JSON.parse(localStorage.getItem('browserRecord'));
    }
    return JSON.parse(localStorage.getItem('favorite'));
  },
};
