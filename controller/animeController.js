// const animeController = (app,options,done) =>{
//     app.get('/', async (req,reply)=>{
//         const [res] = await app.pq.query('select * from anime');
//         return {res};
//     });
//     done();
// };


// export default animeController;

const postSchema = {
    body : {
        properties : {
          anime : {type : 'object'},
        },
        required : ['anime']
    },
    response : {
        200 : {
          status : {type:'number'}
        }
    }    
};

const animeController = (app, options, done) => {
    app.get('/', async (req, reply) => {
        try {
            const { rows } = await app.pg.query(`
                SELECT  name, genre, "like", dislike, rating from anime limit 30;   
            `);
            reply.send({ rows });
        } catch (err) {
            console.error(err);
            reply.code(500).send({ error: 'Database query failed' });
        }
    });



    // sample json payload:
    // {
    //     "anime":{
    //         "name": "king100",
    //         "genre":  ["Action", "Sci-Fi", "Adventure", "Comedy", "Drama", "Shounen"],
    //         "like": 99999,
    //         "dislike": 0,
    //         "rating": 10.0,
    //         "image": "https://images.unsplash.com/photo-1646385890665-09e99c472d3d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //         "source": "https://images.unsplash.com/photo-1646385890665-09e99c472d3d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //     }
    // }
    // app.post('/' ,async (req, reply) => {
    //     const {anime} = req.body;
    //     try {
    //         await app.pg.query(`
    //             Insert into anime(name,genre,"like",dislike,rating,image,source) 
    //             VALUES ($1, $2, $3, $4, $5, $6, $7) 
    //         `,[anime.name,anime.genre,anime.like,anime.dislike,anime.rating,anime.image,anime.source]);
    //         return {status:200};
    //     } catch (err) {
    //         console.error(err);
    //         reply.code(500).send({ error: err });
    //     }
    // });


    app.post('/' ,{schema:postSchema}, async (req, reply) => {
        const {anime} = req.body;
        try {
            await app.pg.query(`
                Insert into anime(name,genre,"like",dislike,rating,image,source) 
                VALUES ($1, $2, $3, $4, $5, $6, $7) 
            `,[anime.name,anime.genre,anime.like,anime.dislike,anime.rating,anime.image,anime.source]);
            return {status:200};
        } catch (err) {
            console.error(err);
            reply.code(500).send({ error: err });
        }
    });
    done();
};

export default animeController;




