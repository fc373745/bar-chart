import axios from "axios";

export default axios.create({
    baseURL: "https://d3bardata.firebaseio.com/"
});
