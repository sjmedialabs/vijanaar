const mongoose=require("mongoose");
const HomePageSchema=new mongoose.Schema({
   bannerSection: [
        {
            title: { type: String },
            titleVisible: { type: Boolean, default: true },

            subTitle: { type: String },
            subTitleVisible: { type: Boolean, default: true },

            description: { type: String },
            descriptionVisible: { type: Boolean, default: true },

            videoUrl: { type: String },
            backgroundImageUrl: { type: String },

            buttonsVisible: { type: Boolean, default: true } // controls all static buttons visibility
        }
    ],
    sectionOne:{
        title:String,
        subTitle:String,
        images:[
            {
                imageUrl:String
            }
        ]
    },
    sectionTwo:{
         title:String,
         subTitle:String
    },
    sectionThree:{
        title:String,
        subTitle:String,
        points:[
            {
                title:String,
                description:String
            }
        ],
        imageUrl:String
    },
    sectionFour:{
       title:String,
       subTitle:String,
       highlights:[
        {
            imageUrl:String,
            title:String,
            description:String
        }
       ]
    },
    sectionFive:{
        title:String,
        subTitle:String
    },
    sectionSix:{
        title:String,
        subTitle:String
    },
    sectionSeven:{
        value1:String,
        description1:String,
        value2:String,
        description2:String,
        value3:String,
        description3:String,
        value4:String,
        description4:String,
    },
    sectionEight:{
        title:String,
        subTitle:String,
        images:[
            {
                imageUrl:String
            }
        ]
    }
    
})
module.exports=new mongoose.model("HomePage",HomePageSchema);