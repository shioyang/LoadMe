# Load Me
![Icon](images/icon01_48x48.png)
Chrome extension to load files from server, which WebSocket notifies.

## Pending...
Chrome API doesn't support overwriting "Cache-Control" and "Pragma".

> The following headers are currently **not provided** to the onBeforeSendHeaders event. This list is not guaranteed to be complete nor stable.
> 
> * Authorization
> * Cache-Control
> * Connection
> * Content-Length
> * Host
> * If-Modified-Since
> * If-None-Match
> * If-Range
> * Partial-Data
> * Pragma
> * Proxy-Authorization
> * Proxy-Connection
> * Transfer-Encoding

Ref: [chrome.webRequest - Life cycle of requests][linkref]

Ref: [stackoverflow - Override the "cache-control" values in a HTTP response][linkref]


[linkref]: https://developer.chrome.com/extensions/webRequest "chrome.webRequest"
[linkref]: http://stackoverflow.com/questions/17382152/override-the-cache-control-values-in-a-http-response 'stackoverflow Override the "cache-control" values in a HTTP response'

