const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {

  const { prompt, size } = req.body;

  const imageSize =
    size == "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

    if(prompt=='' ||prompt==null ||prompt===''||prompt===null){
        res.status(400).json({success:false,error:"Invalid arguments"})
        return;
    }
    if(size=='' ||size==null ||size===''||size===null){
      res.status(400).json({success:false,error:"Invalid arguments"})
      return;
  }

  try {
    const response = await openai.createImage({
      prompt: "polar bear on ice real image",
      n: 1,
      size: imageSize,
    });

    const imageUrl = response.data.data[0].url;
    res.status(200).json({ success: true, data: imageUrl });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res
      .status(400)
      .json({ success: false, error: " The image could not be generated" });
      return;
  }
};

module.exports = { generateImage };
