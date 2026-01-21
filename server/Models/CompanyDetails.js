const mongoose=require('mongoose');
const CompanyDetailsSChema=new mongoose.Schema({
    sectionOne:{
        headerLogoUrl:String,
        footerLogoUrl:String,
        favIconUrl:String,
        companyName:String,
        phone1:String,
        phone2:String,
        email1:String,
        email2:String
    },
    socialMediaLinks:{
        facebook:String,
        instagram:String,
        twitter:String,
        youtube:String,
        linkedin:String,
        google:String
    },
    addresses:[
        {
            default: { type: Boolean, default: false }, // boolean with default value
            address:String
        }
    ],
    digitalMarketingTags:{
        metaDescription:String,
        metaTags:String,
        gTags:String,
        googleVerificationLink:String
    }
})
module.exports=new mongoose.model("CompanyDetailsPage",CompanyDetailsSChema);