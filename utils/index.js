async function checkDatabaseConnection(sequelize) {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

function synchronizeDatabase(sequelize) {
  sequelize
    .sync()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  checkDatabaseConnection,
  synchronizeDatabase,
};
