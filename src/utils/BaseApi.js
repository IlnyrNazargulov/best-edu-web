const getSuccessData = (response) => {
  return response.data;
};

const getErrorData = (err) => {
  return err.response.data.errors[0];
};

const developHost = "https://best-edu.tk/api/v1";

export default { getErrorData, getSuccessData, developHost };
