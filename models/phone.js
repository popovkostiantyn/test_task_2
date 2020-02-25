module.exports = (sequelize, DataTypes) => {
  const Phone = sequelize.define('Phone', {
    number: DataTypes.STRING,
  });

  Phone.associate = (models) => {
    models.Phone.hasOne(models.Person);
  };

  return Phone;
};
