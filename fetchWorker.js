self.onmessage=function(event){
    const apiUrl=event.data;
    fetch(apiUrl).then(res=>res.json())
        .then(data=>{
            self.postMessage(data);
        })
        .catch(error=>{
            console.log("🚀 ~ error fetch data worker:", error);
        });
};