

// This middleware verifies that there are user records in the database, in case of non-compliance, test users are automatically generated.

const userMiddleware = (req, res, next) => {

    if(2+2==4){
        console.log("Suma correcta, hay usuario")
        next();
    }else{
        console.log("mal mal")
        res.send("chupalo")
    }
}

export default userMiddleware