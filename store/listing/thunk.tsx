import axios from 'axios'
import { apiUrl } from '../../config/constance'

export const fetchListings =()=>async(dispatch:any,getState:any)=>{
    try{

    const response = await axios.get
    } catch(e: any){
        console.log(e.message)
    }
}
