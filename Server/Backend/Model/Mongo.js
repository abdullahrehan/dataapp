const jwt=require("jsonwebtoken")
const mongoose=require("mongoose")
mongoose.connect(process.env.MONGODB_URI || 
"mongodb+srv://Rehan:123@qwerty@testing.hv5ln.mongodb.net/test",
{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})


const Schema=new mongoose.Schema({
    username:{type:String,required:true},
    profile:Object,
    password:String,
    email:String,    
    textDoc:{main:[]},
    messages:{main:[]},
    imagefolder:{main:[]},
    wordfolder:{main:[]},
    pdffolder:{main:[]},
    viewAllImages:false,
    folderPassword:String,
    recentFolders:[],
    token:String,
    jwt:String
 
})
 
const Model=new mongoose.model("User",Schema)

module.exports=Model
