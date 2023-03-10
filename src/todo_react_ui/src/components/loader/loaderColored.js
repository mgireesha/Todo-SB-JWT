import { React } from "react";
import './styles.scss'
export const LoaderColored = () => {
    return(
        <div className="spinner">
            <span className="spinner-txt">Loading</span>
            <div className="spinner-sector spinner-sector-red"></div>
            <div className="spinner-sector spinner-sector-blue"></div>
            <div className="spinner-sector spinner-sector-green"></div>
        </div>
    )
}