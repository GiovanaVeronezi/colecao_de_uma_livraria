import dns from "dns";
import mongoose from "mongoose";

dns.setServers(["8.8.8.8", "8.8.4.4"]);


async function conectaNaDataBase () { 
  mongoose.connect(process.env.DB_CONNECTION_STRING); //protegemos uma info atraves de variavel de ambiente
  return mongoose.connection; 
}

 export default conectaNaDataBase;

