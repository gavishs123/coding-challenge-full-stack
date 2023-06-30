const axios = require("axios");
const {
  CreateSuccessResponse,
  CreateErrorResponse,
} = require("../helper/responseHelper");

exports.fetchFeeds = (req, res) => {
  // Send a GET request to the Flickr API
  try {
    let url =
      "https://api.flickr.com/services/feeds/photos_public.gne?format=json&lang=en_us";

    if (req.query.tags) {
      url += `&tags=${encodeURIComponent(req.query.tags)}`;
    }

    axios.get(url).then((response) => {
      const json = JSON.parse(
        response.data.replace(/^jsonFlickrFeed\(|\)$/g, "")
      );
      const items = json.items || [];
      const message =
        items.length <= 0 ? "No Data Found!" : "Data found successfully!";

      res.setHeader("Content-Type", "application/json");
      return res.status(200).json(CreateSuccessResponse(message, items));
    });
  } catch (error) {
    console.log("Error fetchFeeds ==> ", error);
    return res
      .status(500)
      .json(
        CreateErrorResponse(
          "Error",
          `Internal Server Error!`,
          "Something Went Wrong!!"
        )
      );
  }
};
