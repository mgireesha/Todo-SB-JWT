import React from "react";

export const CloseSmall = ({closeFun, cssClass}) => {
    return(
        <>
            <div className={cssClass} onClick={closeFun} >
                <span>x</span>
            </div>
        </>
    );
}