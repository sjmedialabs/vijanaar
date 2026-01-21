const mongoose=require("mongoose");
const AboutUsPageSchema=new mongoose.Schema({
    bannerSection:{
        title:String,
        subTitle:String,
        backgroundImageUrl:String
    },
    sectionOne:{
        title:String,
        description1:String,
        description2:String
    },
    sectionTwo:{
        title:String,
        points:[
            {
                title:String,
                description:String
            }
        ]
    },
    sectionThree:[
        {
        title:String,
        imageUrl:String,
        description:String
      }
    ]
})
module.exports=new mongoose.model("AboutusPage",AboutUsPageSchema);