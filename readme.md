# gy2h
This is a basic templating server where you wil define YAML files to be your
site URLs and these files shall load html files as templates as well as fill them with variables.
> Obs.: Conditional and Repetition structures are not supported.

> Warning: This was only tested in Windows 10.

> Warning: This IS NOT production ready.

## Usage

##### Step 1
In your project directory, create a YAML file with the name you want. I will call mine: `settings.yml` (this one will be used in step 5).

##### Step 2
In `settings.yml`, write the following content:
```
sourceDir: ../yml
templatesDir: ../html
port: 8001
```
> 1. `sourceDir` must point to where your YAML files will be.
> 2. `templatesDir` must point to where your HTML files will be.
> 3. Those paths must be relative to `settings.yml` path.
> 4. `port` defines where the HTTP server will be listening for requests.

##### Step 3
In source directory, create a file named `.yml` (that's right) with the following content:
```
title: My Awesome Title
description: My Cool description
content: My cool content
template: page
```

##### Step 4
In template directory, create a file named `page.html` with the following content:
```
<!DOCTYPE html>
<html>
    <head>
        <title>{{title}}</title>
        <meta name="description" content="{{description}}" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body>
        {{content}}
    </body>
</html>
```

##### Step 5
Install the server as a service with the following comands:
```
npm install -g gy2h
gy2h install my-project "/absolute/path/to/my/settings.yml"
```

##### Step 6
Since we are on Windows, go to Services and search for our newly created service whose name is `gy2h-my-project`. Start the service if it is not alreay running.

##### Step 7
In your browser, get http://127.0.0.1:8001 and done!

## Have Questions?
Please, if you have any questions, suggestions, doubts, etc.. Don't hesitate to open issues.

Thanks!
