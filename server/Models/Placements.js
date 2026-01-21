const mongoose=require("mongoose");
const PlacementPageSchema=new mongoose.Schema({
     bannerSection:{
        title:String,
        subTitle:String,
        backgroundImageUrl:String
    },
    sectionOne:{
        title:String,
        images:[
            {
                imageUrl:String
            }
        ]
    },
    sectionTwo:{
         title:String,
         stories:[
            {
                imageUrl:String,
                name:String,
                role:String,
                companyLogoUrl:String,
                package:Number,
                description1:String,
                description2:String
            }
         ]
    }
})
module.exports=new mongoose.model("PlacementPage",PlacementPageSchema);