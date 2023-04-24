import app from "./src";
import constants from "./src/constants";

const startServer = () => {
  try {
    app.listen(constants.SERVER_PORT, () => {
      console.log("listening on port " + constants.SERVER_PORT);
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
};

startServer();
