const express = require('express');
const nodemailer = require('nodemailer');
const{google}= require('googleapis');
const router = express.Router();  


router.post('/send-email',(req,res)=>{
    const{name, email,phone,message}=req.body
    const contentHtml=`
    <h1>Formulario de nodemailer</h1>
    <ul>
        <li>name: ${name} <li>
        <li>name: ${email} <li>
        <li>name: ${phone} <li>
    </ul>
    <p>${message}</p>
`;

const CLIENT_ID="127038509627-tbvecp500j6cnnhntp2lj2qgdn7uv1el.apps.googleusercontent.com";
const CLIENT_SECRET="3rTxwgS2L-z79sa2nR3Oy9wI";
const REDIRECT_URI="https://developers.google.com/oauthplayground";
const REFRESH_TOKEN="1//04d29Hkd-pn78CgYIARAAGAQSNwF-L9IrDcA2gmCK1yo2LN1LwmlorUdW-Rt7Sspes5yWcrge_DapfnQDj7Sn5zbBl13f-XwtcyE";
const oAuth2cliente = new google.auth.OAuth2( 
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
    );

 oAuth2cliente.setCredentials({refresh_token:REFRESH_TOKEN});
 
 async function sendMail(){
     try{
        const accessToken= await oAuth2cliente.getAccessToken()
        const transporter= nodemailer.createTransport({
             service: "gmail",
             auth:{
                 type:"Oauth2",
                 user: "elianacortez27@gmail.com",
                 clientId:CLIENT_ID,
                 clientSecret:CLIENT_SECRET,
                 refreshToken:REFRESH_TOKEN,
                 accessToken:accessToken
             },

         });
         const mailOptions={
             from:"Pagina Web nodemailer<elianacortez27@gmail.com>",
             to:"lunalebizkit@gmail.com",
             subject:"nodemailer Prueba",
             html:contentHtml, 
         };

         const result = await transporter.sendMail(mailOptions);
         return result


     }catch(err){
         console.log(err);
     }
    
 } 
sendMail()
 .then((result)=>res.status(200).send('enviado'))
 .catch((error)=> console.log(error.message));
});



module.exports=router;