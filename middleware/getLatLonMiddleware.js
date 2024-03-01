const getLatLonMiddleWare = async (req, res, next) => {
   
    const queryParams = (({ name, ...o }) => o)(req.body);
    console.log(queryParams);
    const queryString = new URLSearchParams(queryParams).toString();
    const API_KEY = "65bbca35bbe6d417025017woffd04d6";
    const url = `https://geocode.maps.co/search?${queryString}&api_key=${API_KEY}`
    await fetch(url).then((res) => {
        console.log(res.status);
        return res.json()
    }).then((data) => {
        console.log(data);
        req.body.location = {
            type: "Point",
            coordinates: [data[0].lat, data[0].lon]
        }
    });
    next();
}

module.exports = {getLatLonMiddleWare}