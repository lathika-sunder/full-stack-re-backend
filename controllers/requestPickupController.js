const path = require("path");
const Request = require("../models/pickupRequestsModel.js");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage
}).single('image');

const addRequestPickup = (req, res) => {
    try {
        const userId = req._id;
        console.log(userId);

        upload(req, res, (err) => {
            if (err) {
                return res.status(400).json({ message: "Image upload failed", error: err });
            }
           
            const imageUrl = req.file.path
            console.log(imageUrl)

            const {
                requestStatus,
                description,
                quantity,
                tags,
                address,
                selectedDateTime,
            } = req.body;

            

            const requestPickup = new Request({
                image: imageUrl,
                requestStatus,
                description,
                quantity,
                tags,
                address,
                selectedDateTime,
                amount: null,
                postedBy: userId,
                acceptedBy: null
            });

            requestPickup.save().then((data) => {
                res.status(200).json(data);
            }).catch((err) => {
                res.status(500).json({ message: "Error saving request pickup", error: err });
            });
        });
    } catch (error) {
        res.status(400).json({ message: "Request failed with error", error: error });
    }
};

const getRequestPickup = async (request, response) => {
  try {
    const userId = request._id;

    const pickups = await Request.find({postedBy:userId});
    
    if(pickups.length>0)
    {
      const formattedPickups = pickups.map(pickup => ({
        ...pickup.toJSON(),
        image: `http://localhost:4040/${pickup.image}`
    }));
      return response.status(200).json(formattedPickups);
    }
    else{
      return response.status(404).json({"message":"No requests found!"})
    }

  } catch (error) {
    console.log("Error getting request pickups",error)
  }
};

module.exports = {
    addRequestPickup,
    getRequestPickup,
};
