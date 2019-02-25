import React from 'react';

const ForgotPassword = ({ changeRoute }) => {
    return(
        <main className="pa4 black-80">
            <div className="measure center shadow-2 pv4 ph4">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Forgot Password</legend>
                <div className="mt3 mb2">
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" placeholder='Email' />
                </div>
                </fieldset>
                <div className="mt2">
                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Request Reset"  onClick={() => changeRoute('signIn')} />
                </div>
            </div>
        </main>
    );
};

export default ForgotPassword;