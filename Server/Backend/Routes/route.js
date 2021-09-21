const {OAuth2Client} = require('google-auth-library');const client=new OAuth2Client('419594361812-33f51cf3fkmlg1ca69h0r8g4v2sk5lkf.apps.googleusercontent.com');
const Model=require("../Model/Mongo.js")
const nodemailer = require('nodemailer');
const jwt=require("jsonwebtoken");
const express=require("express")  
const Multer=require('../utils/multer')
const cloudinary=require('../utils/cloudinary')
const htmlDocx = require('html-docx-js');
const route=express.Router()

const code=Math.floor(Math.random() * (1000-9999 + 1)) + 9999

route.post("/setMainfolder",(req,res)=>{
    
  
    Model.findOneAndUpdate({email:req.body.email},{$set:{textDoc:{ main: {name:'MainFolder',value:[{heading:"MainFolder",body:"MainFolder"}],secure:false} }}},{upsert:true} ,(err,data)=>{console.log(data)})
    Model.findOneAndUpdate({email:req.body.email},{$set:{messages:{ main: {name:'MainFolder',value:[{heading:"MainFolder",body:"MainFolder"}],secure:false} }}},{upsert:true} ,(err,data)=>{})
    Model.findOneAndUpdate({email:req.body.email},{$set:{imagefolder:{ main: {name:'MainFolder',value:[{defaultName:"MainFolder",editedName:"MainFolder"}],secure:false} }}},{upsert:true} ,(err,data)=>{})
    Model.findOneAndUpdate({email:req.body.email},{$set:{wordfolder:{ main: {name:'MainFolder',value:[{defaultName:"MainFolder",editedName:"MainFolder"}],secure:false} }}},{upsert:true} ,(err,data)=>{})
    Model.findOneAndUpdate({email:req.body.email},{$set:{pdffolder:{ main: {name:'MainFolder',value:[{defaultName:"MainFolder",editedName:"MainFolder"}],secure:false} }}},{upsert:true} ,(err,data)=>{console.log(data)})

    Model.findOneAndUpdate(
    {email:req.body.email},
    
    {$push:{recentFolders:
    {$each:[
    {name:'imagefolder',value:[]},
    {name:'wordfolder',value:[]},
    {name:'pdffolder',value:[]},
    {name:'messages',value:[]},
    {name:'textDoc',value:[]}]} }},

    {upsert:true},(err,data)=>{console.log(data)})
   
    })

route.get("/",(req,res)=>{
  
    Model.find( (err,data)=>{res.send(data)})
   
})     

route.post("/nameverify",(req,res)=>{

    Model.find({username:req.body.name},(err,data)=>{ data.length!==0 ? res.send('not available') : res.send('available')})     
    
})

route.post("/emailverify",(req,res)=>{

    Model.find({email:req.body.email},(err,data)=>{data.length!==0 ? res.send('not available') : res.send('available')})     
    
})

route.post("/ViewAllMode",(req,res)=>{

    Model.find({email:req.body.email},(err,data)=>{res.send(data[0].viewAllImages)})     

})
 
route.post("/setViewAllMode",(req,res)=>{

    Model.findOneAndUpdate({email:req.body.email},{viewAllImages:req.body.data},(err,data)=>{res.send('ok')})     

})



route.post("/recentFoldersData",(req,res)=>{

    Model.find({email:req.body.email},(err,data)=>{

        const folder=data[0].recentFolders.find(data=>data.name===req.body.currentTab).value
        res.send(folder)

    })     
})


route.post("/recentFolders",(req,res)=>{

    const tab=req.body.currentTab    
    const folder=req.body.folderName
    const secure=req.body.secure
    const push={name:folder,secure:secure}
 
    Model.find({email:req.body.email},(err,data)=>{
    
    const recentFolderData=data[0].recentFolders
    const Data=recentFolderData[recentFolderData.findIndex(data=>data.name===tab)].value
    const condition=Data.find(data=>data.name===folder)===undefined

    if(condition){

    const folders=[...Data,push]   
    folders.length>= 5 ? folders.shift():folders
    const filterArray=folders.filter(data=>data.name!=='MainFolder')

    Model.findOneAndUpdate( 
        {email:req.body.email,"recentFolders.name":tab},
        {$set:{[`recentFolders.$.value`]:filterArray}},
        {new:true},
        (err,data)=>{
         res.send(data.recentFolders[data.recentFolders.findIndex(data=>data.name===tab)].value)
        })}

    })
})


