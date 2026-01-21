const mongoose=require("mongoose");
const TestimonialSchema=new mongoose.Schema({
    bannerSection:{
        title:String,
        subTitle:String,
        backgroundImageUrl:String
    },
    sectionOne:{
        title:String,
        subTitle:String,
        testimonials:[
            {
                imageUrl:String,
                name:String,
                role:String,
                description:String
            }
        ]
    }
})
module.exports=new mongoose.model("TestimonialsPage",TestimonialSchema)