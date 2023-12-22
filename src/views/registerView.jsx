import React from 'react';
import InputForm from "./components/inputform";
import Banner from "./components/banner";
import LoadingIcon from "../assets/images/LoadingIcon.png"; 
import "/src/style.css";

function RegisterView(props){
    return (
        <div className="">
            <Banner text="Join and Try!"/>
            <div>
                <div className="input-group">
                    <label htmlFor="email" className="input-label">Email</label>
                    <InputForm 
                        id="email"
                        type="text" 
                        onChange={(e) => props.setEmail(e.target.value)} 
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password" className="input-label">Password</label>
                    <InputForm
                        id="password"
                        type="password"
                        onChange={(e) => props.setPassword(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="confirm-password" className="input-label">Confirm Password</label>
                    <InputForm
                        id="confirm-password"
                        type="password"
                        onChange={(e) => props.setConfirmPassword(e.target.value)} 
                    />
                </div>

                {props.isProcessing && (
                    <div className="loading-message">
                        <img src={LoadingIcon} alt="Loading" />
                        Processing...
                    </div>
                )}

                {props.error && (
                    <div className="error-message">
                        <img 
                            className="error-message-icon" 
                            src="https://cdn-icons-png.flaticon.com/128/9647/9647409.png" 
                            alt="Error" 
                        />
                        {props.error}
                    </div>
                )}
                
                <div className='gap'/>
                <div className="flextRowParent">
                    <button className="button_1" onClick={props.handleRegister}>Register</button>
                </div>
                <div className="columnContainer">
                    <div className="normalText">I have an account. <a href="#/login">Login Here</a></div>
                </div>
                
            </div>
        </div>
        
        
    );
    
}


export default RegisterView;
