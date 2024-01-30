const errorMiddleware = (err,req,res,next) => {
    console.log("error");
    const statuscode = res.statuscode ? res.statuscode: 500;
    res.status(statuscode);
    res.json({message: err.message,stack:process.env.NODE_ENV === 'development' ? err.stack : null})
}

module.exports = errorMiddleware;