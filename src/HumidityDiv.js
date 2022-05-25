import './HumidityDiv.css'

let HumidityDiv = (props)=>{
    return(
        <>
            <div className='Humidity-div'>
                <h1>{props.icon}</h1>
                <p><span style={{fontWeight:"bold"}}>{props.value}</span><span>hmmm</span><br/><span>{props.text}</span></p>
            </div>
        </>
    )
}
export default HumidityDiv;
