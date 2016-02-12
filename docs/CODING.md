# Coding Conventions and Guidelines

 - [Project Structure](#structure)
 - [Coding Flow](#flow)

## <a name="structure"></a> Project Structure

All frontend apps are defined in:
```text
  -- /src --> compiled to `dist`
     -- /images
     -- /jade
     -- /styles
     -- /scripts
        -- /core         --> compiled to `dist/scripts/core.js`
        -- /<app folder> --> compiled to `dist/scripts/[APPNAME].js`
           -- /controllers 
           -- /services 
           -- app.js
           -- event.js
           -- config.router.js
           -- main.js
```


> NOTE: the `dist` directory is **not** version controlled.

<br/>
## <a name="rules"></a> Coding Rules

#### Coding conventions:

The best guidance is a coding approach that implements both code and comments in a clear, understandable, concise, and DRY fashion.

Create documentation for every function and complex subrutines.

<br/>
## <a name="flow"></a> Coding Flow

### OAuth

Handle `code` provided on login authorization.

1. **Success** `/access/oauth?code=3dk3k0d7d98dd9s8dsd`
2. **Failure** `/access/oauth?error=access_denied&error_description=errdes`

+ Create `OAuthController` to handle `Authorization Code`
+ Above controller uses `Auth.login` from `qui.core` module to get access_token
+ Set Session Data by calling `Auth.setSessionData()`
+ Implementation can be found in `qui.hire` module.

### Creating a page
+ Create route in `<app>/config.router.js` add html template.
+ Write `jade` template in `src/jade` folder.
+ Write Controller and Services
+ CSS Documentation can be found in `ng-theme` project.