route.post("/setrecentFolders",(req,res)=>{

    const tab=req.body.currentTab     

    Model.findOneAndUpdate({email:req.body.email,"recentFolders.name":tab},{$set:{[`recentFolders.$.value`]:req.body.newList}},(err,data)=>{res.send('ok')})     
  
 
})

route.post("/deletRecentFolders",(req,res)=>{

    const tab=req.body.currentTab    
    const folder=req.body.folderName
        
    Model.findOneAndUpdate({email:req.body.email,"recentFolders.name":tab},{$pull:{[`recentFolders.$.value`]:{name:folder}}},(err,data)=>{res.send('done')})     


}
)

// ---------------------------------------------------------------Folder Api --------------------------------------------------------------- //

route.post("/folders",(req,res)=>{

    const email=req.body.email
    const tab=req.body.tab 

    Model.find({email:email},(err,data)=>{

        const folder=data[0][tab].main
        const sendData=folder.map((data)=>{return {name:data.name,secure:data.secure}})
        res.send(sendData); 
    })      

})

// ---------------------------------------------------------------Folder Api --------------------------------------------------------------- //

route.post("/folderStatus",(req,res)=>{

    const email=req.body.email
    const tab=req.body.currentTab
    const folderName=req.body.currentFolder

    Model.find({email:email},(err,data)=>{

        const folder=data[0][tab].main.find(data=>data.name===folderName).secure
        res.send(folder);
      
    })      

})


// ---------------------------------------------------------------Create Folder--------------------------------------------------------------- //

route.post("/createfolder",(req,res)=>{
    
    const tab=req.body.MainfolderName
    const files={defaultName: req.body.newfolderName , editedName: req.body.newfolderName}
    const text={heading: req.body.newfolderName , body: req.body.newfolderName}

    const insertedValue=tab==='textDoc' || tab==='messages' ? text : files

    Model.findOneAndUpdate({email:req.body.email,[`${tab}.main.name`]:"MainFolder"},{$push:{[`${tab}.main`]:{name:req.body.newfolderName,value:[ insertedValue ],secure:false}}},
    (err,data)=>{res.send('folder created')}) 
 

})


// ---------------------------------------------------------------Delete Folders---------------------------------------------------------------

// -------------Delete Folders  -------------
route.post("/deleteFolder",(req,res)=>{
 
    if(req.body.folderName!=='MainFolder'){
   
    const tab=req.body.currentTab
      
    Model.findOneAndUpdate({email:req.body.email,[`${tab}.main.name`]:"MainFolder"},{$pull:{[`${tab}.main`]:{name:req.body.folderName}}},(err,data)=>{res.send('folder deleted')}) 
     
    }
}) 


// ---------------------------------------------------------------Upload Api--------------------------------------------------------------- //


route.post("/ImageData",(req,res)=>{

    const email=req.body.email
    const tab=req.body.currentTab
    const folderName=req.body.currentFolder

    Model.find({email:email},(err,data)=>{ 

        const folder=data[0][tab].main.find(folder=>folder.name===folderName).value
        res.send(folder);
    })      

})

route.post("/ProfilePicture",(req,res)=>{

    Model.find({email:req.body.email},(err,data)=>{res.send(data[0].profile)})      

})

// ---------------Image upload----------------

route.post("/uploadValue",(req,res)=>{
    uploadFolderTab=req.body.tab
    uploadFolder=req.body.folder
    res.send('ok')
})




route.post("/uploads",Multer.array("uploadedFile",10),async(req,res)=>{
   
       const tab=req.body.tab

       req.files.map(async(data,index)=>{

          const result=await cloudinary.uploader.upload(data.path)
          const filename={defaultName:data.originalname,editedName:'',publicId:result.public_id,Url:result.secure_url}

          Model.findOneAndUpdate( 
              {email:req.body.email,[`${tab}.main.value`]:{defaultName:req.body.folder,editedName:req.body.folder}},
              {$push:{[`${tab}.main.$.value`]:filename}},
              (err,data)=>{ index===req.files.length-1 ? res.send('uploaded'):null })  
     
        })
 
    
})
 
route.post("/editedImageName",(req,res)=>{
    
 
 
        Model.find({email:req.body.email},(err,data)=>{

            const folderArray=data[0][req.body.tab].main
            const findarray=folderArray.find(findData=>findData.name==req.body.folder)
            const findImage=findarray.value.find(findData=>findData.defaultName===req.body.imagename)           
            findImage.editedName=req.body.newName
           
            const Folderdata=[...folderArray]
              
            Model.findOneAndUpdate({email:req.body.email},{$set:{[req.body.tab]:{ main: Folderdata }}},(err,data)=>{
            
            res.send('name Changed')})
        })
     
})

