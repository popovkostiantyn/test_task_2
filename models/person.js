module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    name: DataTypes.STRING,
  });

  Person.associate = (models) => {
    models.Person.belongsTo(models.Phone);
  };

  return Person;
};
