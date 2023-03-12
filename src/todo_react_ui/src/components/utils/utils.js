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