import React, {useState} from "react";

//Function that returns current time
const currentTime = () => {
    let today = new Date(); 
    let time = (today.getHours()<13?(today.getHours()):(Number(today.getHours())-12)) 
    + ":" + (today.getMinutes()<10?'0':'') + today.getMinutes() + (today.getHours()<12 ?" am": " pm"); 
    return time; 
}

//Funciton to grab date
const currentDate = () => {
    //Array of month names to index
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

    let today = new Date(); 
    let date = monthNames[today.getMonth()] + " " + Number(today.getDate()) + ", " + Number(today.getFullYear()); 
    return date; 
}


//Actual bullet component
const Bullet = () => {

    //Giving state to current bullet
    const [currentBullet, setCurrentBullet] = useState("");
    //Test set of bullets - bullets are objects with bullet text and time

    const [bullets, setBullets] = useState([
        {
            bullet: "Just finished Infinite Jest",
            time: "12:04 pm"
          },
        {
        bullet: "Coffee was more bitter than usual",
        time: "9:30 am"
        },    
      {
        bullet: "Morning commute was really calming; today's a beautiful day",
        time: "8:45 am"
      } 
    ]);

    //Create new bullet function
    const createNewBullet = (bullet) => {
        let bulletArray = [...bullets];
        bulletArray.unshift(
            {bullet: bullet, time: currentTime()}
        );
        setBullets(bulletArray);
    }

    //Function to delete bullet
    const deleteBullet = (index) => {
        let bulletArray = [...bullets];
        bulletArray.splice(index, 1)
        setBullets(bulletArray);
    }

    //Returns the the input with current bullet and the list of bullets
    return(
        <div>
            {/*Input*/}
            <input
                className = "bullet-input"
                value = {currentBullet}
                onChange = {e => {setCurrentBullet(e.target.value);}}
                onKeyPress = {e => 
                    //Allow enter key to create new bullet
                    {if (e.key == "Enter"){
                        createNewBullet(currentBullet);
                        setCurrentBullet("");
                    }}
                }
                placeholder = "What's on your mind?"
            />

            <div>
                <h2>{currentDate()}</h2>
            </div>
        {/*Constructing divs for every bullet in the component*/}
        {bullets.map((bullet, index) => (
            <div key = {bullet} className = "bullet">
                <div className = "time">
                    {bullet.time}
                </div>
                <div>{bullet.bullet}</div>
                <i className = "fa fa-trash-o" onClick = {() => deleteBullet(index)}></i>
            </div>
        ))}
        {bullets.length >= 0 && `${bullets.length} items`}
        </div>
    )
}

export default Bullet; 