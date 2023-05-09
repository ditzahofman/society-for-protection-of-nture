import joi from "joi"
class TravelSiteModel{
public code:number
public name:string
public description:string
public siteAreaID: number
public pricePerChild:number
public priceForAnAdult:number

public constructor(travelSite:TravelSiteModel){
this.code = travelSite.code
this.name = travelSite.name
this.description = travelSite.description
this.siteAreaID = travelSite.siteAreaID
this.pricePerChild= travelSite.pricePerChild
this.priceForAnAdult=travelSite.priceForAnAdult
}

public static validationSchema=joi.object({
code:joi.number().optional().positive(),
name:joi.string().required(),
description:joi.string().required(),
siteAreaID:joi.number().required().positive(),
pricePerChild:joi.number().required().positive(),
priceForAnAdult:joi.number().required().positive()

})

public validate():string{
const result = TravelSiteModel.validationSchema.validate(this)
return result.error?.message
}


}
export default TravelSiteModel