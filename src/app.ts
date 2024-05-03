import express from "express";
import { dbSync, sequelize } from "./config/database";
import propertyRoutes from "./routes/propertyRoutes";

const app = express();
const port = 3000;
const main = async ()=>{
  
  await dbSync(); // Llama a la función de sincronización después de la autenticación
  
  app.use(express.json());
  app.use('/api', propertyRoutes);
  
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