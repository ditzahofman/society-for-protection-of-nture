import TravelSiteModel from "../../../Models/Travel-site-model";
import "./DataCard.css";

interface travaelSiteProps{
travelSite:TravelSiteModel
}

function DataCard(props:travaelSiteProps): JSX.Element {
    return (
        <div className="DataCard">
			<p className="name"><b>{props.travelSite.name}</b></p>
            <p className="description">{props.travelSite.description}</p>
            <p className="areaName">site area:{props.travelSite.siteAreaName}<hr/></p>
            <p className="price">price per child:{props.travelSite.pricePerChild}</p>
            <p className="price">price for an adult:{props.travelSite.priceForAnAdult}</p>
        </div>
    );
}

export default DataCard;
