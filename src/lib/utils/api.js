export const returnError = (status, message) => {
  return {
    status,
    body: {
      message
    }
  }
};