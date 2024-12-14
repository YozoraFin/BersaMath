import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const db = new Sequelize(process.env.DB,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    dialect:'mysql',
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    logging:false
})

db.sync() 
export default db