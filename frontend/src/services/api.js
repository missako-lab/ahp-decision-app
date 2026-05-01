import axios from "axios";

export const computeAHP = async (data) => {
  const res = await axios.post("https://ahp-decision-app.onrender.com/api/ahp/compute", data);
  return res.data;
};