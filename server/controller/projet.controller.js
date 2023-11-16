const Projet= require('../models/projet.model')
// renvoie tous les projets
exports.create=(req,res,next)=>{
    console.log(req.body)
    let projet = new Projet({
        name:req.body.name,
        shapes:JSON.stringify(req.body.shapes)
    })
    projet.save().
    then((projet)=>{
        res.json({
            message:"create",
            projet:projet
        })
    }).catch((error)=>{
        res.json({
            message:'erreur',
            response:false
        })
    })
   
}

// renvoie tous les projets
exports.getAll=(req,res,next)=>{
    Projet.find().then((projets)=>{
        res.json(projets)
    }).catch((error)=>{
        console.log("=== > error ",error)
    })
}

// met a jour un projet
exports.update=(req,res,next)=>{
    let data={
        name:req.body.name,
        shapes:JSON.stringify(req.body.shapes)
    }
    Projet.updateOne({_id:req.body._id},data).
    then(()=>{
        res.json({message:"update"})
    }).catch((error)=>{
        console.log("=== > ",error);
        res.json({message:"error"})
    })
}

// supprimer un projet
exports.delete=(req,res,next)=>{
    console.log(req.body);
    Projet.deleteOne({_id:req.body._id}).
    then(()=>{
        res.json({message:"delete"})
    }).catch((error)=>{
        console.log("=== > ",error);
        res.json({message:"error"})
    })
}