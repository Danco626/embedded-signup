# Embedded Login POC  

## Flow  
This flow assumes the user has just checked out as a guest and will not create an account  

1. User enters an email and password (in the normal flow, the app will already have the user's email)  
2. The password is validated based on password requirements  
3. The user can optionally opt-in to marketing  
4. The user submits form that's POSTed to the Auth0 endpoint /dbconnections/signup  
5. The pre-registration hook executes, creating the user profile.  
    - The user's marketing state is saved to the user's
    app_metadata  

          {
            "marketing": "true"
          }

## Components
**./src/components/Register:** An HTML form that collects the user's credentials and POSTs them to Auth0  
**./src/components/Validator:** A child component that uses regex to validate the user's password

## Application Configuration  
**./src/auth_config.json:** Required Auth0 settings

    {
      "domain": "https://{domain}",
      "client_id": "{client_id}",
      "connection": "{connection_name}"
    }

## Auth0 Configuration
1. Create an Auth0 connection or use the default (Username-Password-Authentication)  
2. Create an application and enable the above connection
3. Create a [pre-user registration hook](https://auth0.com/docs/hooks/extensibility-points/pre-user-registration) and copy the contents of **./pre-reg-hook.js**  

## Running App  
1. Navigate to the embed-login directory
2. Run *npm install* 
3. Run *npm start*
4. The application should run on localhost:3000

### Dependencies  
- npm
- react
- react-dom
- react-scripts
- axios
- bootstrap

