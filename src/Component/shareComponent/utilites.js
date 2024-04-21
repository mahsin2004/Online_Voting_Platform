import axios from "axios";

export const UploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    // console.log(formData)
  const { data } =await axios.post(`https://api.imgbb.com/1/upload?key=df9054f407ac3bbd57396b9a0b13918e`, formData);


    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};