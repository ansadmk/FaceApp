const Replicate =require('replicate')
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
});
const extractFrames = require('gif-extract-frames')
 


module.exports={
    age:async (req,res)=>{
        const {imageurl}=req.body
        try {
        
            const input = {
                image: imageurl,
                target_age: "default"
            };
            
            const output = await replicate.run("yuval-alaluf/sam:9222a21c181b707209ef12b5e0d7e94c994b58f01c7b2fec075d2e892362f13c", { input });
            // const results = await extractFrames({
            //     input: output.data,
            //     output: `${Date.now()}.png`
            //   })
            //   console.log('number of frames', results)
              
              
            res.json({
                data:output
            })
        } catch (error) {
            res.json({
                data:error.message
            })
        }
    
    }
}