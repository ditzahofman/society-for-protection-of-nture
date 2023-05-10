class AppConfig {
    public registerUrl = "http://localhost:3001/api/auth/register/";
    public loginUrl = "http://localhost:3001/api/auth/login/"
    public usersUrl = "http://localhost:3001/api/users/"
    public siteAreaUrl = "http://localhost:3001/api/site-area/"
    public travelSiteBySiteAreaUrl = "http://localhost:3001/api/travel-sites-by-site-area/"
    public allTravelSiteUrl = "http://localhost:3001/api/travel-sites/"
}
const appConfig = new AppConfig()
export default appConfig