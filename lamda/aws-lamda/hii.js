exports.hii = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "sj hii!",
    }),
  };
};
