const accessControl=(req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "https://fitnesspro-1.onrender.com");
    next();
}

export default accessControl