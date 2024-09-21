import 'dotenv/config'
export default function PlaceImg({place,index=0,className=null}) {
    if(!place.photos?.length){
        return '';
    }
    if(!className){
        className = "object-cover w-full";
    }
    return(
        <img className={className} src={process.env.VITE_API_URL +"/uploads/"+place.photos[index]} alt="" />
        
    );   
}