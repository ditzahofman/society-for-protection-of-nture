import express, { Request, Response, NextFunction } from "express"
import logic from "../5-logic/logic"
import TravelSiteModel from "../4-models/travel-site-model"
import blockNonLoggedIn from "../3-middleware/block-non-loged-in"

const router = express.Router()

router.get('/site-area', async(request:Request,response:Response,next:NextFunction)=>{
    try {
        const siteAreas = await logic.getAllSiteAreas()
        response.json(siteAreas)  
    } catch (error) {
        next(error)
    }
   

})
//Create routers for all types of calls to the server
router.get("/travel-sites-by-site-area/:siteArea",async(request:Request,response:Response,next:NextFunction)=>{
try {
    const siteArea = +request.params.siteArea
    const traveSites= await logic.getTravelSitesByArea(siteArea)
    response.json(traveSites)
} catch (err) {
    next(err)
}
})

router.post("/travel-sites",[blockNonLoggedIn],async(request:Request,response:Response,next:NextFunction)=>{
    try {
        const newTravelSite = new TravelSiteModel(request.body)
        const addedTravelSite = logic.addNewTravelSite(newTravelSite)
        response.status(201).json(addedTravelSite)  
    } catch (err:any) {
    next(err)    
    }

})

router.delete("/travel-sites/:code",async(request:Request,response:Response,next:NextFunction)=>{
    try {
        const code = +request.params.code
        await logic.deleteTravelSite(code)
        response.status(204).send("this traavel site deleted")
    } catch (err) {
        next(err)
    }
})





export default router