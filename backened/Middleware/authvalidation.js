const joi=require('joi');

const singupValidation=(req,resp,next)=>{
    const Schema = joi.object({
        name:joi.string().min(3).max(100).required(),
        email:joi.string().email().required(),
        password:joi.string().min(4).max(100).required()
        });
        const {error}=Schema.validate(req.body);
        if(error){
            return resp.status(400)
            .json({message:"Bad Request",error})
        }
        next();
}
const loginValidation=(req,resp,next)=>{
    const Schema = joi.object({
        //name:joi.string().min(3).max(100).required(),
        email:joi.string().email().required(),
        password:joi.string().min(4).max(100).required()
        });
        const {error}=Schema.validate(req.body);
        if(error){
            return resp.status(400)
            .json({message:"Bad Request",error})
        }
        next();
}
module.exports = {
    singupValidation,loginValidation
}