route.post("/uploadProfile",Multer.single("uploadedFile"),async(req,res)=>{

    
    const result=await cloudinary.uploader.upload(req.file.path)
    Model.findOneAndUpdate({email:req.body.email},{$set:{profile:{defaultName:req.file.originalname,url:result.secure_url,imageId:result.public_id}}},(err,data)=>{res.send(result.secure_url)})

})
    

// ---------------------------------------------------------------Txt Messages Api--------------------------------------------------------------- //

// -------------Send Messages Data------------- //
route.post("/txt",(req,res)=>{

  Model.find({email:req.body.email},(err,data)=>{
      const messages=data[0].messages.main
      res.send(messages[messages.findIndex(data=>data.name===req.body.folder)])
    })

})

// -------------Upload Messages ------------- //
route.post("/uploadTxt",(req,res)=>{

const msg={heading:req.body.heading,body:req.body.body,color:req.body.color}
 
const messag='messages'
    console.log('enter uploadTxt')
    Model.findOneAndUpdate(
    {email:req.body.email,"messages.main.value":{heading:req.body.folder,body:req.body.folder}},
    {$push:{[`${messag}.main.$.value`]: msg }},{new:true},
    (err,data)=>{res.send(data)})
    
})
  
// -------------Update Message ------------- //
route.post("/txt/update",(req,res)=>{
              
    Model.find({email:req.body.email},(err,data)=>{

        const Data=data[0].messages.main
        const folderData=Data[Data.findIndex(data=>data.name===req.body.currentFolder)]
        const UpdatedValue=folderData.value.find(data=>data.heading===req.body.oldheading)    

        UpdatedValue.body=req.body.body
        UpdatedValue.heading=req.body.heading
          
        Model.findOneAndUpdate({email:req.body.email},{$set:{messages:{main:Data}}},(err,data)=>{res.send("message updated")})

        })
})

route.post("/delete/txt",(req,res)=>{ 

    Model.findOneAndUpdate( 
        {email:req.body.email,'messages.main.value':{heading: "MainFolder", body: "MainFolder"}},
        {$pull:{'messages.main.$.value':{heading:req.body.heading,body:req.body.body}}},
        (err,data)=>{res.send("deleted")}) 
   
    
}) 

// ---------------------------------------------------------------Notes Tab Apis--------------------------------------------------------------- //

// -------------TextData------------- //

route.post("/notes",(req,res)=>{

    Model.find({email:req.body.email},(err,data)=>{
        const notes=data[0].textDoc.main
        res.send(notes[notes.findIndex(data=>data.name===req.body.folder)]) 
      })
  
})

route.post("/upload/notes",(req,res)=>{
     
    Model.findOneAndUpdate(
    {email:req.body.email,"textDoc.main.value":{heading:req.body.folder,body:req.body.folder}},
    {$push:{'textDoc.main.$.value': {heading:req.body.header,body:req.body.data} }},{new:true},
    (err,data)=>{res.send(data)})

})

route.post("/delete/notes",(req,res)=>{
  
    Model.findOneAndUpdate(
    {email:req.body.email,"textDoc.main.value":{heading:req.body.folder,body:req.body.folder}},
    {$pull:{'textDoc.main.$.value': {heading:req.body.header,body:req.body.data} }},{new:true},
    (err,data)=>{res.send(data)})

})


    // -------------Update Notes ------------- //

route.post("/notes/update",(req,res)=>{
        
Model.find( 
    {email:req.body.email},
    (err,data)=>{
    const Data=data[0].textDoc.main
    const folderData=Data[Data.findIndex(data=>data.name===req.body.currentFolder)]
    const UpdatedValue=folderData.value.find(data=>data.heading===req.body.oldheading)    

    UpdatedValue.body=req.body.body
    UpdatedValue.heading=req.body.heading 

    Model.findOneAndUpdate( 
    {email:req.body.email},
    {$set:{textDoc:{main:Data}}},
    {new:true},
    (err,data)=>{res.send('updated')})

    })
})
// --------------------------------------------------------------- folders Password Info--------------------------------------------------------------- //

route.post("/folderPassword",(req,res)=>{
 
    Model.findOneAndUpdate({email:req.body.email},{$set:{folderPassword:req.body.folderPassword}},(err,data)=>{console.log(data)})   
 
})

route.post("/setFoldertoSecure",(req,res)=>{

    const tab=req.body.tab
    Model.findOneAndUpdate({email:req.body.email,[`${tab}.main.name`]:req.body.currentFolder},{$set:{[`${tab}.main.$.secure`]:req.body.secure}},(err,data)=>{res.send('ok')}) 

})

