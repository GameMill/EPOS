export function SendToServer(action, data,Callback=undefined) {
    var msgObject = {
        Data: data
    };
    if(Callback !== undefined)
    {
        var CallbackName = action+"_Callback_"+(Math.floor(Math.random() * 100000) + 1);
        msgObject['Callback'] = CallbackName; 
        AddCallback(CallbackName,Callback);
        OneUseHooks[CallbackName] = true;
    }
    try {
        window.chrome.webview.postMessage(action+"|#@#|"+JSON.stringify(msgObject));
    } catch (error) {
        console.error(action,error);
    }
   
    //console.log("Message Sent: "+JSON.stringify(msgObject))
}
export function IsDebug()
{
    return (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
}
export function LoadController(Name)
{
    SendToServer("LoadController",Name)
}
try {

    window.chrome.webview.addEventListener('message', event => {
        const obj = JSON.parse(event.data);
        if (obj.Callback in Hooks) {
            //console.log("Callback: ",obj)

            Hooks[obj.Callback](obj);
            if(obj.Callback in OneUseHooks)
                RemoveCallback(obj.Callback);
        }
        else{
            console.log("Missing Callback: ",obj.Callback,obj)
        }
    });

} catch (error) {
    console.log("Epos System Required",error)
}


export function AddCallback(action, callback) {
    console.log("Adding Callback: ",action);
    Hooks[action] = callback;
}

export function RemoveCallback(action)
{
    console.log("Removing Hook: ", action)
    Hooks[action] = undefined;
    OneUseHooks[action] = undefined;
    delete OneUseHooks[action];
    delete Hooks[action];
}

var formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

export function GetFormatter()
{
    return formatter;   
}

var Hooks = {};
var OneUseHooks = {};


document.addEventListener('contextmenu', event => event.preventDefault());
