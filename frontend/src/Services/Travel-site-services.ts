import axios from "axios"
import SiteAreaModel from "../Models/Site-area-model"
import appConfig from "../Utils/AppConfig"
import TravelSiteModel from "../Models/Travel-site-model"

class TravelSiteServices{

    public async getAllSiteArea():Promise<SiteAreaModel[]>{
try {
    const response = await axios.get<SiteAreaModel[]>(appConfig.siteAreaUrl)
    const siteArea = response.data
    return siteArea
} catch (error) {
    console.log(error)
}    
    }


    public async getAllTravelSitesBySiteAreaId(siteAreaId:number):Promise<TravelSiteModel[]>{

try {
    const response = await axios.get<TravelSiteModel[]>(appConfig.travelSiteBySiteAreaUrl+siteAreaId)
    const travelSite = response.data
    return travelSite
    
} catch (error) {
    console.log(error)
}
    }

    public async deleteTravelSite(code:number):Promise<void>{

        try {
            const response = await axios.delete(appConfig.allTravelSiteUrl+code)
            
        } catch (error) { 
            console.log(error)
        }
    }

    public async addTravelSite(travelSite:TravelSiteModel):Promise<TravelSiteModel>{
        
        const response = await axios.post<TravelSiteModel>(appConfig.allTravelSiteUrl,travelSite)
        const addedProduct= response.data
        return addedProduct
           }
}


const travelSiteServices = new TravelSiteServices()
export default travelSiteServices