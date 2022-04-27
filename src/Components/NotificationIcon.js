import React/*, { useState, useEffect }*/ from 'react';

export default function NotificationIcon(props)
{
      

      return <span>

<button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#NotifcationsList">
  <i className="far fa-bell" style={{fontSize:"25px"}}>
    {props.notification && 
        <span style={{position: 'relative', borderRadius:"100%",backgroundColor:"red",color:"white",display:"inline-block", width:"15px",height:"15px",fontSize:"15px",left:-10}}>{props.notification.length}</span>
    }
   </i></button> 


<div className="modal fade" id="NotifcationsList" tabIndex="-1" aria-labelledby="NotifcationsListLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="NotifcationsListLabel">Sign Out</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {props.notification}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
      </span> 
}