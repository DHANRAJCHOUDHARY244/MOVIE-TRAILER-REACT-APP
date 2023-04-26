import React from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';





export default function MyInfo() {
    return (
        <div>
            <Popup trigger=
                {<button className={'button'}> My Info </button>}
                modal nested>
                {
                    close => (
                        <div className='modal'>
                            <div className='content' style={{
                                textAlign: "center"
                            }} >
                                <h5 style={{
                                    color: "white"
                                }}>Name : DHANRAJ CHOUDHARY</h5>
                                <h5 style={{
                                    color: "white"
                                }}>Department :BTECH CSE</h5>
                                <h5 style={{
                                    color: "white"
                                }}>En. No : 2020BTCSE009</h5>
                            </div>
                            <div style={{
                                display: "flex",
                                justifyContent: "center"
                            }}>
                                <button className={'button'} onClick=
                                    {() => close()}>
                                    X
                                </button>
                            </div>
                        </div>
                    )
                }
            </Popup>
        </div>
    )
};