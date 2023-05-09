class SiteAreaModel{
    public siteAreaID:number
    public SiteAreaName:string

    public constructor(siteArea:SiteAreaModel){
        this.siteAreaID=siteArea.siteAreaID
        this.SiteAreaName = siteArea.SiteAreaName
    }
}
export default SiteAreaModel