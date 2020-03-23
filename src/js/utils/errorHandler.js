const errorHandler = err => {
  if (typeof err.text === 'function') {
    return err.text().then(error => JSON.parse(error).message);
  }
  return console.log(err);
};

export default errorHandler;
