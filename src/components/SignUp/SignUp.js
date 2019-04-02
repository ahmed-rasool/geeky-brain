import React from 'react';

class SignUp extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onRegister = () => {
        fetch('http://localhost:3001/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(resp => resp.json())
            .then(user => {
                if (user.id) {
                    this.props.settingCurrentUser(user);
                    this.props.changeRoute('home');
                }
            })
    }

    render () {
        const { currentRoute, changeRoute } = this.props;
        if (currentRoute === 'signUp') {
            return (
                <main className="pa4 black-80">
                    <div className="measure center shadow-2 pv4 ph4">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Registration</legend>
                        
                        <div className="mt3">
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="full-name"
                                id="full-name"
                                placeholder='Name'
                                onChange={this.onNameChange}
                            />
                        </div>
                        
                        <div className="mv3">
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                placeholder='Email'
                                onChange={this.onEmailChange}
                            />
                        </div>
                        
                        <div className="mt3 mb2">
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password"
                                placeholder='Password'
                                onChange={this.onPasswordChange}
                            />
                        </div>
                        
                        <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> I agree to Geeky Brain's use of Browser Cookies, Privacy Policy and Terms of Service.</label>
                        </fieldset>
                        
                        <div className="mt2">
                        <input
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign up"
                            onClick={this.onRegister} />
                        </div>
                        
                        <div className="lh-copy mt3">
                        <p href="#0" className="f6 link dim black db pointer" onClick={() => changeRoute('signIn')}>Already registered? Sign in!</p>
                        </div>
                    </div>
                </main>
            );
        } else {
            return null;
        }
    }
};

export default SignUp;