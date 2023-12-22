function promiseNoDataView(promiseState){
    if(!promiseState.promise) {
        console.log("no data")
        return <div>no data</div>;
    } else if(!promiseState.data && !promiseState.error ) {
        console.log("loading img")
        return <img src={"https://i.gifer.com/XOsX.gif"}></img>;
    } else if(!promiseState.data && promiseState.error) {
        console.log(promiseState.error)
        return <div>{promiseState.error}</div>;
    }  else {
        console.log("render view")
        return false;
    }
}
export default promiseNoDataView;