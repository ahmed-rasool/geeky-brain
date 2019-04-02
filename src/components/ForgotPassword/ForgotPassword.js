import React from 'react';

class ForgotPassword extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value});
    }

    onReset = async () => {
        const request = await fetch('http://localhost:3001/forgotPass', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email
            })
        })
        const status = await request.status;
        const result = await request.json()

        if (status === 404) {
            console.log(`Sorry, you've entered an invalid email !`)
        } else {
            console.log(result)
        }
        this.props.changeRoute('signIn');
    }

    render () {
        const { currentRoute } = this.props;
        if (currentRoute === 'forgotPass') {
            return(
                <main className="pa4 black-80">
                    <div className="measure center shadow-2 pv4 ph4">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Forgot Password</legend>
                        <div className="mt3 mb2">
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                placeholder='Email'
                                onChange={this.onEmailChange}
                            />
                        </div>
                        </fieldset>
                        
                        <div className="mt2">
                        <input
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Request Reset"
                            onClick={this.onReset}
                        />
                        </div>
                    </div>
                </main>
            );
        } else {
            return null;
        }
    }
};

export default ForgotPassword;