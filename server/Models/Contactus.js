const mongoose=require('mongoose');
const ContactUsPageSchema=new mongoose.Schema({
     bannerSection:{
        title:String,
        subTitle:String,
        backgroundImageUrl:String
    },
    sectionOne:{
        title:String,
        description:String,
        googleMapEmbdedLink:String
    }
})
module.exports=new mongoose.model("ContactUsPage",ContactUsPageSchema)