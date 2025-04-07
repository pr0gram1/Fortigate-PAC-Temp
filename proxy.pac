// 1. http://"ipaddress"/proxy.pac -> to get your PAC file from FORTI enter this url with your FORTI address
// 2. This determines whether web browsrer requests like 80 and 443 go direct to dest or are forwarded to web proxy server
// 3. Method FindProxyForURL has parameters url - as the path and query components of ex. https://example.com/path/page.html
// 4. And parameter host as a regular hostname or domain ex. example.com

function FindProxyForURL(url, host) {

    if(host === "example.com"){
        return "PROXY proxy.example.com:8080";
    }

    // returns true if host has no dots
    if (isPlainHostName(host)) {
        return "DIRECT";
    }
    
    if (isPlainHostName("www.mozilla.org")) {
        return "DIRECT";
    }

    //return true if the given IP address falls within a given subnet
    if (isInNet(host,"210.65.26.202","14.193.15.199")) {
        return "DIRECT";
    }

    if(isInNet("153.177.9.250")) {
        return "DIRECT"
    }

    // checks if given string (first param) matches the pattern of given wildcard (second param)

    if((shExpMatch("www.google.com", "*google.com"))) // -> true
    if((shExpMatch("www.google.com", "*googele.com"))) // -> false
    if((shExpMatch("www.google.com/page", "*gogele.com/page"))) // -> false

    if (shExpMatch(host,"*.hua.hrsmart.com/*")) {
      return "PROXY squid.corp.redhat.com:3128; DIRECT";
    }
    if (shExpMatch(url,"*.fxall.com/*")) {
      return "PROXY squid.corp.redhat.com:3128; DIRECT";
    }

    // DEFAULT RULE: All other traffic, use below proxies, in fail-over order.
    return "DIRECT";
  }
  