// ---------------------------------------------------------------Delete Files--------------------------------------------------------------- //

// -------------Delete Files imagefolder ------------- //
route.post("/delete",async(req,res)=>{
  
    const tab=req.body.currentTab

    Model.findOneAndUpdate( 
        {email:req.body.email,[`${tab}.main.value`]:{defaultName:req.body.currentFolder,editedName:req.body.currentFolder}},
        {$pull:{[`${tab}.main.$.value`]:{publicId:req.body.file}}},
        (err,data)=>{res.send("Deleted")}) 
        
    try { await cloudinary.uploader.destroy(req.body.file) } catch (error) { console.log(error) }  
}) 
 
// ---------------------------------------------------------------SendTo Folder--------------------------------------------------------------- //



route.post("/sendMultipleFiles",(req,res)=>{
   
   const tab=req.body.currentTab 
   const mapData=req.body.file

   mapData.map(data=>{    

    Model.findOneAndUpdate( 
    {email:req.body.email,[`${tab}.main.value`]:{defaultName:req.body.folder,editedName:req.body.folder}},
    {$push:{[`${tab}.main.$.value`]:{Url:data.Url,defaultName:data.defaultName,editedName:data.editedName,publicId:data.publicId}}},
    {new:true},(err,data)=>{}) 

     Model.findOneAndUpdate( 
    {email:req.body.email,[`${tab}.main.value`]:{defaultName:req.body.currentFolder,editedName:req.body.currentFolder}},
    {$pull:{[`${tab}.main.$.value`]:{defaultName:data.defaultName,editedName:data.editedName}}},
    {new:true},
    (err,data)=>{console.log('removed')})  

    })

      res.send('Transfered Files')
})


route.post("/sendMultipleFiles/notes",(req,res)=>{
   
    const tab=req.body.currentTab 
    const mapData=req.body.file 
 
    mapData.map(data=>{ 
    

    Model.findOneAndUpdate( 
    {email:req.body.email,[`${tab}.main.value`]:{heading:req.body.folder,body:req.body.folder}},
    {$push:{[`${tab}.main.$.value`]:{heading:data.heading,body:data.body}}},
    {new:true},(err,data)=>{}) 

    Model.findOneAndUpdate( 
    {email:req.body.email,[`${tab}.main.value`]:{heading:req.body.currentFolder,body:req.body.currentFolder}},
    {$pull:{[`${tab}.main.$.value`]:{heading:data.heading,body:data.body}}},
    {new:true},
    (err,data)=>{console.log('removed')})  

    })

       res.send('Transfered Files')
 })


route.post("/deleteMultipleFiles",(req,res)=>{
   
    const tab=req.body.currentTab 
    const mapData=req.body.file
 
    mapData.map(data=>{
       
 
    Model.findOneAndUpdate( 
    {email:req.body.email,[`${tab}.main.value`]:{defaultName:req.body.currentFolder,editedName:req.body.currentFolder}},
    {$pull:{[`${tab}.main.$.value`]:{Url:data.Url,defaultName:data.defaultName,editedName:data.editedName,publicId:data.publicId}}},
    {new:true},
    (err,data)=>{console.log('removed')}) 
      
    })
    
    res.send('deleted Files')

    mapData.map(data=>{ try {  cloudinary.uploader.destroy(data.publicId)} catch (error) {console.log(error)}})
 
    })
 

route.post("/sendtofolders",(req,res)=>{
   
    const tab=req.body.currentTab
   
    Model.findOneAndUpdate( 
    {email:req.body.email,[`${tab}.main.value`]:{defaultName:req.body.folder,editedName:req.body.folder}},
    {$push:{[`${tab}.main.$.value`]:{Url:req.body.file.Url,defaultName:req.body.file.defaultName,editedName:req.body.file.editedName,publicId:req.body.file.publicId}}},
    {new:true},(err,data)=>{res.send('File Send')}) 

    Model.findOneAndUpdate( 
    {email:req.body.email,[`${tab}.main.value`]:{defaultName:req.body.currentFolder,editedName:req.body.currentFolder}},
    {$pull:{[`${tab}.main.$.value`]:{Url:req.body.file.Url,defaultName:req.body.file.defaultName,editedName:req.body.file.editedName,publicId:req.body.file.publicId}}},
    {new:true},
    (err,data)=>{console.log('removed')})  

     
 
})
// ---------------------------------------------------------------SendTo Folder Notes--------------------------------------------------------------- //

