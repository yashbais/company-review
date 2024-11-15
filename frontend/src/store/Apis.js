import axios from 'axios';
import headers from "./Headers";

const apiUrl = process.env.REACT_APP_API_URL;

export async function addCompany(data) {
    try {
      const res = await axios.post(
        `${apiUrl}/addCompany`,
        data, { headers })
  
      return res;
    } catch (err) {
      console.log(err)
      return err;
    }
}

export async function getCompany(companyId) {
    try {
      const res = await axios.get(
        `${apiUrl}/getCompany?companyId=${companyId}`,
        { headers }
      );
  
      return res.data;
    } catch (err) {
      console.log(err)
  
      return err;
    }
  }

  export async function getCompanies() {
    try {
      const res = await axios.get(
        `${apiUrl}/getCompanies`,
        { headers }
      );
  
      return res.data;
    } catch (err) {
      console.log(err)
  
      return err;
    }
  } 
  
  export async function addReview(data) {
    try {
      const res = await axios.post(
        `${apiUrl}/addReview`,
        data, { headers })
  
      return res;
    } catch (err) {
      console.log(err)
      return err;
    }
} 