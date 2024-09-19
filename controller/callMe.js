const responseSchema = {
  response : {
    200 : {
      properties : {
        message : {type : 'string'},
      },
      required : ['message']
    }
  }
}


const callMe = (app, options, done) => {
  app.get('/',{schema : responseSchema} ,(req, reply) => {
    return { 
        message: "call me o-o" 
    };
  });

  app.get('/:name',{schema : responseSchema} ,(req, reply) => {
    return { 
        message: `call me ${req.params.name}` 
    };
  });
  done();
};

export default callMe;
