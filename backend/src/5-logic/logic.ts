import { OkPacket } from "mysql"
import dal from "../2-utils/dal"
import TravelSiteModel from "../4-models/travel-site-model"
import { ResourceNotFoundError, ValidationError } from "../4-models/error-model"
import SiteAreaModel from "../4-models/site-area-model"


async function getAllSiteAreas():Promise<SiteAreaModel[]>{
    try {
        const sql = `SELECT * FROM siteareas`
const siteAreas= dal.execute(sql)
return siteAreas
    } catch (error) {
      console.log(error)  
    }

}

async function getTravelSitesByArea(siteAreaId:number):Promise<TravelSiteModel[]>{
    try {
        const sql = `SELECT t.* , s.siteAreaName
        FROM travelsites AS t JOIN siteareas AS s
        ON t.siteAreaID = s.siteAreaID
        WHERE t.siteAreaID = ?`
    
            const travelSites = await dal.execute(sql,[siteAreaId])
            return travelSites
    } catch (error) {
     console.log(error)   
    }
  

}

async function addNewTravelSite(travelSiteModel:TravelSiteModel):Promise<TravelSiteModel>{
    try {
        const error = travelSiteModel.validate()
        if(error){
            throw new ValidationError(error)
        }
        const sql = `INSERT INTO travelSites VALUES(DEFAULT,?,?,?,?,?)`
        const info:OkPacket =await dal.execute(sql,
            [travelSiteModel.name,travelSiteModel.description,travelSiteModel.siteAreaID,travelSiteModel.pricePerChild,travelSiteModel.priceForAnAdult])
            travelSiteModel.code = info.insertId
            return  travelSiteModel   
    } catch (error) {
        console.log(error)
    } 
}

async function deleteTravelSite(code:number):Promise<void>{
    try {
        const sql = `DELETE FROM travelSites
        WHERE travelSites.code=?`
        const info:OkPacket = await dal.execute(sql,[code])
        if(info.affectedRows===0){
            throw new ResourceNotFoundError (code)
        }  
    } catch (error) {
      console.log(error)  
    }
   
}
export default{
    getAllSiteAreas,
    getTravelSitesByArea,
    addNewTravelSite,
    deleteTravelSite    
}