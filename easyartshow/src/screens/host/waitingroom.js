import React from 'react'

function WaitingRoom() {
    const randomCodeGenerator = () => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( let i = 0; i < 6; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }


    return (
      <div>
        Waiting Room
        <div>
          Your passcode is {randomCodeGenerator()}
        </div>
      </div>
    );
  }
  
export default WaitingRoom; 