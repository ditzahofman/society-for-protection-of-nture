import { ChangeEvent, useEffect, useState } from "react";
import "./DataList.css";
import SiteAreaModel from "../../../Models/Site-area-model";
import travelSitesService from "../../../Services/Travel-site-services"
import TravelSiteModel from "../../../Models/Travel-site-model";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Tooltip } from "@mui/material";
import DataCard from "../DataCard/DataCard";
import travelSiteServices from "../../../Services/Travel-site-services";
import { Apps, TableChart } from "@mui/icons-material";

function DataList(): JSX.Element {
  const [siteArea, setSiteArea] = useState<SiteAreaModel[]>([])
  const [travelArea, setTravelArea] = useState<TravelSiteModel[]>([])
  const [mode, setMode] = useState<'table' | 'grid'>('table')
  useEffect(() => {
    travelSitesService.getAllSiteArea()
      .then(s => setSiteArea(s))
      .catch(err => alert(err.message))
  }, [])

  function showTravelSite(e: any) {
    const value = e.target.value;
    travelSitesService.getAllTravelSitesBySiteAreaId(value)
      .then(t => setTravelArea(t))
      .catch(err => alert(err.message))

  }
  async function deleteTravelSite(code: number) {
    try {
      const ok = window.confirm("Are you sure?");
      if (!ok) return;
      await travelSiteServices.deleteTravelSite(code)
      const index = travelArea.findIndex(t => t.code === t.code)
      travelArea.splice(index, 1)
      const duplicateTravelArea = [...travelArea]
      setTravelArea(duplicateTravelArea)

    } catch (error) {
      alert(error)
    }
  }

  return (

    <div className="DataList">
      <h2>Choose mode and select site - area:</h2>
      {
        mode === 'table' ?
          <Tooltip title={'Change to grid mode'}>
            <Apps className='Mode' onClick={() => setMode('grid')} />
          </Tooltip> :
          <Tooltip title={'Change to table mode'}>
            <TableChart className='Mode' onClick={() => setMode('table')} />
          </Tooltip>
      }
      
      <FormControl sx={{ m: 1, minWidth: 260 }}>
        <InputLabel id="site-area-label" className="SelectBox">Select Site Area</InputLabel>
        <Select
          labelId="site-area-label"
          label="Select Site Area"
          className="SelectBox"
          onChange={showTravelSite}

        >
          {
            siteArea.map(s =>
              <MenuItem key={s.siteAreaID} value={s.siteAreaID}>
                {s.siteAreaName}
              </MenuItem>
            )
          }
        </Select>
      </FormControl>
    

      <div>
        {
          travelArea.length > 0 ?
            mode === 'table' ?
              <table>
                <thead>
          <tr>
            <th>name</th>
            <th>escription</th>
            <th>siteAreaName</th>
            <th>pricePerChild</th>
            <th>priceForAnAdult</th>
            <th>delete</th>

          </tr>
          </thead>
             <tbody> 
          {travelArea.map
          (t => {return (
          <tr key={t.code} className="DataTable">
            <td>{t.name}</td>
            <td>{t.description}</td>
            <td>{t.siteAreaName}</td>
            <td>{t.pricePerChild}</td>
            <td>{t.priceForAnAdult}</td>
            <td><Button onClick={() => deleteTravelSite(t.code)}>delete</Button></td>
          </tr>)
        })
      }
          </tbody>  
        </table>:
    

      <div className="cards">
          {travelArea.map(t => <DataCard key={t.code} travelSite={t} />)}
        </div>:
        siteArea&&<h2>no site area found</h2>
}
          </div>
    
    </div>
  );
}

export default DataList;
