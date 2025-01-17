const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from "./data.json"
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    
    async function init() {

      const createRecipe = Recipe.create({
       title: "Risoto de camarão",
       level: "Amateur Chef",
       ingredients: [
         "arroz carnaroli",
         "queijo parmesão",
         "alho",
         "cebola",
         "azeite",
         "sal",
         "pimenta do reino",
         "amendoas",
         "vinho branco",
         "camarão",
       ],
       cuisine: "italy",
       dishType: "main_course",
       image:
           "https://vivareceita-cdn.s3.amazonaws.com/uploads/2020/11/receita-de-risoto-de-camarao-simples-e-cremoso-Foto-Papo-de-Casada.jpg",
       duration: 35 ,
       creator: "chefe Valério de Fiandra",
     });
     console.log("RecipeTitle", createRecipe)

     const recipesList = await Recipe.insertMany(data)
      recipesList.map((el) => console.log("RecipleTitle" , el.title))
    
     const updateRecipe = await Recipe.findOneAndUpdate(
       {title: "Rigatoni alla Genovese"},
       {$set: {duration: 100}},
       {new: true}
     );
     console.log("updatedRecipe", updateRecipe)

     const deleteRecipe = await Recipe.deleteOne({title: "Carrot Cake"})
       console.log("deletedRecipe", deleteRecipe)
       
       mongoose.connection.close();
    }
      init();
  })

  .catch(error => {
    console.error("Error connecting to the database", error);
  });

