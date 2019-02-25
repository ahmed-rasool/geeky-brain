import React from 'react';

const SignUp = ({ changeRoute }) => {
    return(
        <main className="pa4 black-80">
            <div className="measure center shadow-2 pv4 ph4">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Registration</legend>
                <div className="mt3">
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="full-name"  id="full-name" placeholder='Name' />
                </div>
                <div className="mv3">
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" placeholder='Email' />
                </div>
                <div className="mt3 mb2">
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" placeholder='Password' />
                </div>
                <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> I agree to Geeky Brain's use of Browser Cookies, Privacy Policy and Terms of Service.</label>
                </fieldset>
                <div className="mt2">
                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign up"  onClick={() => changeRoute('home')} />
                </div>
                <div className="lh-copy mt3">
                <p href="#0" className="f6 link dim black db pointer" onClick={() => changeRoute('signIn')}>Already registered? Sign in!</p>
                </div>
            </div>
        </main>
    );
};

export default SignUp;