route.post("/sendtofoldersNotes",(req,res)=>{
   
    const tab=req.body.currentTab 
   
    Model.findOneAndUpdate( 
    {email:req.body.email,[`${tab}.main.value`]:{heading:req.body.folder,body:req.body.folder}},
    {$push:{[`${tab}.main.$.value`]:{heading: req.body.header,body:req.body.body}}},
    (err,data)=>{res.send('File Send')}) 
 
})
// ---------------------------------------------------------Cookies Apis------------------------------------------------------------------------ //

route.get("/jwt",(req,res)=>{ 
   try {
    const tokken_id=jwt.verify(req.cookies.jwt,process.env.SECRET_KEY)
    Model.find({email:tokken_id},(err,data)=>{ res.send(data);console.log(data[0].username,'data');user=data[0].username})
      
   } catch (error) {
    res.send('error')   

   } 
})

// ---------------------------------------------------------Login SignIn Apis---------------------------------------------------------------------- //
route.post("/user/sendConfirmation",async(req,res)=>{
   
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"abdullahrehan8118@gmail.com",
            pass:'123654789@qwerty'
        }
    })
   
    
    const mailoption={
        from:'abdullahrehan8118@gmail.com',
        to:"abdullahrehan786786@gmail.com",
        subject:"DataShare Verification",
        text:`Hello ${req.body.name} ! We are happy to know that you  want to create account in our website . And you are only one step far . Write this confirmation code :  ${code}`
    }

    transporter.sendMail(mailoption,(err,data)=>{console.log(data);})
 

})
  
route.post("/user/signupaccess",(req,res)=>{
 
    Model.find({email:req.body.email},(err,data)=>{res.send(data[0])})   

})


route.post("/user/SignIn",async(req,res)=>{

    console.log(req.body.confirmation_Code,code);

    if(req.body.confirmation_Code==code){
        
        Model.find({email:req.body.email},(err,data)=>{
 
            if(data[0]==undefined){
            
            const jwtTokken=jwt.sign({_id:req.body.email},process.env.SECRET_KEY)
    
            const insertNewUserModel=Model({
            username:req.body.name,
            email:req.body.email,
            password:req.body.password,
            messages:[{'main':[]}],
            imagefolder:[{'main':[]}],
            wordfolder:[{'main':[]}],
            pdffolder:[{main:[]}],
            viewAllImages:false,
            textDoc:[{main:[]}],
            token:'tokken',
            jwt:jwtTokken,
            folderPassword:'',
            recentFolders:[],
            profile:'',
            })
            insertNewUserModel.save()
            
            res.cookie("jwt",jwtTokken)
            res.send("Data Inserted")
            
        }
        
        else{res.send("User Already exisit")}
        
    })

    
    }
    
    else{console.log("denied")} 
    
})

route.post("/user/login",(req,res)=>{

    Model.find({email:req.body.email},(err,data)=>{

    if(data[0]!==undefined){

        if(data[0].password==req.body.password){

        const jwtTokken=jwt.sign({_id:req.body.email},process.env.SECRET_KEY)
        res.cookie("jwt",jwtTokken,{ maxAge: 1000 * 60 * 10* 20000, httpOnly: false,secure: false })
        res.send(data[0])

        }   
   
        else{
   
            res.send({msg:'password incorrect',data:[data[0].username,data[0].profile]})
   
        }
   
    }
    else{
    
        res.send({msg:"invalid email"});}
    }
    
    ) 
})

route.post("/user/resetpassword",(req,res)=>{
 

    if(req.body.accountPassword!==null && req.body.folderPassword!==null){
 
    Model.findOneAndUpdate({email:req.body.email},{password:req.body.accountPassword},(err,data)=>{console.log(data);})
    Model.findOneAndUpdate({email:req.body.email},{folderPassword:req.body.folderPassword},(err,data)=>{console.log(data);})
    
}
    else if(req.body.accountPassword!==null && req.body.folderPassword==null){
        
    Model.findOneAndUpdate({email:req.body.email},{password:req.body.accountPassword},(err,data)=>{console.log(data);})

}

    else if(req.body.accountPassword==null && req.body.folderPassword!==null){  

         Model.findOneAndUpdate({email:req.body.email},{folderPassword:req.body.folderPassword},(err,data)=>{console.log(data);})
    
    }
})

route.post("/user/deleteAccount",(req,res)=>{

     Model.findOneAndRemove({email:req.body.email},{new:true},(err,data)=>{res.send(data);}) 
     res.clearCookie('jwt', {domain: 'localhost', path: '/'})
 
})

route.get("/logouts",(req,res)=>{
    res.clearCookie('jwt', {domain: 'localhost', path: '/'})
    res.send('Cookie deleted 2')

})




module.exports=route 