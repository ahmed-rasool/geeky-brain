import React from 'react';

class SignIn extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onLogIn = async () => {
        const response = await fetch('https://geeky-brain-api.herokuapp.com/signIn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        const statusText = await response.statusText;
        const userData = await response.json();
        if (statusText === 'OK') {
            this.props.changeRoute('home')
        }
        if (userData) {
            this.props.settingCurrentUser(userData);
        }
    }
    
    render () {
        const { changeRoute, currentRoute } = this.props;
        if (currentRoute === 'signIn') {
            return (
                <main className="pa4 black-80">
                    <div className="measure center shadow-2 pv4 ph4">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Login</legend>
                        
                        <div className="mt3">
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address" 
                                id="email-address"
                                placeholder='Email'
                                onChange = {this.onEmailChange}
                            />
                        </div>
                        
                        <div className="mt3 mb2">
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" 
                                placeholder='Password'
                                onChange = {this.onPasswordChange}
                            />
                        </div>
                        
                        <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
                        </fieldset>
                        
                        <div className="mt2">
                            <input 
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Log In" 
                                onClick={this.onLogIn} 
                            />
                        </div>
    
                        <div className="lh-copy mt3">
                        <p className="f6 link dim black db pointer" onClick={() => changeRoute('signUp')}>Not registered? Sign up!</p>
                        <p className="f6 link dim black db pointer" onClick={() => changeRoute('forgotPass')}>Forgot your password?</p>
                        </div>
                    </div>
                </main>
            );
        } else {
            return null;
        }
    }
};

export default SignIn;