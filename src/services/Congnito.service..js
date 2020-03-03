require('cross-fetch/polyfill');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var CognitoUser = AmazonCognitoIdentity.CognitoUser,
    CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool,
    CognitoUserAttribute = AmazonCognitoIdentity.CognitoUserAttribute

// export default class CognitoService {

var userPool = new CognitoUserPool({ UserPoolId: 'us-east-1_0ux7y4TOv', ClientId: '1d9qiasg81vqg6p2hq2nntme9k' })
var cognitoUser = null

// constructor() {

// }

function userSignUp(data) {
    return new Promise((resolve, reject) => {
        let emailAttr = new CognitoUserAttribute({ Name: 'email', Value: data.email })
        let phnAttr = new CognitoUserAttribute({ Name: 'phone_number', Value: data.phone_number })
        userPool.signUp(data.username, data.password, [emailAttr, phnAttr], [], (err, result) => {
            if (err) {
                reject(err)
            }
            if (result) {
                cognitoUser = result.user;
                resolve(cognitoUser.getUsername())
            } else {
                reject({ error: 'nothing returned' })
            }
        })
    })
}

export { userSignUp }

// }