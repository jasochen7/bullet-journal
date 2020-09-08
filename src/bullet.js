import React, {useState} from "react";

function currentTime(){
    let today = new Date(); 
    let time = (today.getHours()<13?(today.getHours()):(Number(today.getHours())-12)) + ":" + (today.getMinutes()<10?'0':'') + today.getMinutes() + (today.getHours()<12 ?" am": " pm"); 
    return time; 
}

function BulletComponent(){
    const [currentBullet, setCurrentBullet] = useState("");
    const [bullets, setBullets] = useState([
      {
        bullet: "Test 1",
        time: "8:45 am"
      },
      {
        bullet: "Test 2",
        time: "9:30 am"
      },
      {
        bullet: "Test 3",
        time: "12:04 pm"
      }
    ]);

    function createNewBullet(bullet){
        let bulletArray = [...bullets];
        bulletArray.push(
            {bullet: bullet, time: currentTime()}
        );
        setBullets(bulletArray);
    }

    function deleteBullet(index){
        let bulletArray = [...bullets];
        bulletArray.splice(index, 1)
        setBullets(bulletArray);
    }

    return(
        <div>
            <input
                className = "bullet-input"
                value = {currentBullet}
                onChange = {e => {setCurrentBullet(e.target.value);}}
                onKeyPress = {e => 
                    {if (e.key == "Enter"){
                        createNewBullet(currentBullet);
                        setCurrentBullet("");
                    }}
                }
                placeholder = "What's on your mind?"
            />
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

export default BulletComponent; 