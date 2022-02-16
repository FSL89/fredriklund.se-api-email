const { Sequelize, DataTypes, Model } = require('sequelize')
const sequelize = new Sequelize(`postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`, { 
  ssl: true,
  logging: false,
})

class History extends Model {}
History.init({
  history_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  message_id: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING
  },
  from: {
    type: DataTypes.STRING
  },
  to: {
    type: DataTypes.STRING
  },
  subject: {
    type: DataTypes.STRING
  },
  date: {
    type: DataTypes.DATE
  }
},
{
  // Options
  sequelize,
  modelName: 'history',
  schema: 'email',
  timestamps: false,
  underscored: true,
  freezeTableName: true
})

//
//  Associations
//

//
//  Syncing
//

History.sync({ force: false, alter: true })

//
//  Export
//

module.exports = sequelize.models