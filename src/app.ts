import express from "express";
import { dbSync, sequelize } from "./config/database";
import propertiesRoutes from "./routes/propertiesRoutes";

const app = express();
const port = 3001;
const main = async ()=>{
  
  await dbSync();
  
  app.use(express.json());
  app.use('/api', propertiesRoutes);
  
  app.listen(port, async () => {
      console.log(`Server running on http://localhost:${port}`);
      try {
        await sequelize.authenticate();
        console.log('La conexión con la base de datos ha sido establecida correctamente.');
        
      } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
      }
    });
}
main();