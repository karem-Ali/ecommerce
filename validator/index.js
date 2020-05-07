exports.userSignupValidator=(req,res,next)=>{
    req.check('name','Name  is required').notEmpty()
    req.check('email','email must be between 3 to 32 chracter')
    .matches(/.+\@.+\..+/)
    .withMessage('Email must contain @')
    .isLength({
        min:4 ,
        max:32
    })
    req.check('password','password is required').notEmpty()
    req.check('password')
    .isLength({min:6})
    .withMessage('password has at least 6 digits ')
    .matches(/\d/)
    .withMessage('password must contain at least 1 digit ')
    // to grap all errors 
    const errors =req.validationErrors()
    if(errors){
        const firstError= errors.map(error=>error.msg)[0]
        return res.status(400).json({error:firstError})
    }
    // any time u use a middleware you should have a next
    next()
}