import { isMobile } from "./GlobalFuns";

export const headerLinksSelectStyles = ({
    container: (baseStyles, state) => ({
      ...baseStyles,
      width: isMobile() ? '40%' : '20%',
      marginLeft:'auto',
      marginRight:isMobile() ? '0' : '20px',
      marginTop:2
    }),
    control: (baseStyles, state) => ({
        ...baseStyles,
        minHeight: '30px',
          height: '30px',
      }),
      valueContainer: (provided, state) => ({
        ...provided,
        height: '30px',
        padding: '0 6px',
        fontSize:14
      }),
  
      input: (provided, state) => ({
        ...provided,
        margin: '0px',
      }),
    
      indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '30px',
      }),
      listbox: (provided, state) => ({
        ...provided,
        top:'-5em'
      }),
  });


  export const getCookieDetails = () => {
    const cookies = document.cookie;
    const cookieArr = cookies.split(";");
    const cookieDetails = {};
    let cookieArr1;
    cookieArr.forEach((cookie => {
        if(cookie!==""){
            cookieArr1 = cookie.split("=");
            cookieDetails[cookieArr1[0].trim()] = cookieArr1[1].trim();
        }
    }))
    return cookieDetails;
}

export const setCookies = (name, value) => {
    const date = new Date();
    const expires = new Date(date);
    expires.setDate(expires.getDate()+5);
    document.cookie=name+"="+value+"; expires="+expires+"; path=/";
}

export const getCookieValue = (name) => {
    const cookies = document.cookie;
    const cookieArr = cookies.split(";");
    let cookieArr1;
    let cookieValue;
    cookieArr.forEach((cookie => {
        if(cookie!==""){
            cookieArr1 = cookie.split("=");
            if(cookieArr1[0].trim() ===name){
                cookieValue = cookieArr1[1].trim();
            }
        }
    }))
    return cookieValue;
}