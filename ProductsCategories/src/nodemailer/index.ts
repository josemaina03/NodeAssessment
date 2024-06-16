import nodemailer from 'nodemailer'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname,"../../.env")})
import ejs from 'ejs'


///Step 1 create a configuration object

let config= {
 host: "smtp.gmail.com",
 service:"gmail",
 port:587,
 auth:{
    user:process.env.EMAIL,
    pass:process.env.PASS
 }
}

///step 2 is create a transporter
function createTransporter(config:any){
    return nodemailer.createTransport(config)
}
//step 3 send Email

async function sendEmail(messageOption:any){
    let transporter= createTransporter(config)
    await transporter.verify()

    await transporter.sendMail(messageOption, (err: any,info: any)=>{
        if(err){
            console.log(err);
            
        }

        console.log(info);
        
    })
}




// sendEmail(messageOptions)

ejs.renderFile("../../Templates/register.ejs", {name:"Joseph Maina"}, (err,data)=>{
  
    let messageOptions={
        to:process.env.EMAIL,
        from:process.env.EMAIL,
        cc:'',
        bcc:[],
        subject:"Testing My Shopping website",
        html:data
    }
    sendEmail(messageOptions)
})