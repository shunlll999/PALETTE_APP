import React, { Component } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, ActivityIndicator, AsyncStorage } from 'react-native'
import { Button, Text, Input } from 'react-native-elements';

import axios from 'axios'

import { connect } from 'react-redux'
import { signupUser } from '../../actions/userActions'

class SignUpScreen extends Component {
    constructor() {
        super()
        this.state = {
            handle: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: {},
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors })
        }
    }


    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            loading: true
        })
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(newUserData, this.props.navigation)
    }

    render() {
        const { UI: { loading } } = this.props
        const { errors } = this.state
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding' >
                <View style={styles.form}>
                    <Text style={{ fontSize: 40, marginLeft: 10 }}>SignUp</Text>
                    <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
                        <View style={{}}>
                            <Input
                                label='Username'
                                labelStyle={{ color: '#E13C3F' }}
                                inputContainerStyle={{ borderBottomColor: '#E13C3F' }}
                                placeholder='Username'
                                errorStyle={{ color: 'red' }}
                                onChangeText={(handle) => this.setState({ handle })}
                                value={this.state.handle}
                                errorMessage={errors.handle}

                            />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Input
                                label='Email'
                                labelStyle={{ color: '#E13C3F' }}
                                inputContainerStyle={{ borderBottomColor: '#E13C3F' }}
                                placeholder='email@adress.com'
                                errorStyle={{ color: 'red' }}
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                                errorMessage={errors.email}

                            />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Input
                                label='Password'
                                labelStyle={{ color: '#E13C3F' }}
                                inputContainerStyle={{ borderBottomColor: '#E13C3F' }}
                                secureTextEntry={true}
                                placeholder='Password'
                                errorStyle={{ color: 'red' }}
                                onChangeText={(password) => this.setState({ password })}
                                value={this.state.password}
                                errorMessage={errors.password}

                            />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Input
                                label='Confirm Password'
                                labelStyle={{ color: '#E13C3F' }}
                                inputContainerStyle={{ borderBottomColor: '#E13C3F' }}
                                secureTextEntry={true}
                                placeholder='Confirm Password'
                                errorStyle={{ color: 'red' }}
                                onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                                value={this.state.confirmPassword}
                                errorMessage={errors.confirmPassword}

                            />
                        </View>
                    </View>


                    <View style={styles.buttonContainer}>

                        <View style={{ width: 170 }}>
                            <Button title='เข้าสู่ระบบ' type='outline' titleStyle={{ color: '#E13C3F' }} buttonStyle={{ borderColor: '#E13C3F' }}
                                onPress={() => this.props.navigation.navigate('Login')}
                            />
                        </View>
                        <View style={{ width: 170 }}>
                            <Button
                                title='สมัครสมาชิค' //--> คงจะเป็น hipster นะครับ lovely ( มันควรจะสะกดด้วย `ก` รึเปล่าครับ `สมัครสมาชิค` -> `สมัครสมาชิก` )
                                type='solid'
                                titleStyle={{ color: 'white' }}
                                buttonStyle={{ backgroundColor: '#E13C3F', }}
                                onPress={this.handleSubmit}
                                disabled={loading}
                            >
                                {loading && (<ActivityIndicator />)}
                            </Button>
                        </View>
                    </View>
                </View>

            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 200,
        alignContent: 'center'
        // backgroundColor: 'green'

    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 30,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'space-between',
        //   backgroundColor: 'black'
    }
})

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})


export default connect(mapStateToProps, { signupUser })(SignUpScreen)

