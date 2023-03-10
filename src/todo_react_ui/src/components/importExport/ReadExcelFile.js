import React from "react";
import * as XLSX from 'xlsx';

export const ReadExcelFile = () => {
    const onChange = (e) => {
        const [file] = e.target.files;
        const reader = new FileReader();
    
        reader.onload = (evt) => {
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
          console.log(convertToJson(data));
          document.getElementById('res_json').innerHTML = convertToJson(data)

        };
        reader.readAsBinaryString(file);
      };

      const convertToJson = (csv) => {
        var lines = csv.split("\n");
    
        var result = [];
    
        var headers = lines[0].split(",");
    
        for (var i = 1; i < lines.length; i++) {
          var obj = {};
          var currentline = lines[i].split(",");
    
          for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
          }
    
          result.push(obj);
        }
    
        //return result; //JavaScript object
        return JSON.stringify(result); //JSON
      }
    return(
        <div className="t-main-container">
            <div className="file-input-div">
                <div className="file-input-wrapper">
                    <button className="btn-file-input">Upload Excel</button>
                    <input type='file' className="file-input" onChange={onChange} />
                    
                </div>
                
                
            </div>
            <div className="file-txt-div" style={{height:0}}> 
                <textarea id='res_json' className="task-detail-note-txt" rows='12' cols='98'></textarea>
            </div>
        </div>
    )
}