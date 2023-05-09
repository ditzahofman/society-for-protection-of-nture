import { useEffect, useState } from "react";
import SiteAreaModel from "../../../Models/Site-area-model";
import TravelSiteModel from "../../../Models/Travel-site-model";
import "./AddData.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import travelSitesService from "../../../Services/Travel-site-services"
import { Button, MenuItem, TextField } from "@mui/material";

function AddData(): JSX.Element {
    
    const [siteArea, setSiteArea] = useState<SiteAreaModel[]>([])
    const { handleSubmit, register } = useForm<TravelSiteModel>()
    const navigate = useNavigate();

    useEffect(() => {
        travelSitesService.getAllSiteArea()
          .then(s => setSiteArea(s))
          .catch(err => alert(err.message))
      }, [])

      async function send(travelSite:TravelSiteModel){
        try {
             await travelSitesService.addTravelSite(travelSite)
             navigate("/home")
        
        } catch (err) {
            alert(err)
        }
            }
    return (
        <div className="AddData">
		<form onSubmit={handleSubmit(send)}>
                <h2 className="h2-card">Add travel-site</h2>
            <TextField className="textFiled" id="outlined-basic" label="name" variant="outlined" {...register("name")} />
            <textarea className="textFiled" id="outlined-basic" placeholder="description"  {...register("description")} />
            <TextField
          id="outlined-select-currency"
          select
          label="site area"
          defaultValue="select"
          helperText="Please select site area"
          {...register("siteAreaID")}>
          {siteArea.map((option) => (
            <MenuItem key={option.siteAreaID} value={option.siteAreaID}>
              {option.siteAreaName}
            </MenuItem>
          ))}
        </TextField>
            
            <TextField className="textFiled"  id="outlined-basic"  label="pricePerChild" variant="outlined"  {...register("pricePerChild")}/>
            <TextField className="textFiled"  id="outlined-basic" label="priceForAnAdult" variant="outlined"  {...register("priceForAnAdult")}/>
            <Button type="submit"  className="button">ADD</Button>
            </form>
        </div>	
       
    );
}

export default AddData;
