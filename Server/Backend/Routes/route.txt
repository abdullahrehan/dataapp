const {OAuth2Client} = require('google-auth-library');const client=new OAuth2Client('419594361812-33f51cf3fkmlg1ca69h0r8g4v2sk5lkf.apps.googleusercontent.com');
const Model=require("../Model/Mongo.js")
const validator=require('email-validator')
const nodemailer = require('nodemailer');
var passport = require('passport');
const jwt=require("jsonwebtoken");
const express=require("express")
const multer=require("multer")
const path=require("path")
const fs=require("fs")
const Multer=require('../utils/multer')
const cloudinary=require('../utils/cloudinary')
const route=express.Router()
const app=express()
const code=Math.floor(Math.random() * (1000-9999 + 1)) + 9999
const HTMLtoDOCX = require('html-to-docx')

// var compression = require('compression')
// app.use(compression())

var user=null;
var uploadFolderTab=null;   
var uploadFolder=null;
var htmlDocx = require('html-docx-js');

route.post("/convert",async(req,res)=>{
 
    // var converted = / HTMLtoDOCX('<h2>Hello</h2>','<h2>Hello</h2>',{"margin":'0%'},'<h2>Hello</h2>')
    // saveAs(converted, 'test.docx');
    const docx = htmlDocx.asBlob('<h2>Hello</h2>');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=demo.docx`);
        res.setHeader('Content-Length',2);
        res.send(docx);

    // res.send(docx)
    console.log(docx)
    // console.log(req.body.data)

})

// route.get("/",(req,res)=>{
//     console.log('as')
//     const sendWebData=()=>{
//          Model.find( (err,data)=>{res.send(data);})}
//     sendWebData();
// // res.send('ok')
// })     

route.post("/nameverify",(req,res)=>{

    console.log("nameverify",req.body.name)

    Model.find( 
        {username:req.body.name},
        (err,data)=>{
          if(data.length!==0){
            //   console.log('Name already taken')
            //   console.log(data.length);
              res.send('not available')
  
            }
          else{
            //   console.log('Name Available');
              res.send('available')
            }
          
    })     
    
})
route.post("/emailverify",(req,res)=>{

    console.log("emailverify",req.body.email)

    Model.find( 
        {email:req.body.email},
        (err,data)=>{
          if(data.length!==0){
            //   console.log('email already taken')
            //   console.log(data)
              res.send('not available')


            }
          else{
            //   console.log('email Available')
              res.send('available')
            }
    })     
    
})

route.post("/ViewAllMode",(req,res)=>{

    // console.log("setViewAllMode",req.body.email)

    Model.find( 
        {email:req.body.email},
        (err,data)=>{
          
        const senddata=data[0].viewAllImages
    //   console.log(senddata)
        res.send(senddata)

    })     
})
 
route.post("/setViewAllMode",(req,res)=>{

    console.log("setViewAllMode",req.body.email,req.body.data)
    // console.log(req.body.data)
    Model.findOneAndUpdate( 
        {email:req.body.email},
        {viewAllImages:req.body.data},
        (err,data)=>{
          
    //   console.log(data)
        res.send('ok')

    })     
})

route.post("/setMainfolder",(req,res)=>{
    
    const main_Folder={name:'MainFolder',value:[],secure:false}
console.log(req.body.email,'req.body.email');
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
   
    // fs.mkdirSync(path.join(__dirname,`../../../Client/public/Database/${req.body.name}/profilePic`),(err)=>{console.log(err)})
    // fs.mkdirSync(path.join(__dirname,`../../../Client/public/Database/${req.body.name}/imagefolder`),(err)=>{console.log(err)})
    // fs.mkdirSync(path.join(__dirname,`../../../Client/public/Database/${req.body.name}/wordfolder`),(err)=>{console.log(err)})
    // fs.mkdirSync(path.join(__dirname,`../../../Client/public/Database/${req.body.name}/pdffolder`),(err)=>{console.log(err)})

    // fs.mkdirSync(path.join(__dirname,`../../../Client/public/Database/${req.body.name}/imagefolder/MainFolder`),(err)=>{console.log(err)})
    // fs.mkdirSync(path.join(__dirname,`../../../Client/public/Database/${req.body.name}/wordfolder/MainFolder`),(err)=>{console.log(err)})
    // fs.mkdirSync(path.join(__dirname,`../../../Client/public/Database/${req.body.name}/pdffolder/MainFolder`),(err)=>{console.log(err)})
 
    })


route.post("/recentFoldersData",(req,res)=>{

    // console.log(req.body.currentTab)
    Model.find( 
        {email:req.body.email},
        (err,data)=>{
            // const findIndex=data/
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
        //  console.log(data.recentFolders[data.recentFolders.findIndex(data=>data.name===tab)].value)
        })     
    }

      })
})


route.post("/setrecentFolders",(req,res)=>{

    const tab=req.body.currentTab    
    const folder=req.body.folderName
    const secure=req.body.secure 

    // console.log(req.body.newList)

    Model.findOneAndUpdate( 
        {email:req.body.email,"recentFolders.name":tab},
        {$set:{[`recentFolders.$.value`]:req.body.newList}},
        {new:true},
        (err,data)=>{
         res.send('ok')
        })     
  
 
})
route.post("/deletRecentFolders",(req,res)=>{

    const tab=req.body.currentTab    
    const folder=req.body.folderName
    
    
    Model.findOneAndUpdate( 
        {email:req.body.email,"recentFolders.name":tab},
        {$pull:{[`recentFolders.$.value`]:{name:folder}}},
        {new:true},
        (err,data)=>{
            // res.send(data)
        })     


}
)
// ---------------------------------------------------------------Folder Api ---------------------------------------------------------------

route.post("/folders",(req,res)=>{

    const email=req.body.email
    const tab=req.body.tab
// console.log(email,tab);
    Model.find( 
        {email:email},
        (err,data)=>{

        const folder=data[0][tab].main
        const sendData=folder.map((data)=>{return {name:data.name,secure:data.secure}})
        res.send(sendData);
            // console.log(sendData)
        })      
})
// ---------------------------------------------------------------Folder Api ---------------------------------------------------------------

route.post("/folderStatus",(req,res)=>{

    const email=req.body.email
    const tab=req.body.currentTab
    const folderName=req.body.currentFolder

    Model.find( 
        {email:email},
        (err,data)=>{

        const folder=data[0][tab].main.find(data=>data.name===folderName).secure
        res.send(folder);
      

        })      
})


// ---------------------------------------------------------------Create Folder---------------------------------------------------------------

route.post("/createfolder",(req,res)=>{
    
    const tab=req.body.MainfolderName
    const files={defaultName: req.body.newfolderName , editedName: req.body.newfolderName}
    const text={heading: req.body.newfolderName , body: req.body.newfolderName}

    const insertedValue=tab==='textDoc' || tab==='messages' ? text : files

    Model.findOneAndUpdate( 
        {email:req.body.email,[`${tab}.main.name`]:"MainFolder"},
        {$push:{[`${tab}.main`]:{name:req.body.newfolderName,value:[ insertedValue ],secure:false}}},
        {new:true},
        (err,data)=>{
            // res.send(data)
        }) 

// console.log("/createfolder")
//         if(req.body.MainfolderName!=="messages" || req.body.MainfolderName!=="textDoc" ){
//             fs.mkdirSync(path.join(__dirname,`../../Client/public/Database/${user}/${req.body.MainfolderName}/${req.body.newfolderName}`),
//             (err)=>{console.log(err)})
//             console.log(`../../../Client/public/Database/${user}/${req.body.MainfolderName}/${req.body.newfolderName}`)

//         }

    })


// ---------------------------------------------------------------Delete Folders---------------------------------------------------------------

// -------------Delete Folders  -------------
route.post("/deleteFolder",(req,res)=>{
 
    if(req.body.folderName!=='MainFolder'){
   
    const tab=req.body.currentTab
        const paths=path.join(__dirname,`../../../Client/public/Database/${user}/${req.body.currentTab}/${req.body.folderName}`)
        
    Model.findOneAndUpdate( 
        {email:req.body.email,[`${tab}.main.name`]:"MainFolder"},
        {$pull:{[`${tab}.main`]:{name:req.body.folderName}}},
        {new:true},
        (err,data)=>{
            // res.send(data)
        }) 
    
    // if(tab!=='messages'){
    //     fs.existsSync(paths) ?
    //     fs.rmdirSync(paths, { recursive: true })
    //     :null
    //    }
    }
}) 


// ---------------------------------------------------------------Upload Api---------------------------------------------------------------


route.post("/ImageData",(req,res)=>{

    const email=req.body.email
    const tab=req.body.currentTab
    const folderName=req.body.currentFolder

    Model.find( 
        {email:email},
        (err,data)=>{ 

        const folder=data[0][tab].main.find(folder=>folder.name===folderName).value
        res.send(folder);
    

        })      
})

route.post("/ProfilePicture",(req,res)=>{

    Model.find( 
        {email:req.body.email},
        (err,data)=>{ 

        const folder=data[0].profile
        // console.log(folder)
        // console.log(data[0])
        res.send(folder);
    

        })      
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
              {new:true},
              (err,data)=>{
    //    console.log('data')
            if(index===req.files.length-1){ 
                res.send('uploaded')
            }  
     }) 
    //  res.send("uploaded")
     
    })
 
    
})

// route.post("/uploads",(req,res)=>{
   
//     const Storage=multer.diskStorage({
//         destination:`./Client/public/Database/${user}/${uploadFolderTab}/${uploadFolder}`, 
//         // destination:`./images`, 
//         filename:(req,file,cb)=>{cb(null,'fileShare'+Date.now()+path.extname(file.originalname))}
//     })
    
//     const file=multer({storage:Storage}).array("uploadedFile",10)
    
//     file(req, res,(err)=> {
//         // if (err) return next(err)
       
//         const tab=req.body.tab

//         console.log(req.files[0])
//         req.files.map(data=>{

//         // console.log(data)/
//           const filename={defaultName:data.filename,editedName:''}

//           Model.findOneAndUpdate( 
//               {email:req.body.email,[`${tab}.main.value`]:{defaultName:req.body.folder,editedName:req.body.folder}},
//               {$push:{[`${tab}.main.$.value`]:filename}},
//               {new:true},
//               (err,data)=>{console.log("uploaded")
//      })  
        
//     })
//     res.send('uploaded Files')
//     }) 
    
// })
route.post("/editedImageName",(req,res)=>{
    
 
 
        Model.find({email:req.body.email},(err,data)=>{

            const folderArray=data[0][req.body.tab].main
            const findarray=folderArray.find(findData=>findData.name==req.body.folder)
            const findImage=findarray.value.find(findData=>findData.defaultName===req.body.imagename)           
            findImage.editedName=req.body.newName
           
            const Folderdata=[...folderArray]
              
            Model.findOneAndUpdate({email:req.body.email},{$set:{[req.body.tab]:{ main: Folderdata }}},{new:true} ,(err,data)=>{
            
            res.send('name Changed')})
                })
     
})

route.post("/uploadProfile",Multer.single("uploadedFile"),async(req,res)=>{

        // console.log('/uploadProfiles',req.body.prevImage)
        // try {
            // await cloudinary.uploader.destroy(req.body.prevImage)   
            // await cloudinary.uploader.destroy(req.file.url)   
    //  console.log('deleted')  
        // } catch (error) {
        //     console.log(error)
        // }   
        const result=await cloudinary.uploader.upload(req.file.path)
        // console.log(req.body.email)
        
        Model.findOneAndUpdate({email:req.body.email},{$set:{profile:{defaultName:req.file.originalname,url:result.secure_url,imageId:result.public_id}}},(err,data)=>{
 
    res.send(result.secure_url)
    // console.log(result.secure_url)
})

})
    

// ---------------------------------------------------------------Txt Messages Api---------------------------------------------------------------

// -------------Send Messages Data-------------
route.post("/txt",(req,res)=>{

  Model.find({email:req.body.email},(err,data)=>{
      const messages=data[0].messages.main
      res.send(messages[messages.findIndex(data=>data.name===req.body.folder)])
    })

})

// -------------Upload Messages -------------
route.post("/uploadTxt",(req,res)=>{

const msg={heading:req.body.heading,body:req.body.body,color:req.body.color}
 
const messag='messages'
    console.log('enter uploadTxt')
    Model.findOneAndUpdate(
    {email:req.body.email,"messages.main.value":{heading:req.body.folder,body:req.body.folder}},
    {$push:{[`${messag}.main.$.value`]: msg }},{new:true},
    (err,data)=>{res.send(data)})
    
})
 
// -------------Update Message -------------
route.post("/txt/update",(req,res)=>{
              
    Model.find( 
        {email:req.body.email},
        (err,data)=>{
        const Data=data[0].messages.main
        const folderData=Data[Data.findIndex(data=>data.name===req.body.currentFolder)]
        console.log(req.body.oldheading)
        const UpdatedValue=folderData.value.find(data=>data.heading===req.body.oldheading)    
        console.log(UpdatedValue)

        UpdatedValue.body=req.body.body
        UpdatedValue.heading=req.body.heading
          
        Model.findOneAndUpdate( 
        {email:req.body.email},
        {$set:{messages:{main:Data}}},
        {new:true},
        (err,data)=>{res.send("message updated")})

        })
})

    route.post("/delete/txt",(req,res)=>{
        console.log(req.body.heading,req.body.body)
    Model.findOneAndUpdate( 
        {email:req.body.email,'messages.main.value':{heading: "MainFolder", body: "MainFolder"}},
        {$pull:{'messages.main.$.value':{heading:req.body.heading,body:req.body.body}}},
        {new:true},
        (err,data)=>{res.send("deleted");console.log('deleted')}) 
   
    
}) 

// ---------------------------------------------------------------Notes Tab Apis---------------------------------------------------------------

// -------------TextData-------------

route.post("/notes",(req,res)=>{

    Model.find({email:req.body.email},(err,data)=>{
        const notes=data[0].textDoc.main
        res.send(notes[notes.findIndex(data=>data.name===req.body.folder)])
        // console.log(notes[notes.findIndex(data=>data.name===req.body.folder)])
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

route.post("/notesImages",(req,res)=>{
  
    
    const Storage=multer.diskStorage({
        destination:`../Client/public/Database/${user}/textDoc/Images`, 
        filename:(req,file,cb)=>{cb(null,'fileShare'+Date.now()+path.extname(file.originalname))}
    })

    const file=multer({storage:Storage}).single("image")
                  
    file(req, res, function (err) {
         if (err) return next(err)
         Model.findOneAndUpdate({email:req.body.email},{new:true},(err,data)=>{
             res.send('uploaded')
      
      }) 
    })


    })

    // -------------Update Notes -------------

    route.post("/notes/update",(req,res)=>{
            
    Model.find( 
        {email:req.body.email},
        (err,data)=>{
        const Data=data[0].textDoc.main
        const folderData=Data[Data.findIndex(data=>data.name===req.body.currentFolder)]
        const UpdatedValue=folderData.value.find(data=>data.heading===req.body.oldheading)    

        UpdatedValue.body=req.body.body
        UpdatedValue.heading=req.body.heading
        console.log(req.body.heading,UpdatedValue)
        Model.findOneAndUpdate( 
        {email:req.body.email},
        {$set:{textDoc:{main:Data}}},
        {new:true},
        (err,data)=>{res.send('updated')})

        })
    })
// --------------------------------------------------------------- folders Password Info---------------------------------------------------------------

route.post("/folderPassword",(req,res)=>{
 
    const folder_Password=Model.findOneAndUpdate({email:req.body.email},
    {$set:{folderPassword:req.body.folderPassword}},(err,data)=>{console.log(data)})   
 
})
route.post("/setFoldertoSecure",(req,res)=>{
    const tab=req.body.tab

    Model.findOneAndUpdate( 
        {email:req.body.email,[`${tab}.main.name`]:req.body.currentFolder},
        {$set:{[`${tab}.main.$.secure`]:req.body.secure}},
        {new:true},
        (err,data)=>{res.send('ok')}) 

})

// ---------------------------------------------------------------Delete Files---------------------------------------------------------------

// -------------Delete Files imagefolder -------------
route.post("/delete",async(req,res)=>{
  
    const tab=req.body.currentTab
    console.log(req.body.file)
    Model.findOneAndUpdate( 
        {email:req.body.email,[`${tab}.main.value`]:{defaultName:req.body.currentFolder,editedName:req.body.currentFolder}},
        {$pull:{[`${tab}.main.$.value`]:{publicId:req.body.file}}},
        {new:true},
        (err,data)=>{res.send("Deleted")}) 
        
    try {
        await cloudinary.uploader.destroy(req.body.file)
   
    } catch (error) {
        console.log(error)
    } 
    // res.json(user) 



    
}) 

// route.post("/delete",(req,res)=>{
  
//     const tab=req.body.currentTab
//     const paths=path.join(__dirname,`../../Client/public/Database/${user}/${req.body.currentTab}/${req.body.currentFolder}/${req.body.file}`)
//     // try {
//         req.body.sendtofile===false && fs.existsSync(paths) ?
//         // upload
    
//         fs.unlinkSync(paths, { recursive: true },
//         (err,data)=>console.log(data,'data'))
        
//         :null
//     // } catch (error) {
//         // console.log('error is ' ,error)
//     // }


//     Model.findOneAndUpdate( 
//     {email:req.body.email,[`${tab}.main.value`]:{defaultName:req.body.currentFolder,editedName:req.body.currentFolder}},
//     {$pull:{[`${tab}.main.$.value`]:{defaultName:req.body.file}}},
//     {new:true},
//     (err,data)=>{res.send("Deleted")}) 

 


   
    
// }) 
// ---------------------------------------------------------------SendTo Folder---------------------------------------------------------------



route.post("/sendMultipleFiles",(req,res)=>{
   
   const tab=req.body.currentTab
    // console.log(req.body.file,req.body.folder,req.body.currentFolder)
   const mapData=req.body.file
   console.log('enter',mapData)

    mapData.map(data=>{
        console.log('enter2')
    
    // const oldpath=path.join(__dirname,`../../Client/public/Database/${user}/${req.body.currentTab}/${req.body.currentFolder}/${data.defaultName}`)
    // const newpath=path.join(__dirname,`../../Client/public/Database/${user}/${req.body.currentTab}/${req.body.folder}/${data.defaultName}`)
 
     Model.findOneAndUpdate( 
     {email:req.body.email,[`${tab}.main.value`]:{defaultName:req.body.folder,editedName:req.body.folder}},
     {$push:{[`${tab}.main.$.value`]:{Url:data.Url,defaultName:data.defaultName,editedName:data.editedName,publicId:data.publicId}}},
     {new:true},(err,data)=>{}) 

     Model.findOneAndUpdate( 
        {email:req.body.email,[`${tab}.main.value`]:{defaultName:req.body.currentFolder,editedName:req.body.currentFolder}},
        {$pull:{[`${tab}.main.$.value`]:{defaultName:data.defaultName,editedName:data.editedName}}},
        {new:true},
        (err,data)=>{console.log('removed')})  
   
    //  fs.rename(oldpath, newpath, function (err) {
    //  if (err) throw err 
    //  console.log('Successfully renamed - AKA moved!')})
      })

      res.send('Transfered Files')
})


route.post("/sendMultipleFiles/notes",(req,res)=>{
   
    const tab=req.body.currentTab
     // console.log(req.body.file,req.body.folder,req.body.currentFolder)
    const mapData=req.body.file
    console.log('enter',mapData)
 
     mapData.map(data=>{
         console.log('enter2')
      
  
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
         (err,data)=>{console.log('removed')
    }) 
      
    })
       res.send('deleted Files')
 
       mapData.map(data=>{
        try {  cloudinary.uploader.destroy(data.publicId)}
        catch (error) {console.log(error)} 
       })
 
    })


//  route.post("/deleteMultipleFiles",(req,res)=>{
   
//     const tab=req.body.currentTab
//      // console.log(req.body.file,req.body.folder,req.body.currentFolder)
//     const mapData=req.body.file
//     // console.log('enter',mapData)
    
//      mapData.map(data=>{
     
// const paths=path.join(__dirname,`../../Client/public/Database/${user}/${req.body.currentTab}/${req.body.currentFolder}/${data.defaultName}`)

// if(fs.existsSync(paths)){
      
        
//             fs.unlinkSync(paths, { recursive: true },
//             (err,data)=>console.log('remove Image from folder'))
            
//             }
//             console.log('path not exsist')
       
 
//       Model.findOneAndUpdate( 
//          {email:req.body.email,[`${tab}.main.value`]:{defaultName:req.body.currentFolder,editedName:req.body.currentFolder}},
//          {$pull:{[`${tab}.main.$.value`]:{defaultName:data.defaultName,editedName:data.editedName}}},
//          {new:true},
//          (err,data)=>{console.log('removed')
//     }) 
      
//        })
//        res.send('deleted Files')
//  })

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

    // const oldpath=path.join(__dirname,`../../Client/public/Database/${user}/${req.body.currentTab}/${req.body.currentFolder}/${req.body.file.defaultName}`)
    // const newpath=path.join(__dirname,`../../Client/public/Database/${user}/${req.body.currentTab}/${req.body.folder}/${req.body.file.defaultName}`)
   
    // fs.rename(oldpath, newpath, function (err) {
    // if (err) throw err 
    // console.log('Successfully renamed - AKA moved!')})
 
})
// ---------------------------------------------------------------SendTo Folder Notes---------------------------------------------------------------

route.post("/sendtofoldersNotes",(req,res)=>{
   
    const tab=req.body.currentTab
    console.log(tab,req.body.folder,)
   
    Model.findOneAndUpdate( 
    {email:req.body.email,[`${tab}.main.value`]:{heading:req.body.folder,body:req.body.folder}},
    {$push:{[`${tab}.main.$.value`]:{heading: req.body.header,body:req.body.body}}},
    {new:true},(err,data)=>{res.send('File Send')}) 
 
})
// ---------------------------------------------------------Cookies Apis----------------------------------------------------------------------

route.get("/jwt",(req,res)=>{
//  console.log('jwt')
   try {
    const tokken_id=jwt.verify(req.cookies.jwt,process.env.SECRET_KEY)
    Model.find({email:tokken_id},(err,data)=>{ res.send(data);console.log(data[0].username,'data');user=data[0].username})
      
   } catch (error) {
    res.send('error')   
    // console.log(error)

   } 
})

// ---------------------------------------------------------Login SignIn Apis----------------------------------------------------------------------
route.post("/user/sendConfirmation",async(req,res)=>{
   
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"abdullahrehan8118@gmail.com",
            pass:'123654789@qwerty'
        }
    })
  
    console.log(code);
    console.log(req.body.name);
    
    const mailoption={
        from:'abdullahrehan8118@gmail.com',
        to:"abdullahrehan786786@gmail.com",
        subject:"DataShare Verification",
        text:`Hello ${req.body.name} ! We are happy to know that you  want to create account in our website . And you are only one step far . Write this confirmation code :  ${code}`
    }

    transporter.sendMail(mailoption,(err,data)=>{console.log(data);})
    // console.log(req.body.confirmation_Code);

    })
  
    route.post("/user/signupaccess",(req,res)=>{
        console.log('data[0]')
 
        Model.find({email:req.body.email},(err,data)=>{
           
        res.send(data[0])
        console.log('data[0]')
        
    })   
    })


route.post("/user/SignIn",async(req,res)=>{

    console.log(req.body.confirmation_Code,code);
    if(req.body.confirmation_Code==code){
        console.log('Acess'); 
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
            // fs.mkdirSync(path.join(__dirname,`../../../Client/public/Database/${req.body.name}`),(err)=>{console.log(err)})
            res.send("Data Inserted")
            }
            else{res.send("User Already exisit")}
        })

    }else{
        console.log("denied");
    } 
    
})

route.post("/user/login",(req,res)=>{
    Model.find({email:req.body.email},(err,data)=>{
        // console.log(data);

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
    else{res.send({msg:"invalid email"});}
    }) 
})

route.post("/user/resetpassword",(req,res)=>{

    console.log(req.body.accountPassword,'as',req.body.folderPassword);

    if(req.body.accountPassword!==null && req.body.folderPassword!==null){
    console.log('condition1');
      Model.findOneAndUpdate({email:req.body.email},{password:req.body.accountPassword},(err,data)=>{console.log(data);})
     Model.findOneAndUpdate({email:req.body.email},{folderPassword:req.body.folderPassword},(err,data)=>{console.log(data);})
    }
    else if(req.body.accountPassword!==null && req.body.folderPassword==null){
        console.log('condition2');

          Model.findOneAndUpdate({email:req.body.email},{password:req.body.accountPassword},(err,data)=>{console.log(data);})
    }
    else if(req.body.accountPassword==null && req.body.folderPassword!==null){
        console.log('condition3');

         Model.findOneAndUpdate({email:req.body.email},{folderPassword:req.body.folderPassword},(err,data)=>{console.log(data);})
    }
})

route.post("/user/deleteAccount",(req,res)=>{

     Model.findOneAndRemove({email:req.body.email},{new:true},(err,data)=>{res.send(data);})
    //  fs.unlinkSync(`../../../Client/public/Database/${req.body.name}`,(err,data)=>{console.log(data);})
     res.clearCookie('jwt', {domain: 'localhost', path: '/'})
    // res.send('deleted')/
    })

route.get("/logouts",(req,res)=>{
    res.clearCookie('jwt', {domain: 'localhost', path: '/'})
    res.send('Cookie deleted 2')
    console.log('Cookie deleted 2')

})

// route.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

// route.get('/google/callback',passport.authenticate('google',{failureRedirect:'/login'}),(req, res)=>{res.end('Logged in!')})

// route.post("/google",(req,Res)=>{

    
//     const {tokenId}=req.body
//     client.verifyIdToken({idToken:tokenId,audience:'419594361812-33f51cf3fkmlg1ca69h0r8g4v2sk5lkf.apps.googleusercontent.com'})
//     .then((res)=>{

//     Model.find({email:`${email}`},(err,data)=>{
//     if(data[0]==undefined){

//         const inserting=Model({
//         username:name,
//         email:email,
//         filename:[""],
//         messages:[""],
//         token:tokenId,
//         })
//         inserting.save() 
//     }

//     else{console.log("User Already existed");res.send("User Already existed")}})
//     Res.json(res.payload)})
// }) 



module.exports=route 