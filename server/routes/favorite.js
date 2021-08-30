const { response } = require('express');
const express = require('express');
const { Favorite } = require('../models/Favorite');
const router = express.Router();

router.post('/favoriteNumber', (req, res)=>{

    //mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({"movieId": req.body.movieId})
        .exec((err, info)=>{
            if(err) return res.status(400).send(err)
            res.status(200).json({success:true, favoriteNumber: info.length})
        })
})

router.post('/favorited', (req, res)=>{

    // 내가 이 영화를 favorite 리스트에 넣었는 지 정보를 DB에서 가져오기
    
    //mongoDB에서 favorite 숫자를 가져오기
    Favorite.find({"movieId": req.body.movieId, "userFrom":req.body.userFrom })
        .exec((err, info)=>{
            if(err) return res.status(400).send(err)
            let result = false;

            if (info.length !==0){
                result=true
            }
            res.status(200).json({success:true, favorited: result})
        })
})

router.post('/removeFromFavorite', (req, res)=>{

    // 프론트에서 정보 지워야함
    Favorite.findOneAndDelete({movieId:req.body.movieId, userFrom:req.body.userFrom})
    .exec((err, doc) =>{
        if(err) return res.status(400).send(err)
        console.log(doc)
        res.status(200).json({success:true, doc})
    })
})


router.post('/addToFavorite', (req, res)=>{

    // 프론트에서 정보 받아서 DB에 넣어주면 됨.

    const favorite = new Favorite(req.body)
    favorite.save((err, doc)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({success:true})
    })

})

router.post('/getFavorite', (req, res)=>{

    Favorite.find({'userFrom': req.body.userFrom})
    .exec((err,favorites)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({success:true, favorites})
    })
})



module.exports = router;